const express = require('express')
const { hasAdminsRights } = require('../middleware/auth')
// Import models
const dbHelper = require("../models/dbHelpers")
// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()


 /**
 * Metodo que AGREGA UN ARTICULO
 * @author Brian Mathias Pesci Juliani
 * @returns {json} - json(articulo_id) o json({ message }) 
 */
router.post("/articulos", hasAdminsRights, (pet, res) => {
  var allOK = true;
    if(!pet.body.articulo) {
      this.allOk = false;
      res.status(400).json("Falta el articulo") 
    }
    const newArticulo = pet.body.articulo
  
    if(!newArticulo.codigo) {
      allOK = false
      res.status(400).json("Falta el codigo del articulo")
    }
    if(!newArticulo.nombre) {
      allOK = false
      res.status(400).json("Falta el nombre del articulo")
    }
    if(!newArticulo.pvp) {
      allOK = false
      res.status(400).json("Falta el pvp del articulo")
    }
    if(!newArticulo.marca_id) {
      allOK = false
      res.status(400).json("Falta la marca del articulo") 
    }
    if(!newArticulo.categoria_id) {
      allOK = false
      res.status(400).json("Falta la categoria del articulo") 
    }
    
    if(allOK) {
      dbHelper.add("articulos", newArticulo)
      .then(articulo => {
        res.status(201).json(articulo)
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "El articulo ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      }) 
    }
  })
  
  /**
   * Metodo que devuelve una COLLECTION CON TODA LA TABLA ARTICULOS
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(articulos) o json({ message }) 
   */
  router.get("/articulos", (pet,res) => {
    dbHelper.tabla("articulos")
    .then(articulos => {
        res.status(200).json(articulos)
    })
    .catch(error => {
      res.status(500).json("Algo ha salido mal")
    })
  })
  
  /**
   * Metodo que obtiene UN ARTICULO POR SU ID
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(articulo) o json({ message }) 
   */
  router.get("/articulos/:id", (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.findById("articulos", id)
      .then(articulo => {
        if(articulo)
          res.status(200).json(articulo)
        else 
          res.status(404).json({ message: "El articulo no existe" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ACTUALIZAR LA INFORMACIÓN DE UN ARTICULO
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(articulo_id) o json({ message })
   */
  router.patch("/articulos/:id", hasAdminsRights, (pet, res) => {
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
  
    if(!changes.codigo) {
      allOK = false
      res.status(400).json("Falta el codigo del articulo")
    }
    if(!changes.nombre) {
      allOK = false
      res.status(400).json("Falta el nombre del articulo")
    }
    if(!changes.pvp) {
      allOK = false
      res.status(400).json("Falta el pvp del articulo")
    }
  
    if(allOK) {
      dbHelper.update("articulos", id, changes)
      .then(articulo => {
        if(articulo)
          res.status(200).json(articulo)
        else
          res.status(404).json({ message: "El articulo no existe" })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "El articulo ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ELIMINAR UN ARTICULO
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json({ message }) 
   */
  router.delete("/articulos/:id", hasAdminsRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.remove("articulos", id)
      .then(count => {  // count>0 = true
        if(count)
          res.status(200).json({ message: "Articulo eliminado correctamente" })
        else
          res.status(404).json({ message: "No se ha encontrado el articulo" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  module.exports = router;