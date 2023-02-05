import React from 'react';
import './App.css';

import HeaderPanel from "./components/HeaderPanel";
import NotebookSelection from "./components/NotebookSelection";
import Editor from "./components/Editor";

function App() {

  const [editorContent, changeEditorContent] = React.useState<string>("")
  const [notebooks, changeNotebooks] = React.useState<[string,string][]>([
    ["first", "first text"], ["second", "second text"]])
  // const [curNotebook, changeCurNotebook] = React.useState<number>(0)

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
