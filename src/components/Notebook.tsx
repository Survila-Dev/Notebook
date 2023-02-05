import React from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"

interface NotebookInterface {
    id: string,
    title: string,
}

function Notebook({ id, title }: NotebookInterface): JSX.Element {

    const showEditor: boolean = false;

    return (
        <article
            id = {id}
            key = {id}
            className = "notebooks__notebook"
            >
                {!showEditor ? <p className = "notebooks__notebook__text">{title}</p> : <input className = "notebooks__notebook__edit-title" type = "text"></input>}
                <div className = "notebooks__notebook__buttons">
                    <AiOutlineEdit className = "notebooks__notebook__icon-button"/>
                    <RiDeleteBin2Line className = "notebooks__notebook__icon-button"/>
                </div>
        </article>
    )
}

export default Notebook;