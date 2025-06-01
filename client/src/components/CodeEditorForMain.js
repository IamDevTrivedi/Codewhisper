import React, { useContext } from 'react'
import Split from "react-split";
import Editor from "@monaco-editor/react";
import { EditorContext } from '../Context/EditorContext';
import { message } from 'antd';

export default function CodeEditorForMain() {

  const { editorState, handleSaveFile, openFile, setEditorState, complierState, setComplierState, monacoRef, monacoInstanceRef } = useContext(EditorContext);

  return (
    <Split
      direction="vertical"
      sizes={[60, 40]}
      minSize={60}
      maxSize={800}
      gutterSize={4}
      className="h-full split-wrapper"
    >
      <div className="overflow-hidden rounded-none border-x border-b border-[#404040]">
        <div className="h-9 bg-[#2D2D2D] flex items-center px-4 border-b border-[#404040]">
          <span className="text-gray-300 text-sm font-medium">Code Editor</span>
        </div>
        <Editor
          height="calc(100% - 36px)"
          language={editorState.editorLanguage}
          defaultValue={editorState.editorCodeContent}
          value={editorState.editorCodeContent}
          onChange={async (value) => {
            setEditorState((prev) => ({
              ...prev,
              editorCodeContent: value
            }))

            await handleSaveFile();
          }
          }
          options={{
            fontSize: editorState.editorFontSize,
            wordWrap: editorState.isWordWrap ? "on" : "off",
            minimap: { enabled: true },
            readOnly: !openFile,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
            },
            overviewRulerBorder: false,
            padding: { top: 8 },
          }}
          theme={editorState.editorTheme}
          onMount={(editor, monaco) => {
            monacoRef.current = editor;
            monacoInstanceRef.current = monaco;
          }}
        />
      </div>

      <div className="overflow-hidden">
        <Split sizes={[50, 50]} minSize={100} gutterSize={8} className="flex h-full" style={{ height: "100%" }}>
          <div className="overflow-hidden flex flex-col rounded-md border border-[#404040]">
            <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
              <span className="text-gray-300 text-sm font-medium">Input</span>
              <button
                onClick={() => setEditorState((prev) => ({ ...prev, editorInput: "" }))}
                className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
              >
                Clear
              </button>
            </div>
            <Editor
              height="calc(100% - 32px)"
              value={editorState.editorInput}
              defaultLanguage="plaintext"
              onChange={(value) =>
                setEditorState((prev) => ({
                  ...prev,
                  editorInput: value
                }))
              }
              options={{
                fontSize: editorState.editorFontSize,
                wordWrap: "on",
                minimap: { enabled: false },
                lineNumbers: "off",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                padding: { top: 8 },
              }}
              theme={editorState.editorTheme}
            />
          </div>

          <div className="overflow-hidden flex flex-col rounded-md border border-[#404040]">
            <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
              <span className="text-gray-300 text-sm font-medium">Output</span>
              <div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(complierState.complierOutput)
                    message.success("Copied to the Clipboard");
                  }}
                  className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={() => setComplierState((prev) => ({ ...prev, complierOutput: "" }))}
                  className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <Editor
              height="calc(100% - 32px)"
              defaultLanguage="plaintext"
              value={complierState.complierOutput}
              options={{
                fontSize: 16,
                wordWrap: "on",
                readOnly: true,
                minimap: { enabled: false },
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                padding: { top: 8 },
              }}
              theme={editorState.editorTheme}
            />
          </div>
        </Split>
      </div>
    </Split>
  )
}