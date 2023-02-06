import React from 'react';
import './App.css';

import HeaderPanel from "./components/HeaderPanel";
import NotebookSelection from "./components/NotebookSelection";
import Editor from "./components/Editor";

function App() {

  
  
  const [notebooks, changeNotebooks] = React.useState<[string,string][]>([
    ["first", "first text"], ["second", "second text"], ["third", "third text"], ["forth", "forth text"]])
  const [editorContent, changeEditorContent] = React.useState<string>(notebooks[0][1])

  const [curNotebook, changeCurNotebook] = React.useState<number>(0)

  React.useEffect(() => {
    changeEditorContent(notebooks[curNotebook][1])
  }, [curNotebook])

  React.useEffect(() => {
    changeNotebooks((cur) => {
      cur[curNotebook][1] = editorContent;
      return cur;
    })
  }, [editorContent])

  function handleClickSave() {
    
  }

  return (
    <div className="app">
      <HeaderPanel/>
      <NotebookSelection
        curNotebook = {curNotebook}
        changeCurNotebook = {changeCurNotebook}
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
