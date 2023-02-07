import React from "react"

interface EditorProp {
    editorContent: string,
    changeEditorContent: React.Dispatch<React.SetStateAction<string>>,
    handleClickSave: Function,
    showNotebooksResp: boolean,
    changeShowNotebooksResp: React.Dispatch<React.SetStateAction<boolean>>,
    changeTriggerSave: React.Dispatch<React.SetStateAction<boolean>>
}

function Editor({
        editorContent,
        changeEditorContent,
        handleClickSave,
        showNotebooksResp,
        changeShowNotebooksResp,
        changeTriggerSave
    }:EditorProp): JSX.Element {

    function onEditorChange(e: React.FormEvent<HTMLTextAreaElement>) {
        changeEditorContent(e.currentTarget.value);
    }

    function handleClickGoToNotebooks(e: React.FormEvent) {
        changeShowNotebooksResp(true);
    }

    function handleSaveClick(e: React.FormEvent) {
        changeTriggerSave((cur) => !cur)
    }

    let classNameInput = "editor"
    if (showNotebooksResp) {
        classNameInput += " editor__show-notebooks"
    }

    return (
        <section className = {classNameInput}>
            <h2>Editor</h2>
            <textarea className = "editor__textarea" value = {editorContent} onChange = {onEditorChange}></textarea>
            <button className = "editor__save-button" onClick = {handleSaveClick}>Save</button>
            <button className = "editor__notebooks-button" onClick = {handleClickGoToNotebooks}>Notebooks</button>
        </section>
    )
}

export default Editor;
