const express = require('express')
const { hasUsersRights } = require('../middleware/auth')
// Import models
const dbHelper = require("../models/dbHelpers")
const { allOk } = require('./marcas')
// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()

 /**
 * Metodo que CREA UNA DIRECCION Y LA ASOCIA A UN USUARIO
 * @author Brian Mathias Pesci Juliani
 * @returns {json} - json(direccion_id) o json({ message }) 
 */
router.post("/usuarios/:id/direcciones", hasUsersRights, (pet, res) => {
    const rol = pet.body.decodedToken? pet.body.decodedToken.rol.toString() : false
    const newDireccion = pet.body.direccion
    const usuario_id_token = pet.body.decodedToken? pet.body.decodedToken.id : false
    const { id } = pet.params // usuario_id de la ruta
    var allOK = true
    
    if(!newDireccion || !id) {
      allOK = false
      res.status(400).json("Falta "+(!newDireccion? "direccion" : "usuario"))
    }
    if((usuario_id_token != id) && rol && rol!=="admin") {
      allOk = false
      res.status(403).json({ error: new Error("FORBIDDEN: No tienes permisos para acceder al recurso")})
    }

    // Comprobar la tabla "direcciones", una misma direccion puede estar varias veces
    if(allOK) {
      dbHelper.add("direcciones", newDireccion)
      .then(direccion_id => {
        console.log({ usuario_id: id, direccion_id: direccion_id.toString() })
        dbHelper.add("usuarios_direcciones", { usuario_id: id, direccion_id: direccion_id.toString() })
        .then(usuario_direcciones_id => {
          res.status(201).json(usuario_direcciones_id)
        })
        .catch(error => {
          if(error.errno==19)
            res.status(409).json({ message: "El usuario ya tiene esa direccion" })
          else
            res.status(500).json({ message: "Algo ha salido mal" })
        })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La direccion ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      }) 
    }
  })
  
  /**
   * Metodo que devuelve una COLLECTION CON TODA LA TABLA DIRECCIONES DE UN USUARIO
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(direcciones) o json({ message }) 
   */
  router.get("/usuarios/:id/direcciones", hasUsersRights, (pet,res) => {
    const rol = pet.body.decodedToken? pet.body.decodedToken.rol.toString() : false
    const usuario_id_token = pet.body.decodedToken? pet.body.decodedToken.id : false
    const { id } = pet.params // usuario_id de la ruta

    var allOK = true
    if(isNaN(id)) {
      allOK = false
      res.status(400).json("El id debe ser numérico")
    }
    if(!id) {
      allOK = false
      res.status(400).json("Falta el id de usuario")
    }
    if((usuario_id_token != id) && rol && rol!=="admin") {
      allOk = false
      res.status(403).json({ error: new Error("FORBIDDEN: No tienes permisos para acceder al recurso")})
    }

    if(allOk && rol) {
      dbHelper.direccionesUsuario(id)
      .then(direcciones => {
          res.status(200).json({ direcciones: direcciones })
      })
      .catch(error => {
        res.status(500).json("Algo ha salido mal")
      })
    }
  })
  
  /**
   * Metodo que obtiene UNA DIRECCION POR SU ID
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(direccion) o json({ message }) 
   */
  router.get("/direccion/:id", hasUsersRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
  
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"El id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.findById("direcciones", id)
      .then(direccion => {
        if(direccion)
          res.status(200).json(direccion)
        else 
          res.status(404).json({ message: "La direccion no existe" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ACTUALIZAR LA INFORMACIÓN DE UNA DIRECCION
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(direccion_id) o json({ message })
   */
  router.patch("/direccion/:id", hasUsersRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    var changes = pet.body.changes
    changes["id"] = id
  
    if(allOK) {
      dbHelper.update("direcciones", id, changes)
      .then(direccion => {
        if(direccion)
          res.status(200).json(direccion)
        else
          res.status(404).json({ message: "La direccion no existe" })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La direccion ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ELIMINAR UNA DIRECCION
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json({ message }) 
   */
  router.delete("/marcas/:id", hasUsersRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.remove("marcas", id)
      .then(count => {  // count>0 = true
        if(count)
          res.status(200).json({ message: "Direccion eliminada correctamente" })
        else
          res.status(404).json({ message: "No se ha encontrado la direccion" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  module.exports = router;