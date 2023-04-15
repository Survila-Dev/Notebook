import React from 'react';
import './App.css';

import { HeaderPanel } from "./components/HeaderPanel";
import { NotebookSelection } from "./components/NotebookSelection";
import { Editor } from "./components/Editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { firebaseDatabase } from './firebase';

const App: React.FC = () => {

  const [notebooks, changeNotebooks] = React.useState<[string,string][]>([["none", "none"]])

  const [userInfo, updateUserInfo] = React.useState<null | any>(null)
  const [uidInfo, updateUID] = React.useState<string>("")
  const [pullFromDBTrigger, triggerPullFromDB] = React.useState<boolean>(false)

  const [editorContent, changeEditorContent] = React.useState<string>("")
  const [curNotebook, changeCurNotebook] = React.useState<number>(0)
  const [showNotebooks, changeShowNotebooks] = React.useState<boolean>(true)
  const [triggerSave, changeTriggerSave] = React.useState<boolean>(false)
  const [isLoggedIn, updateIfLoggedIn] = React.useState<boolean>(false)

  const auth = getAuth();

  React.useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        updateUserInfo(user)
        updateIfLoggedIn(true)
        updateUID(uid)
        triggerPullFromDB((cur) => !cur)

        const docRef = doc(firebaseDatabase, "notebooks", uid);
        getDoc(docRef)

        .then((result) => {
          const data = result.data()
          const outputArr: [string, string][] = []
          if (data) {
            for (let i = 0; i < data.notebooksName.length; i++) {
              outputArr.push([data.notebooksName[i], data.notebooksContent[i]])
            }
          }
          changeNotebooks(outputArr)
        })

        .catch((err) => {
          console.error(err)
        })

      } else {
        updateIfLoggedIn(false)
        changeNotebooks([["none", "none"]])
        changeEditorContent("none")
      }
    });
  }, [])

  React.useEffect(() => {

    if (isLoggedIn) {
      const docRef = doc(firebaseDatabase, "notebooks", uidInfo);
      getDoc(docRef)
      .then((result) => {

        const data = result.data()
        const outputArr: [string, string][] = []
        if (data) {
          for (let i = 0; i < data.notebooksName.length; i++) {
            outputArr.push([data.notebooksName[i], data.notebooksContent[i]])
          }
        }
        changeNotebooks(outputArr)

      })
      .catch((err) => {
        console.error(err)
      })
    }

  }, [pullFromDBTrigger])

  React.useEffect(() => {

    if (isLoggedIn) {

      const docData: {notebooksName: string[], notebooksContent: string[]} = {
        notebooksName: [],
        notebooksContent: []
      };

      for (let i = 0; i < notebooks.length; i++) {
        console.log(notebooks[i])
        docData.notebooksName.push(notebooks[i][0])
        docData.notebooksContent.push(notebooks[i][1])
      }

      setDoc(doc(firebaseDatabase, "notebooks", uidInfo), docData)
      .then(() => console.log("Success"))
      .catch(() => console.log("Failure"))

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

  // alter the class name for responsive design
  let classNameInput = "app"
  if (showNotebooks) {
    classNameInput += " app__show-notebooks"
  }

  return (
    <div className={classNameInput}>
      <HeaderPanel
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
        isLoggedIn = {isLoggedIn}
        updateIfLoggedIn= {updateIfLoggedIn}
        />
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

export default App