import mysql from "mysql2";

const connection = mysql.createConnection({
  database: "topitop",
  host: "localhost",
  user: "root",
  password: "1234",
});

connection.connect((err) => {
  if (err) {
    throw "error en la conexion: " + err;
  }

  console.log("todo guchi");
});

export default connection;
