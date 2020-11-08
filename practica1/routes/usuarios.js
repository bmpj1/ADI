const express = require('express')
// Import models
const dbHelper = require("../models/dbHelpers")

// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()
const jwt = require("jwt-simple")
const { isAdmin, hasAdminsRights } = require('../middleware/auth')

/**
 * Metodo que AGREGA UN USUARIO
 * @author Brian Mathias Pesci Juliani
 * @params req.body.usuario Estructura con los datos del usuario dentro del body
 * @returns {json} - json(usuario_id) o json({ message }) 
 */
router.post("/usuarios", (pet, res) => {
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
        res.status(201).json(usuario)
      })
      .catch(error => {
        if(error.errno == 19)
          res.status(409).json({ message: "El email ya existe"})
        else
          res.status(500).json({ message: "Algo ha salido mal"})
      })
    }
  })
  
  /**
   * Metodo que devuelve una COLLECTION CON TODA LA TABLA USUARIOS
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(usuarios) o json({ message }) 
   */
  router.get("/usuarios", hasAdminsRights, (pet, res) => {
    dbHelper.tabla("usuarios")
    .then(usuarios => {
      if(usuarios)
        res.status(200).json(usuarios)
    })
    .catch(error => {
      res.status(500).json({ message: "Algo ha salido mal"})
    })
  })
  
  /**
   * Metodo que obtiene UN USUARIO POR SU ID
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(usuario) o json({ message }) 
   */
  router.get("/usuarios/:id", (pet, res) => {
    const { id } = pet.params;
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.findById("usuarios", id)
      .then(usuario => {
        if(usuario) {
          var data = usuario
          delete data["password"]
          res.status(200).json(data)
        }
        else
          res.status(404).json({ message: "Usuario no encontrado" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      }) 
    }
  })
  
  /**
   * Metodo que permite ELIMINAR UN USUARIO
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json({ message }) 
   */
  router.delete("/usuarios/:id", hasAdminsRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.remove("usuarios", id)
      .then(count => {  // count>0 = true
        if(count)
          res.status(200).json({ message: "Usuario eliminado correctamente" })
        else
          res.status(404).json({ message: "No se ha encontrado el usuario" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ACTUALIZAR LA INFORMACIÓN DE UN USUARIO
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(usuario_id) o json({ message })
   */
  router.patch("/usuarios/:id", (pet,  res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
    if(!pet.body.changes) {
      this.allOk = false;
      res.status(400).json("Faltan los changes") 
    }
    var changes = pet.body.changes
    changes["id"] = id
    
    // Comprobamos que se cumplan las restricciones de la migracion
    // antes de intentar insertar para saber que mensaje de error lanzar
    if(!changes.email) {
      allOK = false
      res.status(400).json({ message: "El email es obligatorio"})
    }
    if(!changes.nombre) {
      allOK = false
      res.status(400).json({ message: "El nombre es obligatorio"})
    }
    if(!changes.apellidos) {
      allOK = false
      res.status(400).json({ message: "El apellido es obligatorio"})
    }
  
    // Intentamos actualizar el usuario
    if(allOK) {
      dbHelper.update("usuarios", id, changes)
      .then(usuario => {
        if(usuario)
          res.status(200).json(usuario)
        else
          res.status(404).json({ message: "El usuario no existe" })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "El email ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })

  module.exports = router;