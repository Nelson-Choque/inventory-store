import mysql from 'mysql2';


const connection = mysql.createConnection({
    
    database: "db_tienda",
    host: "localhost",
    user: "root",
    password: "",

})

connection.connect((err)=>{

    if(err){
        throw "error en la conexion: "+ err;
    }

    console.log("todo guchi");

})

export default connection;


