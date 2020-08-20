const express = require("express"); //IMPORTAR EXPRESS
const filesystem = require ("fs"); //IMPORTAR FILESYSTEM
const Database = require("./database");
const db = new Database ();
const app = express();
app.use(express.json());

app.post("/visitante",(req,res,next)=>{
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    db.createVisitante (name, lastName, email).then((newVisitante)=>{
        res.json({ data:newVisitante
        })
    }).catch ((error)=>{
        res.json({
            message:error.message
        })
    })
    
})

app.listen(3006,() => {     
    console.log("Servidor empezo a escuchar"); //SIEMPRE SE PONE AL FINAL
});