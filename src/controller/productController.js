import connection from "../db/connection.js";


export const getProducts = ("/producto", (req, res) => {
    connection.query("select * from producto", (err, result) => {
      if (err) {
        throw "hubo un error: " + err;
      }
  
      res.send(result);
    });
  });
  