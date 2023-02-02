import React from "react"
import Notebook from "./Notebook"

interface NotebookSelectionProps {
    notebooks: string[],
    changeNotebooks: React.Dispatch<React.SetStateAction<string[]>>
}

function NotebookSelection({ notebooks, changeNotebooks }: NotebookSelectionProps): JSX.Element {

    function handleDeleteClick(e: React.FormEvent) {
        e.preventDefault();
        const curId = (e.target as Element).id;
        console.log(curId);

        changeNotebooks((curNotebooks) => {
            let newNotebooks = curNotebooks;
            newNotebooks.splice(curId as unknown as number, 1);
            console.log(newNotebooks);
            return newNotebooks;
        })

    }

    return (
        <section className = "notebooks">
            {notebooks.map((inputString, index) => (
                <Notebook
                    id = {index as unknown as string}
                    title = {inputString}
                    onClickHandle = {handleDeleteClick}
                />))}
        </section>
    )
}

export default NotebookSelection;
