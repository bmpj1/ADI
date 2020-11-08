const express = require('express')
const router = express.Router()
const jwt = require("jwt-simple");
const moment = require("moment");  //para trabajar cómodamente con fechas
// Import models
const dbHelper = require("../models/dbHelpers")

router.get("/login", (pet, res) => {
  var allOK = true
  const login = pet.body
  if(!login.email) {
      allOK = false
      res.status(400).json({ message: "El email es obligatorio"})
    }
  if(!login.password) {
      allOK = false
      res.status(400).json({ message: "La contraseña es obligatoria"})
  }
  
  if(allOK) {
      dbHelper.login(login.email, login.password)
      .then(usuario => {
          if(usuario) {
              // DATOS QUE GUARDARÁ EL CLIENTE Y ENVIARA CODIFICADOS EN LA CABECERA
              var payload = { 
                  id: usuario.id,
                  email: login.email,
                  exp: moment().add(7,'days').valueOf(),
                  rol: usuario.rol
              }
              var aux = jwt.encode(payload, "unencodedKey", 'HS512')
              //console.log(jwt.decode(aux, login.password, 'HS512'))
              res.status(200).json({ accessToken: aux})
          }
          else 
              res.status(404).json({ message: "Credenciales inválidas" })
      })
      .catch(error => {
          res.status(500).json({ message: "Algo ha salido mal" })
      })
  }
})

module.exports = router;