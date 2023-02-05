import React from "react"

interface NotebookInterface {
    id: string,
    title: string,
    onClickHandle: React.MouseEventHandler<HTMLElement>,
}

function Notebook({ id, title, onClickHandle }: NotebookInterface): JSX.Element {

    const showEditor: boolean = false;
    // {!showEditor ? <p className = "notebooks__notebook__text">{title}</p> : <input className = "notebooks__notebook__edit-title" type = "text"></input>}

    return (
        <article
            id = {id}
            key = {id}
            className = "notebooks__notebook"
            onClick = {onClickHandle}
            >
                {!showEditor ? <p className = "notebooks__notebook__text">{title}</p> : <input className = "notebooks__notebook__edit-title" type = "text"></input>}
                <div className = "notebooks__notebook__buttons">
                    <button className = "notebooks__notebook__rename-button">Rename</button>
                    <button className = "notebooks__notebook__delete-button">Delete</button>
                </div>
        </article>
    )
}

export default Notebook;