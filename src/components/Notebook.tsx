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
                {id}, {title}
        </article>
    )
}

export default Notebook;