import { useEffect, useState } from 'react';

const MainForm = ({ setName, setGroup, name, group, addStudent, formValid }) => {
    return (
        <div className="form">
            <input
                value={name}
                type="text"
                placeholder='Enter your FullName...'
                onChange={e => setName(e.target.value)}
            />
            <input
                value={group}
                type="text"
                placeholder='Enter your group...'
                onChange={e => setGroup(e.target.value)}
            />
            <button disabled={!formValid} onClick={addStudent}>Add Student</button>
        </div>
    )
}

export default MainForm