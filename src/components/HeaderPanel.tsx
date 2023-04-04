import React from "react"

interface IHeanderPanel {
    userInfo: any | null
    updateUserInfo: React.Dispatch<any | null>
}

export const HeaderPanel: React.FC<IHeanderPanel> = ({userInfo, updateUserInfo}) => {
    
    const handleClickLogIn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        // Call log in and return the user
    }

    const handleClickLogOut: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        // Log out and put "null" to userInfo

        updateUserInfo(null)
    }

    return (
        <section className = "header-panel">
            <h1>Notebook App</h1>
            <div className = "header-panel__buttons">
                {!userInfo && <p>No user</p>}
                {userInfo && <p>{userInfo}</p>}
                {!userInfo && <button onClick = {handleClickLogIn}>Log in</button>}
                {/* {!userInfo && <button>Sign up</button>} */}
                {userInfo && <button onClick = {handleClickLogOut}>Log out</button>}
            </div>
        </section>
    )
}

export default HeaderPanel;
