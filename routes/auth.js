const express = require("express");
const app = express();
const database = require("../config/database");
const authValidations = require("../validations/auth");

//handle authentication
app.post("/authenticate", (req, res) => {
  //Get the encrypted email and password
  let requestBody = getCredentialsFromHeaders(req);

  //validation our authentication using joi npm library
 const {error}= authValidations (requestBody)

 if (error){
     res.json({
         id : "",
         message: error.details[0].message
     })
 }
 else
 {
     let sql = `SELECT id FROM users WHERE email = '${requestBody.email}' AND password = '${requestBody.password}'`;

     database.query(sql,(err,result)=>{
         if (err){
             res.status(400).send(err);
             return;
         }

         if (result.length) res.json(result[0]);
         else res.json (
            {
                id:"",
                message: "username ou password incorrect"
            }
         )
     })
 }

});

//ajout des infos des users
function getCredentialsFromHeaders(req) {
  //let's create a function that parse the email and password from the headers

  //Get the autorization from headers
  let authorization = req.header("Authorization");

  //convert authorization to array
  let authData = authorization.split("");

  //convert tu utf-8
  let token = Buffer.from(`${authData[1]}`, "base64").toString("utf8");

  //convert token to array
  let credentials = token.split(":");

  return {
    email: credentials[0],
    password: credentials[1],
  };
}

module.exports = app;
