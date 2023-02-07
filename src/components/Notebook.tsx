import React from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { GrStatusGood } from "react-icons/gr"

interface NotebookInterface {
    id: string,
    selectedId: string,
    notebooks: [string, string][],
    changeNotebooks: React.Dispatch<React.SetStateAction<[string, string][]>>,
    handleClick: React.MouseEventHandler<HTMLElement>,
    handleDeleteClick: React.MouseEventHandler<SVGElement>,
    showEditorInit?: boolean,
}

function Notebook({ id, selectedId, notebooks, changeNotebooks, handleClick, handleDeleteClick, showEditorInit = false }: NotebookInterface): JSX.Element {

    // const showEditor: boolean = false;
    const [showEditor, changeShowEditor] = React.useState<boolean>(showEditorInit);
    const [triggerSelect, changeTriggerSelect] = React.useState<boolean>(true);

    const inputField = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputField.current !== null) {
            inputField.current.focus();
        }
    }, [triggerSelect])

    function handleClickOk (e: React.FormEvent<SVGElement>) {
        e.stopPropagation();
        changeNotebooks((cur) => {
            if (inputField.current !== null) {
                cur[id as unknown as number][0] = inputField.current.value;
            }
            return cur;
        })
        changeShowEditor(false);
    }
        
    function handleClickEdit (e: React.FormEvent<SVGElement>) {
        e.stopPropagation();
        changeTriggerSelect((cur) => !cur)
        changeShowEditor(true);
    }

    function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
        const inputValue: string = e.currentTarget.value;
        changeNotebooks((cur) => {
            const newCur = JSON.parse(JSON.stringify(cur))
            newCur[id as unknown as number][0] = inputValue;
            return newCur;
        })
    }

    function handleEnterClick (e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            changeNotebooks((cur) => {
                if (inputField.current !== null) {
                    cur[id as unknown as number][0] = inputField.current.value;
                }
                return cur;
            })
            changeShowEditor(false);
        }
    }

    // if showEditor then make showEditor false then click anywhere or enter
    let classNameInput = "notebooks__notebook";
    if (id == selectedId) {
        classNameInput += " notebooks__selected-notebook"
    }

    function jsxElementTitleOrEditor(showEditor : boolean) {
        if (!showEditor) {
            return (
                <p className = "notebooks__notebook__text">{notebooks[id as unknown as number][0]}</p>
            )
        } else {
            return (
                <input className = "notebooks__notebook__edit-title" ref = {inputField} type = "text" value = {notebooks[id as unknown as number][0]} onChange = {handleTitleChange} onKeyUp = {handleEnterClick}></input>
            )
        }
    }

    return (
        <article
            id = {id}
            key = {id}
            className = {classNameInput}
            onClick = {!showEditor ? handleClick : undefined}
            >
                {jsxElementTitleOrEditor(showEditor)}
                <div className = "notebooks__notebook__buttons">
                    {!showEditor ? <AiOutlineEdit id = {id} className = "notebooks__notebook__icon-button" onClick = {handleClickEdit}/> : <GrStatusGood id = {id} className = "notebooks__notebook__icon-button" onClick = {handleClickOk}/>}
                    <RiDeleteBin2Line id = {id} className = "notebooks__notebook__icon-button" onClick = {handleDeleteClick}/>
                </div>
        </article>
    )
}

export default Notebook;