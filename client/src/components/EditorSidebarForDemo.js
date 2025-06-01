import React, { useContext } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Palette, Languages, FileUp, Check, FileDown, Play, AlignCenter, WrapText, Bot, ChevronLeft, ChevronRight, Type, FileInput, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from "antd";

import availableFontSize from '../Constants/availableFontSize';
import themeNames from '../Constants/themeNames';
import languages from '../Constants/languages';

import { EditorContext } from '../Context/EditorTryContext';


const EditorSidebarForDemo = () => {

    const { complierState, editorState, setEditorState, handleDownloadCode, setComplierState, handleRunCode, isSideBarOpen, setIsSideBarOpen, handleFormatCode, handleFontSizeChange, handleWordWrapChange, handleLanguageChange, handleThemeChange } = useContext(EditorContext);

    const navigate = useNavigate();

    document.title = "Try Now | CodeWhisper";

    return (
        <div className="h-screen bg-black text-gray-50">

            <Sidebar
                collapsed={!isSideBarOpen}
                backgroundColor="rgb(0, 0, 0)"
                className="h-full border-r border-neutral-900"
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-900">
                    <Link to="/" className={`text-white text-2xl font-semibold ${!isSideBarOpen ? 'hidden' : 'block'}`}>
                        CodeWhisper
                    </Link>
                    <button
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-950 transition-colors"
                    >
                        {isSideBarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <Menu
                    className="pt-4"
                    menuItemStyles={{
                        button: {
                            color: '#f9fafb',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#171717'
                            }
                        }
                    }}
                >


                    {/* Primary Actions */}
                    <MenuItem
                        icon={<Play size={20} />}
                        className={`text-blue-700 hover:text-blue-800 ${complierState.isCompiling ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={handleRunCode}
                        disabled={complierState.isCompiling}
                    >
                        {complierState.isCompiling ? "Compiling..." : "Run Code"}
                    </MenuItem>


                    <MenuItem
                        icon={<AlignCenter size={20} />}
                        onClick={handleFormatCode}
                    >
                        Format Code
                    </MenuItem>

                    <MenuItem
                        icon={<WrapText size={20} />}
                        onClick={() => handleWordWrapChange(!editorState.isWordWrap)}
                    >
                        {editorState.isWordWrap ? "Disable Word Wrap" : "Enable Word Wrap"}
                    </MenuItem>

                    <MenuItem
                        icon={<Bot size={20} />}
                        onClick={() => navigate('/aurora')}
                    >
                        Ask AI
                    </MenuItem>


                    <div className="border-t border-neutral-900 my-4"></div>

                    {/* //  TODO:  File Operations */}
                    <MenuItem
                        icon={<FileUp size={20} />}
                        onClick={() => {
                            document.getElementById("upload-code").click();
                        }}
                    >
                        Upload Code
                        <input
                            id="upload-code"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();

                                    reader.onload = (event) => {
                                        const content = event.target?.result;
                                        if (typeof content === "string") {

                                            const extension = file.name.split(".");
                                            console.log('extension:', extension);
                                            const selectedLanguage = languages.find((lang) => lang.extension === "." + extension[1]);

                                            setEditorState((prev) => ({
                                                ...prev,
                                                codeContent: content,
                                                language: selectedLanguage?.editorLanguage || "plaintext"
                                            }));

                                            setComplierState((prev) => ({
                                                ...prev,
                                                language: selectedLanguage?.codeLanguage || "plaintext"
                                            }));


                                        } else {
                                            console.error("Failed to read file content.");
                                        }
                                    };

                                    reader.onerror = () => {
                                        console.error("Error reading the file:", reader.error);
                                    };

                                    reader.readAsText(file);
                                } else {
                                    console.warn("No file selected.");
                                }
                            }}
                        />
                    </MenuItem>


                    <MenuItem
                        icon={<FileDown size={20} />}
                        onClick={() => {
                            handleDownloadCode();
                            console.log('Download code');
                        }}
                    >
                        Download Code
                    </MenuItem>


                    <MenuItem
                        icon={<FileInput size={20} />}
                        onClick={() => {

                            const fileInput = document.getElementById("upload-input");
                            if (fileInput) {
                                fileInput.click();
                            } else {
                                console.error("File input element not found.");
                            }
                        }}
                    >
                        Upload Input
                        <input
                            id="upload-input"
                            type="file"
                            accept=".txt"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {

                                    const reader = new FileReader();

                                    reader.onload = (event) => {
                                        const content = event.target?.result;
                                        if (typeof content === "string") {
                                            setComplierState((prev) => ({
                                                ...prev,
                                                input: content
                                            }));
                                        } else {
                                            console.error("Failed to read file content.");
                                        }
                                    };

                                    reader.onerror = () => {
                                        console.error("Error reading the file:", reader.error);
                                    };

                                    reader.readAsText(file);
                                } else {
                                    console.warn("No file selected.");
                                }
                            }}
                        />
                    </MenuItem>


                    <div className="border-t border-neutral-900 my-4"></div>

                    {/* Settings */}

                    <SubMenu
                        label="Theme"
                        icon={<Palette size={20} />}
                    >
                        {themeNames.map((theme) => (
                            <MenuItem
                                key={theme}
                                className="bg-black hover:bg-neutral-900"
                                onClick={() => {
                                    // Only allow VS light and dark themes to be selected
                                    if (theme === 'vs-light' || theme === 'vs-dark') {
                                        handleThemeChange(theme);
                                    } else {
                                        message.info('This theme is locked. Login to unlock this theme');
                                    }
                                }}
                            >
                                {/* Render theme with appropriate icon based on selection and locked status */}
                                {theme === editorState.theme ? (
                                    // Currently selected theme
                                    <span className='text-white flex gap-2 items-center'>
                                        {theme} <Check size={20} />
                                    </span>
                                ) : (theme === 'vs-light' || theme === 'vs-dark') ? (
                                    // Selectable themes
                                    <span className='cursor-pointer'>
                                        {theme}
                                    </span>
                                ) : (
                                    // Locked themes
                                    <span className='cursor-not-allowed flex items-center gap-2 '>
                                        {theme} <Lock size={15} />
                                    </span>
                                )}
                            </MenuItem>
                        ))}
                    </SubMenu>



                    <SubMenu
                        label="Language"
                        icon={<Languages size={20} />}
                    >
                        {languages.map((lang) => (
                            <MenuItem
                                key={lang.editorLanguage}
                                className="bg-black hover:bg-neutral-900"
                                onClick={() => handleLanguageChange(lang.editorLanguage)}
                            >
                                {editorState.language === lang.editorLanguage ? (
                                    <span className="font-semibold text-white flex items-center gap-1">
                                        <span>{lang.roomLanguage}</span> <Check size={20} />
                                    </span>
                                ) : (
                                    lang.roomLanguage
                                )}
                            </MenuItem>
                        ))}

                    </SubMenu>




                    <SubMenu
                        label="Font Size"
                        icon={<Type size={20} />}
                    >
                        {availableFontSize.map((size) => (
                            <MenuItem
                                key={size}
                                className="bg-black hover:bg-neutral-900"
                                onClick={() => handleFontSizeChange(size)}
                            >
                                {
                                    editorState.fontSize === size ? (
                                        <span className="font-semibold text-white flex items-center gap-1">
                                            <span>{size}</span> <Check size={20} />
                                        </span>
                                    ) : (
                                        size
                                    )
                                }
                            </MenuItem>
                        ))}
                    </SubMenu>




                </Menu>
            </Sidebar>
        </div >
    );
};




export default EditorSidebarForDemo;
