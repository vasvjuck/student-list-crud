const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let LIST = [
    { id: 1, name: 'Ivan Ivanov', group: 'IPZ' }
]

app.get('/allstudents', (req, res) => {
    res.status(200).json(LIST)
})

app.post("/addstudent", (req, res) => {

    const student = { ...req.body }

    LIST.push(student)
    res.status(201).json({ student })
});

app.delete('/delete/:id', (req, res) => {
    LIST = LIST.filter(el => el.id != req.params.id)
    res.status(200).json({ message: "Student was deleted" })
})

app.put('/edit/:id', (req, res) => {
    console.log(req.body)
    const idx = LIST.findIndex(el => el.id == req.params.id)
    LIST[idx] = req.body
    res.json(LIST[idx])
})

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'crudapp',
// })

// app.get("/students", (req, res) => {
//     db.query("SELECT * FROM students", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// });
app.listen(3001, () => { console.log(1) })