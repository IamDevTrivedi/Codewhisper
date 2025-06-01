import React, { useContext } from "react"
import { Play, FileCode, BrainCircuit, AlignJustify, ChevronDown } from "lucide-react"
import { EditorContext } from "../Context/EditorContext.js"
import themeNames from "../Constants/themeNames.js"
import languages from "../Constants/languages.js"
import availableFontSize from "../Constants/availableFontSize.js"
import { Popover } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function EditorNav() {
  const {
    editorState,
    setEditorState,
    complierState,
    handleRunCode,
    handleFormatCode,
    handleWordWrap,
    handleLanguageChange,
    handleChangeTheme
  } = useContext(EditorContext);


  const navigate = useNavigate();

  const { openFile } = useContext(EditorContext);

  return (
    <nav className="bg-neutral-900 text-gray-100 px-4 py-2 border-b border-neutral-700">
      <div className="flex justify-between items-center">
        <div className="relative">
          <select
            id="themeSelector"
            value={editorState.editorTheme}
            onChange={(e) => handleChangeTheme(e.target.value)}
            className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none"
          >
            {themeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Language and Font Size Selection */}
        <div className="flex space-x-2">

          <div className="relative">
            <select
              disabled={openFile ? true : false}
              value={languages.find((lang) => lang.editorLanguage === editorState.editorLanguage).roomLanguage}
              onChange={(e) => handleLanguageChange(e)}
              className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.roomLanguage} value={lang.roomLanguage}>
                  {lang.roomLanguage}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={editorState.editorFontSize}
              onChange={(e) => setEditorState(prev => ({
                ...prev,
                editorFontSize: parseInt(e.target.value)
              }))}
              className="appearance-none bg-neutral-800 border border-neutral-700 text-gray-200 rounded px-2 py-1 pr-6 text-sm focus:outline-none"
            >
              {availableFontSize.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleRunCode}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center"
          >
            <Play className="w-4 h-4 mr-1" />
            {complierState.isComplierRunning ? "Running.." : "Run"}
          </button>

          <button
            onClick={handleFormatCode}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center"
          >
            <FileCode className="w-4 h-4 mr-1" /> Format
          </button>

          <Popover
            placement="bottom"
            title="Ask Aurora"
            content="Debug your code with Aurora"
          >
            <button
              onClick={() => {
                navigate("/aurora");
              }}
              className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center"
            >
              <BrainCircuit className="w-4 h-4 mr-1" /> AI
            </button>
          </Popover>

          <button
            onClick={handleWordWrap}
            className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-100 px-2 py-1 rounded text-sm flex items-center"
          >
            <AlignJustify className="w-4 h-4 mr-1" />
            {editorState.isWordWrap ? "Wrap" : "No Wrap"}
          </button>
        </div>
      </div>
    </nav >
  )
}