import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { message, Upload } from 'antd';
import Split from 'react-split';
import { Clipboard, LogOut, Play, Code, Download } from "lucide-react";
import { UploadOutlined } from '@ant-design/icons';
import languages from '../Constants/languages';
import Avatar from 'react-avatar';
import Loading from '../components/Loading';
import { AppContext } from '../Context/AppContext';
import io from "socket.io-client";



export default function CodeRoom() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { leaveRoom, getRoomData, userData, BACKEND_URL } = useContext(AppContext);


    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const checkMobileDevice = () => {
            const userAgent = window.navigator.userAgent;
            const mobileDevices = ['Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
            const isMobile = mobileDevices.some((device) => userAgent.includes(device));
            setIsMobileDevice(isMobile);
        };

        checkMobileDevice();
    })


    const [editorState, setEditorState] = useState({
        content: '',
        language: 'plaintext',
        input: '',
        output: '',
    });

    const [compilerState, setCompilerState] = useState({
        language: '',
        fileExtension: '',
        isCompiling: false,
        error: null,
    });

    const [roomState, setRoomState] = useState({
        id: '',
        name: '',
        language: '',
        members: [],
    });

    const [loading, setLoading] = useState(true);

    // Socket ref to hold the singleton socket instance
    const socketRef = useRef(null);

    useEffect(() => {
        const initializeRoom = async () => {
            try {
                setLoading(true);

                if (!roomId) {
                    message.error('Invalid room ID');
                    navigate('/room');
                    return;
                }

                if (!userData) {
                    return;
                }

                const roomData = await getRoomData({ roomUUID: roomId });

                if (!roomData) {
                    message.error("Room not found");
                    navigate("/room");
                    return;
                }

                if (!roomData.memberId.includes(userData._id)) {
                    message.error('You are not a member of this room');
                    navigate('/room/join');
                    return;
                }

                const selectedLanguage = languages.find((lang) => lang.roomLanguage === roomData.roomLanguage);

                setRoomState({
                    id: roomData.roomUUID,
                    name: roomData.roomName,
                    language: roomData.roomLanguage,
                    members: roomData.memberName,
                });

                setEditorState({
                    content: roomData.roomCode,
                    input: '',
                    output: '',
                    language: selectedLanguage.editorLanguage,
                });

                setCompilerState({
                    isCompiling: false,
                    error: null,
                    language: selectedLanguage.codeLanguage,
                    fileExtension: selectedLanguage.extension,
                });

                // Initialize socket connection
                if (!socketRef.current) {
                    socketRef.current = io(BACKEND_URL, { transports: ['websocket'] });
                }

                const socket = socketRef.current;

                // Event listeners
                socket.on('connect', () => {
                    console.log('Connected to server');
                    socket.emit("join-room", {
                        roomId,
                        username: `${userData.firstName} ${userData.lastName}`,
                        userId: userData._id,
                    });
                });

                socket.on('connect_error', (error) => {
                    console.error('Error connecting to server:', error);
                });

                socket.on('user-joined', async ({ username }) => {
                    message.info(`${username} joined the room`);
                    const updatedRoomData = await getRoomData({ roomUUID: roomId });
                    setRoomState((prev) => ({
                        ...prev,
                        members: updatedRoomData.memberName,
                    }));
                });

                socket.on('receive-code', (code) => {
                    console.log("Received updated code:", code);
                    setEditorState((prev) => ({
                        ...prev,
                        content: code,
                    }));
                });

                socket.on('user-left', async ({ username }) => {
                    console.log(`${username} has left the room.`);
                    message.info(`${username} has left the room.`);
                    const updatedRoomData = await getRoomData({ roomUUID: roomId });
                    setRoomState((prev) => ({
                        ...prev,
                        members: updatedRoomData.memberName,
                    }));
                });

                socket.on('disconnect', () => {
                    console.log("Disconnected from server");
                    // message.error('Disconnected from server');
                });

            } catch (error) {
                message.error(error.message || 'Failed to load room data');
                navigate("/room");
            } finally {
                setLoading(false);
            }
        };

        initializeRoom();

        return () => {
            const socket = socketRef.current;
            if (socket) {
                socket.emit("leave-room", {
                    roomId,
                    username: `${userData.firstName} ${userData.lastName}`,
                });
                socket.disconnect();
                socketRef.current = null;
            }
        };
    }, [roomId, userData, navigate, getRoomData, BACKEND_URL]);

    // Handle code changes and emit code updates
    const handleCodeChange = (newCode) => {
        setEditorState((prev) => ({ ...prev, content: newCode }));
        if (socketRef.current) {
            socketRef.current.emit("code-update", { roomId, code: newCode });
        }
    };


    // run the code when the button is clicked
    const handleCodeExecution = async () => {
        try {
            setCompilerState(prev => ({ ...prev, isCompiling: true, error: null }));

            const compilerOptions = {
                method: 'POST',
                url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: {
                    language: compilerState.language,
                    stdin: editorState.input,
                    files: [{
                        name: `main.${compilerState.fileExtension}`,
                        content: editorState.content
                    }]
                }
            };

            const response = await fetch(compilerOptions.url, {
                method: compilerOptions.method,
                headers: compilerOptions.headers,
                body: JSON.stringify(compilerOptions.body)
            });

            const result = await response.json();

            setEditorState(prev => ({
                ...prev,
                output: result.stderr || result.stdout || 'No output generated'
            }));
        } catch (error) {
            setCompilerState(prev => ({
                ...prev,
                error: 'Failed to execute code'
            }));
            message.error('Code execution failed');
        }
        finally {
            setCompilerState(prev => ({ ...prev, isCompiling: false }));
        }
    };


    // download the file with the given type : input or main
    const handleFileDownload = (type) => {

        const content = type === 'input' ? editorState.input : editorState.content;
        const fileName = `code-${type}-${Date.now().toString()}.${editorState.language}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    };


    // upload the input file
    const handleInputFileUpload = (file) => {

        const reader = new FileReader();
        reader.onload = (event) => {
            setEditorState(prev => ({
                ...prev,
                input: event.target.result
            }));
            message.success('Input file uploaded successfully');
        };
        reader.readAsText(file);
        return false;
    };


    // copy the room id to the clipboard
    const copyRoomIdToClipboard = () => {
        navigator.clipboard.writeText(roomId);
        message.success('Room ID copied to clipboard');
    };



    // format the code of the editor
    const handleCodeFormat = () => {
    }



    // leave the room
    const handleLogout = async () => {
        try {
            await leaveRoom({ roomUUID: roomId });
            socketRef.current.emit("leave-room", { roomId, username: `${userData.firstName} ${userData.lastName}` });
            socketRef.current.disconnect();
            navigate('/room');
        } catch (error) {
            message.error('Failed to leave room');
        }
    }


    document.title = `${roomState.name || 'Code Room'} | CodeWhisper`;


    if (isMobileDevice) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Desktop Only</h2>
                <p className="text-lg mb-4">This coding environment is optimized for desktop use.</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Leave Room
                </button>
            </div>
        );
    }

    else if (loading) {
        return <Loading />;
    }

    else {
        return (
            <Split
                className="flex h-screen"
                sizes={[20, 80]}
                minSize={[150, 400]}
                gutterSize={3}
                snapOffset={30}
            >
                <div className="h-full overflow-auto bg-neutral-950 text-white">
                    <div className="flex flex-col h-full p-4">


                        <div className="space-y-4">
                            <h2 className="text-base font-bold">
                                Room: <span className="text-gray-200">{roomState.name || 'Unnamed'}</span>
                            </h2>
                            <h2 className="text-base font-bold">
                                Language: <span className="text-gray-200">{roomState.language || 'plaintext'}</span>
                            </h2>
                        </div>

                        <div className="my-6 flex-1 min-h-0">
                            <h3 className="text-md font-semibold mb-2 sticky top-0 bg-neutral-950 py-2">Members</h3>
                            <div className="overflow-y-auto max-h-[calc(100%-3rem)] pr-2 space-y-1">
                                {roomState.members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="py-2 px-3 rounded-md bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
                                    >

                                        <span className='mr-2'>
                                            <Avatar name={member} size="28" round={true} />
                                        </span>

                                        {member}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Action Buttons */}
                        <div className="mt-auto space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={handleCodeExecution}
                                    disabled={compilerState.isCompiling}
                                    className="flex items-center justify-center bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <Play className="w-4 h-4 mr-1" /> {compilerState.isCompiling ? 'Compiling...' : 'Run'}
                                </button>

                                <button
                                    onClick={handleCodeFormat}
                                    className="flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <Code className="w-4 h-4 mr-1" /> Format
                                </button>

                                <button
                                    onClick={() => handleFileDownload('input')}
                                    className="flex items-center justify-center bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <Download className="w-4 h-4 mr-1" /> Input
                                </button>

                                <button
                                    onClick={() => handleFileDownload('main')}
                                    className="flex items-center justify-center bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <Download className="w-4 h-4 mr-1" /> Code
                                </button>

                                <button
                                    onClick={copyRoomIdToClipboard}
                                    className="flex items-center justify-center bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <Clipboard className="w-4 h-4 mr-1" /> Copy ID
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-white font-semibold p-2 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4 mr-1" /> Leave
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="h-full">
                    <Split
                        direction="vertical"
                        sizes={[70, 30]}
                        minSize={[200, 100]}
                        gutterSize={3}
                        className="h-full"
                    >
                        {/* Code Editor */}
                        <div className="h-full w-full overflow-hidden">
                            <Editor
                                height="100%"
                                defaultLanguage={editorState.language}
                                value={editorState.content}
                                onChange={(value) => {
                                    handleCodeChange(value);
                                }}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 16,
                                }}
                            />
                        </div>

                        {/* Input/Output Panels */}
                        <div className="h-full w-full">
                            <Split
                                sizes={[50, 50]}
                                minSize={[200, 200]}
                                gutterSize={3}
                                className="h-full flex"
                            >
                                {/* Input Panel */}
                                <div className="h-full flex flex-col bg-neutral-800">
                                    <div className="p-2 bg-neutral-900 text-white font-semibold flex items-center gap-3">
                                        <span>Input</span>
                                        <Upload
                                            beforeUpload={handleInputFileUpload}
                                            accept=".txt"
                                            maxCount={1}
                                            showUploadList={false}
                                        >
                                            <button className="flex items-center justify-center bg-gray-200 px-3 rounded-lg shadow-sm transition-all duration-200">
                                                <UploadOutlined className="w-4 h-4 mr-1" /> Upload Input
                                            </button>
                                        </Upload>
                                    </div>
                                    <textarea
                                        value={editorState.input}
                                        onChange={(e) => setEditorState(prev => ({ ...prev, input: e.target.value }))}
                                        className="flex-1 w-full p-2 bg-neutral-800 text-white resize-none focus:outline-none"
                                        placeholder="Enter input here..."
                                    />
                                </div>

                                {/* Output Panel */}
                                <div className="h-full flex flex-col bg-neutral-800">
                                    <div className="p-2 bg-neutral-900 text-white font-semibold">
                                        Output
                                    </div>
                                    <div className="flex-1 p-2 text-white overflow-auto">
                                        {compilerState.error || editorState.output || 'No output yet...'}
                                    </div>
                                </div>
                            </Split>
                        </div>
                    </Split>
                </div>
            </Split>
        );
    }
}