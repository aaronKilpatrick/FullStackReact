const Note = ({ note, toggleImportance }) => {
const label = note.important ? 'Not Important' : 'Important'
    return (
        <li className="note">
            {note.content}
            <button className="important" onClick={toggleImportance}>{label}</button>    
        </li>
)
}

export default Note