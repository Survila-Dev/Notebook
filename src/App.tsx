import React from 'react';
import './App.css';

import HeaderPanel from "./components/HeaderPanel";
import NotebookSelection from "./components/NotebookSelection";
import Editor from "./components/Editor";

function App() {

  const [notebooks, changeNotebooks] = React.useState<[string,string][]>([["none", "none"]])
    // [
    // ["first", "first text"], ["second", "second text"], ["third", "third text"], ["forth", "forth text"]])
  const [editorContent, changeEditorContent] = React.useState<string>("")
  const [curNotebook, changeCurNotebook] = React.useState<number>(0)
  const [showNotebooks, changeShowNotebooks] = React.useState<boolean>(true)
  const [triggerSave, changeTriggerSave] = React.useState<boolean>(false)

  React.useEffect(() => {
    console.log("Get data")
    const fetchData = async () => {
      try {
        const dataAPI = "http://localhost:8000/data";
        const response = await fetch(dataAPI);
        const dataRaw = await response.json();
        console.log(dataRaw);

        const dataArr: [string, string][] = Object.values(dataRaw)
        changeNotebooks(dataArr)
        changeEditorContent(dataArr[0][1])

      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, [])

  React.useEffect(() => {
    // create object for saving data
    console.log("Put data")
    let putObject: any = {};
    for (let i = 0; i < notebooks.length; i++) {
      putObject[i] = notebooks[i]
    }
    
    const writeData = async () => {
      try {
        const dataAPI = "http://localhost:8000/data";
        const requestOptions = {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(putObject)
        }
        const response = await fetch(dataAPI, requestOptions);
        const data = await response.json();
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    }
    if (!(notebooks[0][0] === "none" && notebooks[0][1] === "none" && notebooks.length === 1)) {
      writeData();
    }


  }, [triggerSave])

  React.useEffect(() => {
    if (notebooks[curNotebook]) {
      changeEditorContent(notebooks[curNotebook][1])
    } else {
      changeEditorContent("")
    }
  }, [curNotebook])

  React.useEffect(() => {
    changeNotebooks((cur) => {
      if (cur[curNotebook]) {
        cur[curNotebook][1] = editorContent;
      }
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
        changeTriggerSave = {changeTriggerSave}
        />
    </div>
  );
}

export default App;
