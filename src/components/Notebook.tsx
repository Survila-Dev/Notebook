import React from "react"

interface NotebookInterface {
    id: string,
    title: string,
}

function Notebook({ id, title }: NotebookInterface): JSX.Element {

    function handleDeleteClick(e: React.FormEvent) {
        e.preventDefault();
        const curId = (e.target as Element).id;
        console.log(curId);
    }

    return (
        <article className = "notebooks__notebook" onClick = {handleDeleteClick} id = {id}>{id}, {title}</article>
    )
}

export default Notebook;