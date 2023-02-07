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
  const [showNotebooks, changeShowNotebooks] = React.useState<boolean>(true)

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

  let classNameInput = "app"
  if (showNotebooks) {
    classNameInput += " app__show-notebooks"
  }

  return (
    <div className={classNameInput}>
      <HeaderPanel/>
      <NotebookSelection
        curNotebook = {curNotebook}
        changeCurNotebook = {changeCurNotebook}
        notebooks = {notebooks}
        changeNotebooks = {changeNotebooks}
        showNotebooksResp = {showNotebooks}
        changeShowNotebooksResp = {changeShowNotebooks}
        />
      <Editor
        editorContent = {editorContent} 
        changeEditorContent = {changeEditorContent}
        handleClickSave = {handleClickSave}
        showNotebooksResp = {showNotebooks}
        changeShowNotebooksResp = {changeShowNotebooks}
        />
    </div>
  );
}

export default App;
