import React from "react"
import Notebook from "./Notebook"

interface NotebookSelectionProps {
    curNotebook: number,
    changeCurNotebook: React.Dispatch<React.SetStateAction<number>>,
    notebooks: [string, string][],
    changeNotebooks: React.Dispatch<React.SetStateAction<[string, string][]>>,
    showNotebooksResp: boolean,
    changeShowNotebooksResp: React.Dispatch<React.SetStateAction<boolean>>
}

function NotebookSelection({ curNotebook, changeCurNotebook, notebooks, changeNotebooks, showNotebooksResp, changeShowNotebooksResp }: NotebookSelectionProps): JSX.Element {

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
    }

    function handleCreateNewNotebook(e: React.FormEvent) {
        
        changeNotebooks((cur) => {
            const newCur = JSON.parse(JSON.stringify(cur))
            newCur.push(["new notebook", ""])
            return newCur;
        })
    }

    function handleClickGoBack(e: React.FormEvent) {
        changeShowNotebooksResp(false)
    }

    let classNameInput = "notebooks"
    if (showNotebooksResp) {
        classNameInput += " notebooks__show-notebooks"
    }

    return (
        <section className = {classNameInput}>
            <h2>Notebooks</h2>
            <div className = "notebooks__selection">
                {notebooks.map((inputString, index) => (
                    <Notebook
                        id = {index as unknown as string}
                        key = {index as unknown as string}
                        selectedId = {curNotebook as unknown as string}
                        notebooks = {notebooks}
                        changeNotebooks = {changeNotebooks}
                        handleClick = {handleSelectClick}
                        handleDeleteClick = {handleDeleteClick}
                    />))}
            </div>
            <button className = "notebooks__add-button" onClick = {handleCreateNewNotebook}>New notebook</button>
            <button className = "notebooks__back-button" onClick = {handleClickGoBack}>Notes</button>
        </section>
    )
}

export default NotebookSelection;
