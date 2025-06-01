import React, { createContext, useRef, useState } from 'react';
import languages from '../Constants/languages';
import { useMonaco } from '@monaco-editor/react';

const EditorContext = createContext();

const EditorTryProvider = ({ children }) => {

    const [editorState, setEditorState] = useState({
        theme: 'vs-dark',
        language: 'javascript',
        codeContent: 'console.log("Hello World")',
        input: '',
        fontSize: 20,
        isWordWrap: false,
        fileExtension: '.js'
    });


    const [complierState, setComplierState] = useState({
        language: 'javascript',
        output: 'No output generated',
        error: '',
        isCompiling: false
    });


    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const monacoRef = useRef(null);



    const handleFontSizeChange = (size) => {
        setEditorState((prev) => ({
            ...prev,
            fontSize: size
        }));
    }

    const handleLanguageChange = (lang) => {
        const selectedLanguage = languages.find((language) => language.editorLanguage === lang);

        console.log('selectedLanguage:', selectedLanguage);

        setEditorState((prev) => ({
            ...prev,
            language: selectedLanguage.editorLanguage,
            fileExtension: selectedLanguage.extension,
            codeContent: selectedLanguage.helloWorld
        }));

        setComplierState((prev) => ({
            ...prev,
            language: selectedLanguage.codeLanguage
        }))

    }

    const monaco = useMonaco();
    const handleThemeChange = async (theme) => {
        try {
            // Update editor state with the new theme
            setEditorState((prev) => ({
                ...prev,
                theme: theme
            }));


            console.log('theme:', theme);

            // Fetch the theme configuration JSON
            console.log(`Fetching theme from: ../Constants/monaco-themes-master/${theme}.json`);
            const response = await fetch(`../Constants/monaco-themes-master/${theme}.json`);

            if (!response.ok) {
                throw new Error('Failed to load theme');
            }

            const themeData = await response.json();

            // Ensure Monaco editor is available before defining the theme
            if (monaco.editor) {
                monaco.editor.defineTheme("theme", themeData);
                monaco.editor.setTheme("theme");
            } else {
                console.error('Monaco editor instance is not available');
            }
        } catch (error) {
            console.error('Error while changing theme:', error);
        }
    };



    const handleWordWrapChange = (isWordWrap) => {
        setEditorState((prev) => ({
            ...prev,
            isWordWrap: isWordWrap
        }));
    }



    const handleFormatCode = () => {

        const unformattedCode = editorState.codeContent;
        const formattedCode = window.prettier.format(unformattedCode, {
            parser: "babel",
            plugins: window.prettierPlugins
        });

        setEditorState((prev) => ({
            ...prev,
            codeContent: formattedCode
        }));
    }


    const handleRunCode = async () => {


        try {
            setComplierState(prev => ({ ...prev, error: null, isCompiling: true }));

            const compilerOptions = {

                method: 'POST',
                url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },

                body: {
                    language: complierState.language,
                    stdin: editorState.input,
                    files: [{
                        name: `main${editorState.fileExtension}`,
                        content: editorState.codeContent
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
                output: result.stderr || result.stdout || 'No output generated'
            }));

            console.log('Output:', result.stderr || result.stdout || 'No output generated');
        }
        catch {
            setComplierState(prev => ({
                ...prev,
                error: 'Failed to execute code'
            }));
        }
        finally {
            setComplierState(prev => ({ ...prev, isCompiling: false, error: null }));
        }
    }


    const handleDownloadCode = () => {
        const element = document.createElement('a');
        const file = new Blob([editorState.codeContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `main-${Date.now().toString()}${editorState.fileExtension}`;
        document.body.appendChild(element);
        element.click();
    }

    const value = {
        editorState,
        setEditorState,

        complierState,
        setComplierState,

        isSideBarOpen,
        setIsSideBarOpen,

        monacoRef,

        handleFontSizeChange,
        handleLanguageChange,
        handleThemeChange,
        handleWordWrapChange,
        handleFormatCode,
        handleRunCode,
        handleDownloadCode
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};


export { EditorContext, EditorTryProvider };