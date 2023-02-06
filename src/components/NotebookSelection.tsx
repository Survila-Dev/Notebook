import React from "react"
import Notebook from "./Notebook"

interface NotebookSelectionProps {
    curNotebook: number,
    changeCurNotebook: React.Dispatch<React.SetStateAction<number>>,
    notebooks: [string, string][],
    changeNotebooks: React.Dispatch<React.SetStateAction<[string, string][]>>
}

function NotebookSelection({ curNotebook, changeCurNotebook, notebooks, changeNotebooks }: NotebookSelectionProps): JSX.Element {

    // function handleDeleteClick(e: React.FormEvent) {
    //     e.preventDefault();
    //     const curId = (e.target as Element).id;
    //     console.log(curId);

    //     changeNotebooks((curNotebooks) => {
    //         let newNotebooks = JSON.parse(JSON.stringify(curNotebooks));
    //         newNotebooks.splice(curId as unknown as number, 1);
    //         console.log(newNotebooks);
    //         return newNotebooks;
    //     })

    // }

    function handleSelectClick(e: React.FormEvent) {
        const targetId = (e.target as Element).id;
        changeCurNotebook(targetId as unknown as number);
    }

    function handleDeleteClick(e: React.FormEvent) {
        e.stopPropagation();
        const targetId = (e.target as Element).id as unknown as number;
        
        changeNotebooks((cur) => {
            const newCur = JSON.parse(JSON.stringify(cur))
            newCur.splice(targetId, 1);
            console.log(newCur);
            return newCur;
        })
    }

    return (
        <section className = "notebooks">
            <h2>Notebooks</h2>
            <div className = "notebooks__selection">
                {notebooks.map((inputString, index) => (
                    <Notebook
                        id = {index as unknown as string}
                        key = {index as unknown as string}
                        title = {inputString[0]}
                        notebooks = {notebooks}
                        changeNotebooks = {changeNotebooks}
                        handleClick = {handleSelectClick}
                        handleDeleteClick = {handleDeleteClick}
                    />))}
            </div>
            <button className = "notebooks__add-button">New notebook</button>
            <button className = "notebooks__back-button">Go back</button>
        </section>
    )
}

export default NotebookSelection;
