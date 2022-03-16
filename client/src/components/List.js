import { useEffect, useState } from 'react';
import MainForm from './MainForm';
import Students from './Students';
import EditForm from './EditForm';
import axios from 'axios';


const List = () => {

    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [editName, setEditName] = useState('');
    const [editGroup, setEditGroup] = useState('');
    const [list, setList] = useState([]);
    const [indxStudent, setIndxStudent] = useState({})
    const [formValid, setFormValid] = useState(false)
    const [editList, setEditList] = useState({})

    const addStudent = () => {
        const id = Date.now()
        axios.post('http://localhost:3001/addstudent', {
            id: id,
            name: name,
            group: group,
        }).then((response) => {
            setList([
                ...list,
                {
                    id: id,
                    name: name,
                    group: group,
                },
            ]);
        });
        setName('')
        setGroup('')
    }

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
            setList(list.filter(el => el.id !== id))
        })
    }

    const editOpen = (id) => {
        const editForm = document.querySelector('.editform');
        editForm.classList.add('active');

        const student = list.find(el => el.id === id)

        setIndxStudent(student)
    }

    const editStudent = () => {

        axios.put(`http://localhost:3001/edit/${indxStudent.id}`, {
            ...indxStudent,
            name: editName,
            group: editGroup,
        }).then((response) => {
            indxStudent.name = response.data.name
            indxStudent.group = response.data.group

            setEditList(response.data)
        })

        const editForm = document.querySelector('.editform');
        editForm.classList.remove('active');
        setEditName('');
        setEditGroup('')

        axios.get("http://localhost:3001/allstudents").then((response) => {
            setList(response.data)
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3001/allstudents").then((response) => {
            setList(response.data)
        })
    }, [editList])


    useEffect(() => {
        if (name == '' || group == '') {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [name, group])

    useEffect(() => {
        if (editName == '' || editGroup == '') {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [editGroup, editName])

    return (
        <>
            <MainForm
                formValid={formValid}
                setName={setName}
                setGroup={setGroup}
                name={name}
                group={group}
                addStudent={addStudent}
            />
            <div className="list">
                {!list.length ? (<div className='error'>List is empty... Please add students</div>)
                    : list.map((data) => (
                        <Students data={data} editOpen={editOpen} deleteStudent={deleteStudent} />
                    ))}
            </div>
            <EditForm
                editName={editName}
                setEditName={setEditName}
                editGroup={editGroup}
                setEditGroup={setEditGroup}
                formValid={formValid}
                editStudent={editStudent}
            />
        </>
    )
}

export default List;