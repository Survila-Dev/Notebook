import React from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { ISyncStatus } from "../App";

interface IHeanderPanel {
    userInfo: any | null
    updateUserInfo: React.Dispatch<any | null>
    isLoggedIn: boolean,
    updateIfLoggedIn: React.Dispatch<boolean>,
    syncStatus: ISyncStatus
}

export const HeaderPanel: React.FC<IHeanderPanel> = ({userInfo, updateUserInfo, isLoggedIn, updateIfLoggedIn, syncStatus}) => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    
    const handleClickLogIn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Log in is successful.")
        }).catch((error) => {
            alert("Failed to log in. Error: " + error)
        });
    }

    const handleClickLogOut: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        
        signOut(auth).then(() => {
            console.log("Sign out is successful.")
          }).catch((error) => {
            alert("Sign out was not successful. Error: " + error)
          });
    }

    let syncStatusJSX = <></>

    switch(syncStatus) {
        case "success":
            syncStatusJSX = <p className = "header-panel__sync-text_success">Successful sync.</p>
            break
        case "failure":
            syncStatusJSX = <p className = "header-panel__sync-text_fail">Failed sync.</p>
            break
        case "pending":
            syncStatusJSX = <p className = "header-panel__sync-text_in_work">Syncing</p>
            break
        
    }

    return (
        <section className = "header-panel">
            <div>
                <h1>Notebook App</h1>
                {syncStatusJSX}
            </div>
            <div className = "header-panel__buttons">
                <p>Backend disabled.</p>
                {/* {!isLoggedIn && <p>No user</p>}
                {isLoggedIn && <p>{userInfo.displayName}</p>}
                {!isLoggedIn && <button onClick = {handleClickLogIn}>Log in</button>}
                {isLoggedIn && <button onClick = {handleClickLogOut}>Log out</button>} */}
            </div>
        </section>
    )
}
