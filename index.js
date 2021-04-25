import express from 'express'
const app = express()

app.use(express.json())

let persons = [
    {
        id:1,
        name:"Arto Hellas",
        number: "040-123456"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id:3,
        name:"Dan Abramov",
        number: "12-43-234345"
    },
    {
        id:4,
        name:"Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/info',(request,response) => {
    let date = new Date()
    const con = persons.map(e=>e.id).length
    response.send(`<h1> Phone has info for ${con} people</h1>
    <br>
    <h2>date: ${date}</h2>`)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(202).end()
})

app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const person = request.body
    if(!person.content){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const nuevaPersona = {
        id: Math.random(),
        name: person.name,
        number: person.number,

    }
    persons.push(nuevaPersona)
    response.status(201).json(nuevaPersona)
}) 

const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
