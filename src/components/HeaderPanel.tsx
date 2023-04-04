import React from "react"

function HeaderPanel(): JSX.Element {
    return (
        <section className = "header-panel">
            <h1>Notebook App</h1>
            <div className = "header-panel__buttons">
                <p>No user</p>
                <button>Log in</button>
                <button>Sign up</button>
                <button>Log out</button>
            </div>
        </section>
    )
}

export default HeaderPanel;
