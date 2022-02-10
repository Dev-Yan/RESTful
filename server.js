const express = require('express');
const { use } = require('express/lib/application');
const app = express();
const doc = require ('./doc.json');

app.use(express.json()); 

// consultar todos os dados da api 
app.get("/users", (req, res) => {
    res.json(doc);                  
})

// consultar um dado especifico da api passando no endpoint o id desse dado
app.get("/users/:id", (req, res) => {
    const {id} = req.params
    const user = doc.find(us => us.id == id);

    if(!user) return res.status(204).json(); // se caso não existir registro do id inserido no endpoint, retorna o status 204 (No Content)
    
    res.json(user);
})

// salvar 
app.post("/users", (req, res) =>{
    const {name, username, email} = req.body

    res.json({name, username, email});
})

//editar
app.put("/users/:id", (req, res) =>{

    const {id} = req.params
    const user = doc.find(use => use.id == id);

    if(!user) return res.status(204).json();

    const {name} = res.body;

    user.name = name;

    res.json(user);

})

//deletar 
app.delete("/users/:id", (req, res) =>{
    const {id} = req.params;
    const filterUsers = doc.filter(user => user.id != id);

    res.json(filterUsers);

    
})


app.listen(3000, ()=> {
    console.log('Server is runin in port: http://localhost:3000 ')
}) 