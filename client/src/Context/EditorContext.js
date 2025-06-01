import React, { createContext, useRef, useState } from 'react';
import languages from '../Constants/languages';
import axios from 'axios';
import { message } from 'antd';

const EditorContext = createContext();

const EditorProvider = ({ children }) => {

    const BACKEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_BACKEND_URL
        : process.env.REACT_APP_BACKEND_URL_PROD;

    const FRONTEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_FRONTEND_URL
        : process.env.REACT_APP_FRONTEND_URL_PROD;

    const axiosInstance = axios.create({
        baseURL: BACKEND_URL,
        withCredentials: true
    });

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [openFile, setOpenFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false)

    const [editorState, setEditorState] = useState({
        editorLanguage: "javascript",
        editorTheme: "vs-dark",
        editorFontSize: 16,
        editorCodeContent: "// Open or Create File to write code here",
        isWordWrap: false,
        editorFileExtension: ".js",
        editorInput: "",
    });


    const [complierState, setComplierState] = useState({
        complierLanguage: "javascript",
        complierOutput: "",
        complierError: "",
        isComplierRunning: false,
    });

    const handleLanguageChange = (e) => {
        const selectedRoomLanguage = e.target.value;
        const selectedLanguage = languages.find(lang => lang.roomLanguage === selectedRoomLanguage);

        if (!selectedLanguage) {
            console.error(`Language not found: ${selectedRoomLanguage}`);
            return;
        }

        setEditorState(prev => ({
            ...prev,
            editorLanguage: selectedLanguage.editorLanguage,
            editorFileExtension: selectedLanguage.extension,
            editorCodeContent: selectedLanguage.helloWorld || "// Write your code here",
        }));


        setComplierState(prev => ({
            ...prev,
            complierLanguage: selectedLanguage.editorLanguage
        }));

        console.log('Selected Language:', selectedLanguage);
        console.log('Editor State:', editorState);
        console.log('Complier State:', complierState);
    };


    const handleRunCode = async () => {

        console.log('EditorState:', editorState);
        console.log('ComplierState:', complierState);

        try {

            setComplierState(prev => ({
                ...prev,
                isComplierRunning: true
            }));

            const compilerOptions = {

                method: 'POST',
                url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },

                body: {
                    language: complierState.complierLanguage,
                    stdin: editorState.editorInput,
                    files: [{
                        name: `main${editorState.editorFileExtension}`,
                        content: editorState.editorCodeContent
                    }]
                }
            }

            const response = await fetch(compilerOptions.url, {
                method: compilerOptions.method,
                headers: compilerOptions.headers,
                body: JSON.stringify(compilerOptions.body)
            });

            const result = await response.json();

            setComplierState(prev => ({
                ...prev,
                complierOutput: result.stderr || result.stdout || 'No output generated'
            }));

        } catch (error) {
            setComplierState(prev => ({
                ...prev,
                error: 'Failed to execute code'
            }));
        }
        finally {
            setComplierState(prev => ({
                ...prev,
                isComplierRunning: false
            }));
        }
    }


    const handleFormatCode = () => {

        const unformattedCode = editorState.editorCodeContent;
        const formattedCode = window.prettier.format(unformattedCode, {
            parser: "babel",
            plugins: window.prettierPlugins
        });

        setEditorState((prev) => ({
            ...prev,
            editorCodeContent: formattedCode
        }));
    }


    const handleWordWrap = () => {
        setEditorState((prev) => ({
            ...prev,
            isWordWrap: !prev.isWordWrap
        }));
    }

    const monacoRef = useRef(null);
    const monacoInstanceRef = useRef(null);

    const handleChangeTheme = (themeName) => {

        console.log('Theme Name:', themeName);

        fetch(`/Constants/${themeName}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch theme: ${themeName}`);
                }
                return response.json();
            })
            .then((themeData) => {
                if (monacoInstanceRef.current) {
                    monacoInstanceRef.current?.editor.defineTheme(themeName, themeData);
                    monacoInstanceRef.current?.editor.setTheme(themeName);
                } else {
                    console.error("Monaco instance is not available");
                }
            })
            .catch((error) => {
                console.error("Error changing theme: ", error);
            });


        setEditorState(prev => ({
            ...prev,
            editorTheme: themeName
        }));
    };

    /******************************************************************************/


    const sortFiles = (files) => {
        return files.sort((a, b) => {
            if (a.fileFullName < b.fileFullName) {
                return -1;
            }
            if (a.fileFullName > b.fileFullName) {
                return 1;
            }
            return 0;
        });
    };

    const handleAddNewFile = async () => {
        const fileFullName = prompt('Enter file name with extension:');

        if (!fileFullName) {
            return false;
        }

        const fileNameRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+$/;

        if (!fileNameRegex.test(fileFullName)) {
            message.error('Invalid file name!');
            return false;
        }

        if (files.find((file) => file.fileFullName === fileFullName)) {
            message.error('File already exists!');
            return false;
        }

        try {
            const { data } = await axiosInstance.post("/api/user/add-file", {
                fileFullName
            });

            if (data.success) {

                setFiles((prev) => {
                    return sortFiles([...prev, data.data]);
                })

                return true;
            } else {
                console.error('Failed to add new file:', data.error);
                message.error(`Failed to add new file: ${data.error}`);
                return false;
            }

        } catch (error) {
            console.error('Failed to add new file:', error);
            message.error('Failed to add new file. Please try again.');
            return false;
        }
    };


    const handleGetAllFiles = async () => {

        try {
            const { data } = await axiosInstance.post("/api/user/get-files");

            if (data.success) {
                setFiles(sortFiles(data.data));
                return true;
            }
            else {
                message.error("Failed to get files. Please Login and try again.");
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    };


    const handleDownloadFile = async (fileId) => {
        const file = files.find((file) => file.fileId === fileId);

        if (!file) {
            message.error('File not found!');
            return false;
        }

        try {
            const contentToDownload = JSON.stringify(file.fileContent, null, 2);
            const element = document.createElement('a');
            const fileToDownload = new Blob([contentToDownload], {
                type: 'application/json'  // Changed from text/plain to application/json
            });

            element.href = URL.createObjectURL(fileToDownload);
            element.download = file.fileFullName;

            // Clean up after download
            const objectUrl = element.href;

            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

            // Revoke the URL after download
            setTimeout(() => {
                URL.revokeObjectURL(objectUrl);
            }, 100);

            message.success('File downloaded successfully!');
            return true;

        } catch (error) {
            console.error('Failed to download file:', error);
            message.error('Failed to download file. Please try again.');
            return false;
        }
    };


    const handleRenameFile = async (fileId) => {
        const file = files.find((file) => file.fileId === fileId);

        if (!file) {
            message.error('File not found!');
            return false;
        }

        const newFileName = prompt('Enter new file name:', file.fileFullName);

        if (!newFileName) {
            return false;
        }

        const fileNameRegex = /^[a-zA-Z0-9-_.]+$/;
        if (!fileNameRegex.test(newFileName)) {
            message.error('Invalid file name! Only letters, numbers, hyphens, underscores, and dots are allowed.');
            return false;
        }

        if (files.find((file) => file.fileFullName === newFileName)) {
            message.error('A file with this name already exists!');
            return false;
        }

        try {
            const { data } = await axiosInstance.post("/api/user/rename-file", {
                fileId,
                fileFullName: newFileName,
            });

            const newExtention = newFileName.split('.').pop();
            const newLanguage = languages.find(lang => lang.extension === "." + newExtention);

            if (data.success) {
                setFiles((prev) => {
                    return sortFiles(
                        prev.map((file) => {
                            if (file.fileId === fileId) {
                                return {
                                    ...file, fileFullName: newFileName,
                                    fileExtension: newExtention,
                                    fileLanguage: newLanguage?.editorLanguage || 'javascript'
                                };
                            } else {
                                return file;
                            }
                        })
                    );
                });

                if (openFile === fileId) {
                    setEditorState((prev) => ({
                        ...prev,
                        editorFileExtension: newExtention,
                        editorLanguage: newLanguage?.editorLanguage || 'javascript'
                    }));

                    setComplierState((prev) => ({
                        ...prev,
                        complierLanguage: newLanguage?.editorLanguage || 'javascript'
                    }));
                }

                message.success('File renamed successfully!');
                return true;

            } else {
                console.error('Failed to rename file:', data.error);
                message.error(`Failed to rename file: ${data.error}`);
                return false;
            }
        } catch (error) {
            console.error('Failed to rename file:', error);
            message.error('Failed to rename file. Please try again.');
            return false;
        }
    };

    const handleDeleteFile = async (fileId) => {
        // Check if the file exists
        const fileExists = files.some((file) => file.fileId === fileId);

        if (!fileExists) {
            message.error('File not found!');
            return false;
        }

        // Handle case where the file to delete is currently open
        if (fileId === openFile) {
            if (files.length === 1) {
                // Reset editor state if this is the only file
                setEditorState((prev) => ({
                    ...prev,
                    editorCodeContent: "// Open or Create File to write code here",
                    editorFileExtension: ".js",
                    editorLanguage: "javascript",
                }));

                setComplierState(() => ({
                    complierLanguage: "javascript",
                    complierOutput: "",
                    complierError: "",
                    isComplierRunning: false,
                }));

                setOpenFile(null);

            } else {
                const nextFile = files.find((file) => file.fileId !== fileId);
                handleFileOnClick(nextFile.fileId);
            }
        }

        try {
            // Send request to delete the file
            const { data } = await axiosInstance.post("/api/user/delete-file", {
                fileId,
            });

            if (data.success) {
                // Update the files state by filtering out the deleted file
                setFiles((prev) => {
                    const updatedFiles = prev.filter((file) => file.fileId !== fileId);
                    return sortFiles(updatedFiles); // Sort and return the updated files
                });

                message.success('File deleted successfully!');
                return true;
            } else {
                console.error('Failed to delete file:', data.error);
                message.error(`Failed to delete file: ${data.error}`);
                return false;
            }
        } catch (error) {
            console.error('Failed to delete file:', error);
            message.error('Failed to delete file. Please try again.');
            return false;
        }
    };


    const handleFileOnClick = (fileId) => {

        const file = files.find((file) => file.fileId === fileId);
        const selectedLanguage = languages.find(lang => lang.editorLanguage === file.fileLanguage);

        setOpenFile(fileId);

        if (!file) {
            message.error('File not found!');
            return false;
        }

        if (!selectedLanguage) {
            message.error('Language not found!');
            return false;
        }

        setEditorState(prev => ({
            ...prev,
            editorCodeContent: file.fileContent,
            editorFileExtension: "." + file.fileExtension,
            editorLanguage: file.fileLanguage,
        }));

        setComplierState(prev => ({
            ...prev,
            complierLanguage: selectedLanguage.codeLanguage,
            complierOutput: "",
            complierError: "",
            isComplierRunning: false,
        }));

        return true;
    }


    const handleSaveFile = async () => {

        const file = files.find((file) => file.fileId === openFile);
        console.log('Open File:', openFile);

        if (!file) {
            message.error('File not found!');
            return false;
        }

        try {

            const { data } = await axiosInstance.post("/api/user/update-file", {
                fileContent: editorState.editorCodeContent,
                fileId: openFile
            });

            if (data.success) {
                files.find((file) => file.fileId === openFile).fileContent = editorState.editorCodeContent;
                return true;
            }
            else {
                console.error('Failed to save file:', data.error);
                message.error(`Failed to save file: ${data.error}`);
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    const handleUploadFile = async () => {
        const inputNode = document.getElementById("upload-file-input");
        inputNode.click();

        try {
            const fileSelection = new Promise((resolve) => {
                inputNode.addEventListener(
                    "change",
                    (event) => {
                        const file = event.target.files[0];
                        if (!file) {
                            throw new Error("No file selected");
                        }
                        resolve({ file: file, fileName: file.name });
                    },
                    { once: true }
                );
            });

            const { file, fileName: fileFullName } = await fileSelection;

            const fileContent = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(e);
                reader.readAsText(file);
            });

            const fileNameRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+$/;
            if (!fileNameRegex.test(fileFullName)) {
                message.error('Invalid file name!');
                return false;
            }

            if (files.find((file) => file.fileFullName === fileFullName)) {
                message.error('File already exists!');
                return false;
            }

            const { data } = await axiosInstance.post("/api/user/add-file", {
                fileFullName
            });


            if (data.success) {
                setFiles((prev) => {
                    return sortFiles([...prev, data.data]);
                });

                const fileId = data?.data?.fileId;
                console.log('fileId: ', fileId);

                const response = await axiosInstance.post("/api/user/update-file", {
                    fileId,
                    fileContent
                });

                console.log('reponse :', response);

                if (response.data.success && await handleGetAllFiles()) {
                    message.success("File Upload is Done");
                    return true;
                }
                else {
                    message.error('Failed to Upload new file: ' + response.data.error);
                    return false;
                }
            } else {
                message.error('Failed to Upload new file: ' + data.error);
                return false;
            }
        } catch (error) {
            message.error('Failed to Upload new file. Please try again.');
            return false;
        }
    };


    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);

        for (const file of files) {
            try {
                const fileFullName = file.name;

                // Validate filename
                const fileNameRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]+$/;
                if (!fileNameRegex.test(fileFullName)) {
                    message.error(`Invalid file name: ${fileFullName}`);
                    continue;
                }

                // Check for duplicate files
                if (files.find((f) => f.fileFullName === fileFullName)) {
                    message.error(`File already exists: ${fileFullName}`);
                    continue;
                }

                // Read file content
                const fileContent = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = (e) => reject(e);
                    reader.readAsText(file);
                });

                // First API call to add file
                const { data } = await axiosInstance.post("/api/user/add-file", {
                    fileFullName
                });

                if (!data.success) {
                    message.error(`Failed to upload file ${fileFullName}: ${data.error}`);
                    continue;
                }

                // Update files state
                setFiles((prev) => {
                    return sortFiles([...prev, data.data]);
                });

                const fileId = data?.data?.fileId;

                // Second API call to update file content
                const response = await axiosInstance.post("/api/user/update-file", {
                    fileId,
                    fileContent
                });

                if (response.data.success && await handleGetAllFiles()) {
                    message.success(`Successfully uploaded ${fileFullName}`);
                } else {
                    message.error(`Failed to upload file content for ${fileFullName}: ${response.data.error}`);
                }

            } catch (error) {
                message.error(`Failed to upload ${file.name}. Please try again.`);
                console.error('Error uploading file:', error);
            }
        }
    };


    const value = {
        isSideBarOpen,
        setIsSideBarOpen,

        editorState,
        setEditorState,

        files,
        setFiles,

        complierState,
        setComplierState,

        monacoRef,
        monacoInstanceRef,

        handleRunCode,
        handleFormatCode,
        handleWordWrap,
        handleLanguageChange,
        handleChangeTheme,

        handleAddNewFile,
        handleGetAllFiles,

        handleDownloadFile,
        handleRenameFile,
        handleDeleteFile,
        handleFileOnClick,
        handleSaveFile,
        handleUploadFile,
        handleDrop,

        openFile,
        setOpenFile,

        isDragging,
        setIsDragging,
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};


export { EditorContext, EditorProvider };