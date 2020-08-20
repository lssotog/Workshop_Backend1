const Visitante = require("./visitante");

class Database {
    constructor() {
    
    const visitante1 = new Visitante({
        name: "Daniela",
        lastName: "Riano",
        email: "daniela@hotmail.com",
        id: 1,
    });

    const visitante2 = new Visitante({
        name: "Jessica",
        lastName: "Orjuela",
        email: "jessica@gmail.com",
        id: 2,
    });

    const visitante3 = new Visitante({
        name: "Anny",
        lastName: "Hernandez",
        email: "anny@yahoo.com",
        id: 3,
    });

    const visitante4 = new Visitante({
        name: "Luz",
        lastName: "Soto",
        email: "luz@outlook.com",
        id: 4,
    });

    this.visitantes = [visitante1, visitante2, visitante3, visitante4];
    }

getVisitantes() {
    return this.visitantes;
}

//CREAR VISITANTE

createVisitante(name, lastName, email) {
    return new Promise((resolve, reject) => {
      const visitantes = this.getVisitantes();

      const existVisitante = visitantes.find(
        (visitante) => visitante.name === name && visitante.lastName == lastName
      ); 

      if (existVisitante) {
        reject(
          new Error(
            "El visitante con nombre: " +
              name +
              " ya existe en nuestra base de datos"
          )
        );
      }

      const lastVisitante = visitantes[visitantes.length - 1];

      const newVisitante = new Visitante({
        name,
        lastName,
        email,
        id: lastVisitante.id + 1,
      });

if (newVisitante.email.includes ("hotmail.com")||newVisitante.email.includes ("gmail.com")||newVisitante.email.includes ("yahooo.com") ){
    reject (new Error ("No permitimos correos que terminen en hotmail.com, gmail.com o yahoo.com"))
}
      this.visitantes.push(newVisitante);
      resolve(newVisitante);
    });
  }
}

module.exports = Database