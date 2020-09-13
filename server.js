const express = require("express"); //IMPORTAR EXPRESS
const filesystem = require ("fs"); //IMPORTAR FILESYSTEM
const Sequelize = require ('sequelize');
const app = express();
app.use(express.json());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const db = new Sequelize ('mysql://root:1234@localhost:3306/evento');

app.post("/visitante",(req,res,next)=>{
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;

    if (email.includes ("hotmail.com")||email.includes ("gmail.com")||email.includes ("yahooo.com") ){
        res.status (400).json ({message:"No permitimos correos que terminen en hotmail.com, gmail.com o yahoo.com"})
      } //OTRA FORMA DE HACER ESTO next (new Error)

    db.query ('INSERT INTO persona (name,last_name, email,id_rol) VALUES (?,?,?,?)', {
        replacements: [name, lastName, email,3]
    } )
    .then ( (data) =>{
        const id = data[0];
        return db.query ('SELECT * FROM persona WHERE idpersona = ?' , {
            type: Sequelize.QueryTypes.SELECT,
            replacements:[id]
        })
    })
    .then ((data)=>{
        res.status(201).json (data[0])
    })
    .catch( (error)=>{
        res.status(500);
        res.json(error);
    })
})

app.listen(3006,() => {     
    console.log("Servidor empezo a escuchar"); //SIEMPRE SE PONE AL FINAL
    db.authenticate() //esta invocacion de metodo promesa es la conexion a la base de datos
    .then (()=>{
        console.log ("Base de datos conectada ok")
    })
    .catch ((error)=>{
        console.log (error)
    })   
});