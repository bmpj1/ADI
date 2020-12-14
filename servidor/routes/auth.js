const express = require('express')
const router = express.Router()
const jwt = require("jwt-simple");
const moment = require("moment");  //para trabajar cómodamente con fechas
// Import models
const dbHelper = require("../models/dbHelpers")

router.post("/api/auth/login", (pet, res) => {
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
              var data = usuario
              delete data["password"]
              res.status(200).json({ accessToken: aux, usuario:data })
          }
          else 
              res.status(404).json({ message: "Credenciales inválidas" })
      })
      .catch(error => {
          res.status(500).json({ message: "Algo ha salido mal" })
      })
  }
})

/**
 * Metodo que AGREGA UN USUARIO
 * @author Brian Mathias Pesci Juliani
 * @params req.body.usuario Estructura con los datos del usuario dentro del body
 * @returns {json} - json(usuario_id) o json({ message }) 
 */
router.post("/api/auth/register", (pet, res) => {
    var allOK = true
      if(!pet.body.usuario) {
        this.allOk = false;
        res.status(400).json("Falta el usuario") 
      }

      const newUser = pet.body.usuario
      // Comprobamos que se cumplan las restricciones de la migracion
      // antes de intentar insertar para saber que mensaje de error lanzar
      if(!newUser.email) {
        allOK = false
        res.status(400).json({ message: "El email es obligatorio"})
      }
      if(!newUser.password) {
        allOK = false
        res.status(400).json({ message: "La contraseña es obligatoria"})
      }
      if(!newUser.nombre) {
        allOK = false
        res.status(400).json({ message: "El nombre es obligatorio"})
      }
      if(!newUser.apellidos) {
        allOK = false
        res.status(400).json({ message: "El apellido es obligatorio"})
      }
    
      // Intentamos insertar
      if(allOK) {
        dbHelper.add("usuarios", newUser)
        .then(usuario => {
          if(usuario) {
            dbHelper.findById("usuarios", usuario).then(
              usuario => {
                // DATOS QUE GUARDARÁ EL CLIENTE Y ENVIARA CODIFICADOS EN LA CABECERA
                var payload = { 
                  id: usuario.id,
                  email: usuario.email,
                  exp: moment().add(7,'days').valueOf(),
                  rol: usuario.rol
                }
                var aux = jwt.encode(payload, "unencodedKey", 'HS512')
                //console.log(jwt.decode(aux, login.password, 'HS512'))
                var data = usuario
                delete data["password"]
                res.status(201).json({ accessToken: aux, usuario:data })
              }
            )
          }
        })
        .catch(error => {
          if(error.errno == 19)
            res.status(409).json({ message: "El email ya existe"})
          else
            res.status(500).json({ message: "Algo ha salido mal"})
        })
      }
    })

module.exports = router;