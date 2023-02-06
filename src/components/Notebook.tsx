import React from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { GrStatusGood } from "react-icons/gr"

interface NotebookInterface {
    id: string,
    title: string,
    notebooks: [string, string][],
    changeNotebooks: React.Dispatch<React.SetStateAction<[string, string][]>>,
    handleClick: React.MouseEventHandler<HTMLElement>,
    handleDeleteClick: React.MouseEventHandler<SVGElement>,
    showEditorInit?: boolean,
}

function Notebook({ id, title, notebooks, changeNotebooks, handleClick, handleDeleteClick, showEditorInit = true }: NotebookInterface): JSX.Element {

    // const showEditor: boolean = false;
    const [showEditor, changeShowEditor] = React.useState<boolean>(showEditorInit);

    function handleClickOk (e: React.FormEvent<SVGElement>) {
        e.stopPropagation();
        // changeNotebooks((cur) => {
        //     cur[id as unknown as number] = (e. as Element).value
        // })
        changeShowEditor(false);
    }
        
    function handleClickEdit (e: React.FormEvent<SVGElement>) {
        e.stopPropagation();
        changeShowEditor(true);
    }

    // if showEditor then make showEditor false then click anywhere or enter

    return (
        <article
            id = {id}
            key = {id}
            className = "notebooks__notebook"
            onClick = {!showEditor ? handleClick : undefined}
            >
                {!showEditor ? <p className = "notebooks__notebook__text">{title}</p> : <input className = "notebooks__notebook__edit-title" type = "text" value = {title}></input>}
                <div className = "notebooks__notebook__buttons">
                    {!showEditor ? <AiOutlineEdit id = {id} className = "notebooks__notebook__icon-button" onClick = {handleClickEdit}/> : <GrStatusGood id = {id} className = "notebooks__notebook__icon-button" onClick = {handleClickOk}/>}
                    <RiDeleteBin2Line id = {id} className = "notebooks__notebook__icon-button" onClick = {handleDeleteClick}/>
                </div>
        </article>
    )
}

export default Notebook;