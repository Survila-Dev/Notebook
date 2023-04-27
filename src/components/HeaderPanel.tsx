import React from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase";

interface IHeanderPanel {
    userInfo: any | null
    updateUserInfo: React.Dispatch<any | null>
    isLoggedIn: boolean,
    updateIfLoggedIn: React.Dispatch<boolean>
}

export const HeaderPanel: React.FC<IHeanderPanel> = ({userInfo, updateUserInfo, isLoggedIn, updateIfLoggedIn}) => {

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

    return (
        <section className = "header-panel">
            <div>
                <h1>Notebook App</h1>
                <p className = "header-panel__sync-text_success">Syncing</p>
            </div>
            <div className = "header-panel__buttons">
                {!isLoggedIn && <p>No user</p>}
                {isLoggedIn && <p>{userInfo.displayName}</p>}
                {!isLoggedIn && <button onClick = {handleClickLogIn}>Log in</button>}
                {/* {!userInfo && <button>Sign up</button>} */}
                {isLoggedIn && <button onClick = {handleClickLogOut}>Log out</button>}
            </div>
        </section>
    )
}
