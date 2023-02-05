import React from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"

interface NotebookInterface {
    id: string,
    title: string,
    onClickHandle: React.MouseEventHandler<HTMLElement>,
}

function Notebook({ id, title, onClickHandle }: NotebookInterface): JSX.Element {

    const showEditor: boolean = false;
    // {!showEditor ? <p className = "notebooks__notebook__text">{title}</p> : <input className = "notebooks__notebook__edit-title" type = "text"></input>}
    // <button className = "notebooks__notebook__delete-button">Delete</button>

    return (
        <article
            id = {id}
            key = {id}
            className = "notebooks__notebook"
            onClick = {onClickHandle}
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