const express = require("express");
const app = express();
var database = require("../config/database");

app.get("/projects", (req, res) => {
  let sql = "SELECT * FROM projects";

  database.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
      return;
    }
    if (result.length) res.json(result);
    else res.json({});
  });
});

app.get("/projects/project/:id", (req, res) => {
  let sql = `SELECT * FROM projects WHERE id = ${req.params.id}`;

  database.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
      return;
    }
    if (result.length) res.json(result);
    else res.json({});
  });
});

//C'est pour ajouter nos proets
app.post("/projects", (req, res) => {
  let sql = `INSERT INTO projects (title,image,description) VALUES (
    '${req.body.title}',
    '${req.body.image}',
    '${req.body.description}'
    )`;

  database.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
      return;
    }
    // en cas de succès
    res.status(200).json({
      status: 200,
      success: true,
      response: "Insertion du projet effectuée avec succès",
    });
  });
});

//C'est pour la modification d'un projet
app.put("/projects/:id", (req, res) => {
  let sql = `UPDATE projects SET title='${req.body.title}',image='${req.body.image}',description='${req.body.description}' WHERE id=${req.params.id}`;

  database.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
      return;
    }
    // en cas de succès
    res.status(200).json({
      status: 200,
      success: true,
      response: "Modification du projet effectuée avec succès",
    });
  });
});

// Pour la suppression
app.delete("/projects/:id", (req, res) => {
  let sql = `DELETE FROM projects WHERE id = ${req.params.id}`;

  database.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        status: 400,
        success: false,
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        response: "Suppression effectué avec succès",
      });
    }
  });
});

module.exports = app;
