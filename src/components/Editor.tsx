import React from "react"

interface EditorProp {
    editorContent: string,
    changeEditorContent: React.Dispatch<React.SetStateAction<string>>,
    handleClickSave: Function,
}

function Editor({ editorContent, changeEditorContent, handleClickSave}:EditorProp): JSX.Element {
    return (
        <section className = "editor">
            <h2>Editor</h2>
            <textarea className = "editor__textarea"></textarea>
            <button className = "editor__button">Save</button>
        </section>
    )
}

export default Editor;
