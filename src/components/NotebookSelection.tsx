import React from "react"
import { Notebook } from "./Notebook"
import { AiOutlinePlus } from "react-icons/ai"

interface NotebookSelectionProps {
    curNotebook: number,
    changeCurNotebook: React.Dispatch<React.SetStateAction<number>>,
    notebooks: [string, string][],
    changeNotebooks: React.Dispatch<React.SetStateAction<[string, string][]>>,
    showNotebooksResp: boolean,
    changeShowNotebooksResp: React.Dispatch<React.SetStateAction<boolean>>,
    changeTriggerSave: React.Dispatch<React.SetStateAction<boolean>>
}

export const NotebookSelection: React.FC<NotebookSelectionProps> = ({
        curNotebook,
        changeCurNotebook,
        notebooks,
        changeNotebooks,
        showNotebooksResp,
        changeShowNotebooksResp,
        changeTriggerSave
    }) => {

    function handleSelectClick(e: React.FormEvent) {
        const targetId = e.currentTarget.id;
        changeCurNotebook(targetId as unknown as number);
    }

    function handleDeleteClick(e: React.FormEvent) {
        e.stopPropagation();
        const targetId = (e.currentTarget.id)

        if (targetId as unknown as number === curNotebook) {
            changeCurNotebook(0);
        }
        
        changeNotebooks((cur) => {
            const newCur = JSON.parse(JSON.stringify(cur))
            newCur.splice(targetId, 1);
            return newCur;
        })
        changeTriggerSave((cur) => !cur)
    }

    function handleCreateNewNotebook(e: React.FormEvent) {
        
        changeNotebooks((cur) => {
            const newCur = JSON.parse(JSON.stringify(cur))
            newCur.push(["new notebook", ""])
            return newCur;
        })
        changeTriggerSave((cur) => !cur)
    }

    function handleClickGoBack(e: React.FormEvent) {
        changeShowNotebooksResp(false)
    }

    // alter the class name for responsive design
    let classNameInput = "notebooks"
    if (showNotebooksResp) {
        classNameInput += " notebooks__show-notebooks"
    }

    let notebooksJSX;
    if (notebooks.map) {
        notebooksJSX = notebooks.map((inputString, index) => (
            <Notebook
                id = {index as unknown as string}
                key = {index as unknown as string}
                selectedId = {curNotebook as unknown as string}
                notebooks = {notebooks}
                changeNotebooks = {changeNotebooks}
                handleClick = {handleSelectClick}
                handleDeleteClick = {handleDeleteClick}
                changeTriggerSave = {changeTriggerSave}
            />))
    } else {
        console.log(notebooks)
        notebooksJSX = <></>
    }
  
    return (
        <section className = {classNameInput}>
            <h2>Notebooks</h2>
            <div className = "notebooks__selection">
                {notebooksJSX}
            </div>
            <button className = "notebooks__add-button" onClick = {handleCreateNewNotebook}><AiOutlinePlus className = "notebooks__add-button_symbol"/><p>New notebook</p></button>
            <button className = "notebooks__back-button" onClick = {handleClickGoBack}>Notes</button>
        </section>
    )
}
