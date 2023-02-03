import React from 'react';
import logo from './logo.svg';
import './App.css';

import HeaderPanel from "./components/HeaderPanel";
import NotebookSelection from "./components/NotebookSelection";
import Editor from "./components/Editor";

function App() {

  const [editorContent, changeEditorContent] = React.useState<string>("")
  const [notebooks, changeNotebooks] = React.useState<string[]>(["first", "second", "third"])
  function handleClickSave() {
    
  }

  return (
    <div className="app">
      <HeaderPanel/>
      <NotebookSelection
        notebooks = {notebooks}
        changeNotebooks = {changeNotebooks}
        />
      <Editor
        editorContent = {editorContent} 
        changeEditorContent = {changeEditorContent}
        handleClickSave = {handleClickSave}
        />
    </div>
  );
}

export default App;
