import React from "react"

interface NotebookInterface {
    id: string,
    title: string,
    onClickHandle: React.MouseEventHandler<HTMLElement>,
}

function Notebook({ id, title, onClickHandle }: NotebookInterface): JSX.Element {

    return (
        <article
            id = {id}
            className = "notebooks__notebook"
            onClick = {onClickHandle}
            >
                <p className = "notebooks__notebook__text">{title}</p>
                <button className = "notebooks__notebook__rename-button">Rename</button>
                <button className = "notebooks__notebook__delete-button">X</button>
        </article>
    )
}

export default Notebook;