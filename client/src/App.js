import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
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
    <div className="App">
      <h1>List of students</h1>

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
      <div className="list">
        {!list.length ? (<div className='error'>List is empty... Please add students</div>)
          : list.map((data) => (
            <div key={data.id} className="list__block">
              <div className='student__name'>{data.name}</div>
              <span>|</span>
              <div className='student__group'>{data.group}</div>
              <div className="btn">
                <button className='edit' onClick={() => editOpen(data.id)}>Edit</button>
                <button className='delete' onClick={() => deleteStudent(data.id)}>Delete</button>
              </div>
            </div>
          ))}

      </div>
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
    </div >
  );
}
export default App;
