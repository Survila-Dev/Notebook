import React from "react"

interface EditorProp {
    editorContent: string,
    changeEditorContent: React.Dispatch<React.SetStateAction<string>>,
    handleClickSave: Function,
}

function Editor({ editorContent, changeEditorContent, handleClickSave}:EditorProp): JSX.Element {

    function onEditorChange(e: React.FormEvent<HTMLTextAreaElement>) {
        console.log(e.currentTarget.value);
        changeEditorContent(e.currentTarget.value);
    }

    return (
        <section className = "editor">
            <h2>Editor</h2>
            <textarea className = "editor__textarea" value = {editorContent} onChange = {onEditorChange}></textarea>
            <button className = "editor__save-button">Save</button>
            <button className = "editor__notebooks-button">Notebooks</button>
        </section>
    )
}

export default Editor;
