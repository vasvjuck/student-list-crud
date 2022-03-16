import React from 'react'

const Students = ({ data, editOpen, deleteStudent }) => {
    return (
        <>
            <div key={data.id} className="list__block">
                <div className='student__name'>{data.name}</div>
                <span>|</span>
                <div className='student__group'>{data.group}</div>
                <div className="btn">
                    <button className='edit' onClick={() => editOpen(data.id)}>Edit</button>
                    <button className='delete' onClick={() => deleteStudent(data.id)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Students