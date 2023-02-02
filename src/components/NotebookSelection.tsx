import React from "react"
import Notebook from "./Notebook"

interface NotebookSelectionProps {
    notebooks: string[],
    changeNotebooks: React.Dispatch<React.SetStateAction<string[]>>
}

function NotebookSelection({ notebooks, changeNotebooks }: NotebookSelectionProps): JSX.Element {
    return (
        <section className = "notebooks">
            {notebooks.map((inputString, index) => <Notebook id = {index as unknown as string} title = {inputString}/>)}
        </section>
    )
}

export default NotebookSelection;
