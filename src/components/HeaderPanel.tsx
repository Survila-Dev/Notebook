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
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // updateUserInfo({"credential": credential, "user": result.user})
            // console.log({"credential": credential, "user": result.user})
            // updateIfLoggedIn(true)
            // updateUserInfo(credential)
            // const token = credential.accessToken;
            // const user = result.user;
            
            // ...
        }).catch((error) => {
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            // updateUserInfo(null)
            // updateIfLoggedIn(false)
            //ToDo failed to log in, show pop up
            alert("Failed to log in. Error: " + error)
        });
    }

    const handleClickLogOut: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        // Log out and put "null" to userInfo
        signOut(auth).then(() => {
            console.log("Sign out is successful.")
            // updateIfLoggedIn(false)
          }).catch((error) => {
            alert("Sign out was not successful. Error: " + error)
            // updateIfLoggedIn(true)
          });

        // updateUserInfo(null)
    }

    return (
        <section className = "header-panel">
            <h1>Notebook App</h1>
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

export default HeaderPanel;
