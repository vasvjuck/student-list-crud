import React from 'react'

const EditForm = ({ editName, setEditName, editGroup, setEditGroup, formValid, editStudent }) => {
    return (
        <div className="editform">
            <input
                value={editName}
                type="text"
                placeholder='Edit your FullName...'
                onChange={e => setEditName(e.target.value)}
            />
            <input
                value={editGroup}
                type="text"
                placeholder='Edit your group...'
                onChange={e => setEditGroup(e.target.value)}
            />
            <button disabled={!formValid} onClick={editStudent}>Update Student</button>
        </div>
    )
}

export default EditForm