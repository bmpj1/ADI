const express = require('express')
const { hasAdminsRights } = require('../middleware/auth')
// Import models
const dbHelper = require("../models/dbHelpers")
// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()


 /**
 * Metodo que AGREGA UNA CATEGORIA
 * @author Brian Mathias Pesci Juliani
 * @returns {json} - json(categoria_id) o json({ message }) 
 */
router.post("/categorias", hasAdminsRights, (pet, res) => {
  var allOK = true
    if(!pet.body.categoria) {
      this.allOk = false;
      res.status(400).json("Falta la categoria") 
    }
    const newCategoria = pet.body.categoria
  
    if(!newCategoria.nombre) {
      allOK = false
      res.status(400).json("Falta el nombre de la categoria")
    }
  
    if(allOK) {
      dbHelper.add("categorias", newCategoria)
      .then(categoria => {
        res.status(201).json(categoria)
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La categoria ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      }) 
    }
  })
  
  /**
   * Metodo que devuelve una COLLECTION CON TODA LA TABLA CATEGORIAS
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(categorias) o json({ message }) 
   */
  router.get("/categorias", (pet,res) => {
    dbHelper.tabla("categorias")
    .then(categorias => {
        res.status(200).json(categorias)
    })
    .catch(error => {
      res.status(500).json("Algo ha salido mal")
    })
  })
  
  /**
   * Metodo que obtiene UNA CATEGORIA POR SU ID
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(categoria) o json({ message }) 
   */
  router.get("/categorias/:id", (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.findById("categorias", id)
      .then(categoria => {
        if(categoria)
          res.status(200).json(categoria)
        else 
          res.status(404).json({ message: "La categoria no existe" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ACTUALIZAR LA INFORMACIÓN DE UNA CATEGORIA
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(categoria_id) o json({ message })
   */
  router.patch("/categorias/:id", hasAdminsRights, (pet, res) => {
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
  
    if(!changes.nombre)  {
      allOK = false
      res.status(400).json({ message: "El nombre de la categoria es obligatorio"})
    }
  
    if(allOK) {
      dbHelper.update("categorias", id, changes)
      .then(categoria => {
        if(categoria)
          res.status(200).json(categoria)
        else
          res.status(404).json({ message: "La categoria no existe" })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La categoria ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ELIMINAR UNA CATEGORIA
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json({ message }) 
   */
  router.delete("/categorias/:id", hasAdminsRights, (pet, res) => {
    const { id } = pet.params
    var allOK = true;
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.remove("categorias", id)
      .then(count => {  // count>0 = true
        if(count)
          res.status(200).json({ message: "Categoria eliminada correctamente" })
        else
          res.status(404).json({ message: "No se ha encontrado la categoria" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  module.exports = router;