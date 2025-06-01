import React, { useState, useEffect, useContext } from "react"
import Editor from "@monaco-editor/react"
import Split from "react-split"
import { EditorContext } from "../Context/EditorTryContext"
import { message } from "antd"
import languages from "../Constants/languages"
import Loading from "./Loading"

export default function CodeEditorForDemo() {
  const [mounted, setMounted] = useState(false)
  const { editorState, setEditorState, monacoRef, complierState, setComplierState } = useContext(EditorContext)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleEditorDidMount = (editor, monaco) => {
    if (monacoRef) monacoRef.current = editor

    const container = editor.getDomNode()
    if (!container) return

    container.addEventListener("dragover", (e) => {
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"
      container.style.border = "2px dashed #4CAF50"
    })

    container.addEventListener("dragleave", () => {
      container.style.border = ""
    })

    container.addEventListener("drop", (e) => {
      e.preventDefault()
      container.style.border = ""

      if (e.dataTransfer?.files[0]) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setEditorState((prev) => ({
              ...prev,
              codeContent: String(event.target.result),
            }))
          }
        }
        reader.readAsText(e.dataTransfer.files[0])
      }
    })
  }

  if (!mounted) {
    return (
      <Loading /> 
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-neutral-950">
      <Split
        direction="vertical"
        sizes={[60, 40]}
        minSize={100}
        gutterSize={8}
        className="flex flex-col h-full split-wrapper"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
        cursor="row-resize"
      >
        <div
          className="overflow-hidden rounded-md border border-[#404040]"
          style={{ flexGrow: 1, flexShrink: 1 }}
        >
          <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
            <span className="text-gray-300 text-sm font-medium">Code Editor</span>
            <span className="text-gray-300 text-sm font-medium">{languages.find(lang => lang.editorLanguage === editorState.language)?.roomLanguage}</span>
          </div>
          <Editor
            height="calc(100% - 32px)"
            defaultLanguage="javascript"
            defaultValue={editorState.codeContent}
            language={editorState.language}
            value={editorState.codeContent}
            onMount={handleEditorDidMount}
            onChange={(value) => {
              setEditorState((prev) => ({
                ...prev,
                codeContent: value || "",
              }))
            }}
            options={{
              fontSize: editorState.fontSize,
              wordWrap: editorState.isWordWrap ? "on" : "off",
              minimap: { enabled: true },
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                useShadows: false,
              },
              overviewRulerBorder: false,
            }}
            theme={editorState.theme}
          />
        </div>

        <div className="overflow-hidden" style={{ flexGrow: 1, flexShrink: 1 }}>
          <Split
            sizes={[50, 50]}
            minSize={100}
            gutterSize={8}
            direction="horizontal"
            className="flex h-full"
            cursor="col-resize"
            style={{
              display: "flex",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              className="overflow-hidden flex flex-col rounded-md border border-[#404040]"
              style={{ flexGrow: 1, flexShrink: 1 }}
            >
              <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
                <span className="text-gray-300 text-sm font-medium">Input</span>
                <button
                  className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                  onClick={() => setEditorState((prev) => ({ ...prev, input: "" }))}
                >
                  Clear
                </button>
              </div>
              <Editor
                height="calc(100% - 32px)"
                defaultLanguage="plaintext"
                value={editorState.input}
                onChange={(value) => {
                  setEditorState((prev) => ({
                    ...prev,
                    input: value || "",
                  }))
                }}
                options={{
                  fontSize: 16,
                  wordWrap: "on",
                  minimap: { enabled: false },
                  lineNumbers: "off",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  padding: { top: 8 },
                }}
                theme="vs-dark"
              />
            </div>

            <div
              className="overflow-hidden flex flex-col rounded-md border border-[#404040]"
              style={{ flexGrow: 1, flexShrink: 1 }}
            >
              <div className="h-8 bg-[#2D2D2D] flex items-center justify-between px-4 border-b border-[#404040]">
                <span className="text-gray-300 text-sm font-medium">Output</span>
                <div>
                  <button
                    className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(complierState.output)
                      message.success("Output copied to clipboard")
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-200 text-sm px-2 py-1 rounded hover:bg-[#404040] transition-colors"
                    onClick={() => {
                      setComplierState((prev) => ({ ...prev, output: "" }))
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <Editor
                height="calc(100% - 32px)"
                defaultLanguage="plaintext"
                value={complierState.output}
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
                theme="vs-dark"
              />
            </div>
          </Split>
        </div>
      </Split>
    </div>
  )
}