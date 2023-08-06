import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "containers-us-west-119.railway.app",
  database: "railway",
  user: "root",
  password: "khpttFqSPiTcifP39Hgn",
  port: "6430",
});

connection.connect((err) => {
  if (err) {
    throw "error en la conexion: " + err;
  }

  console.log("todo guchi");
});

export default connection;
