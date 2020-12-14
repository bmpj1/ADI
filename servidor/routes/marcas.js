const express = require('express')
const { hasAdminsRights } = require('../middleware/auth')
// Import models
const dbHelper = require("../models/dbHelpers")
// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()

 /**
 * Metodo que AGREGA UNA MARCA
 * @author Brian Mathias Pesci Juliani
 * @returns {json} - json(marca_id) o json({ message }) 
 */
router.post("/marcas", hasAdminsRights, (pet, res) => {
  var allOK = true
    if(!pet.body.marca) {
      this.allOk = false;
      res.status(400).json("Falta la marca") 
    }
    
    const newMarca = pet.body.marca

    if(!newMarca.marca) {
      allOK = false
      res.status(400).json("Falta el nombre de la marca")
    }
  
    if(allOK) {
      dbHelper.add("marcas", newMarca)
      .then(marca => {
        res.status(201).json(marca)
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La marca ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      }) 
    }
  })
  
  /**
   * Metodo que devuelve una COLLECTION CON TODA LA TABLA MARCAS
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(marcas) o json({ message }) 
   */
  router.get("/marcas", (pet,res) => {
    dbHelper.tabla("marcas")
    .then(marcas => {
        res.status(200).json(marcas)
    })
    .catch(error => {
      res.status(500).json("Algo ha salido mal")
    })
  })
  
  /**
   * Metodo que obtiene UNA MARCA POR SU ID
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(marca) o json({ message }) 
   */
  router.get("/marcas/:id", (pet, res) => {
    const { id } = pet.params
    var allOK = true;
  
    if (isNaN(id)) {
      allOK = false;
      res.status(400).json({mensaje:"el id debe ser numérico"})
    }
  
    if(allOK) {
      dbHelper.findById("marcas", id)
      .then(marca => {
        if(marca)
          res.status(200).json(marca)
        else 
          res.status(404).json({ message: "La marca no existe" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ACTUALIZAR LA INFORMACIÓN DE UNA MARCA
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json(marca_id) o json({ message })
   */
  router.patch("/marcas/:id", hasAdminsRights, (pet, res) => {
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
  
    if(!changes.marca) {
      allOK = false
      res.status(400).json({ message: "El nombre de la marca es obligatorio"})
    }
  
    if(allOK) {
      dbHelper.update("marcas", id, changes)
      .then(marca => {
        if(marca)
          res.status(200).json(marca)
        else
          res.status(404).json({ message: "La marca no existe" })
      })
      .catch(error => {
        if(error.errno==19)
          res.status(409).json({ message: "La marca ya existe" })
        else
          res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  /**
   * Metodo que permite ELIMINAR UNA MARCA
   * @author Brian Mathias Pesci Juliani
   * @returns {json} - json({ message }) 
   */
  router.delete("/marcas/:id", hasAdminsRights, (pet, res) => {
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
          res.status(200).json({ message: "Marca eliminada correctamente" })
        else
          res.status(404).json({ message: "No se ha encontrado la marca" })
      })
      .catch(error => {
        res.status(500).json({ message: "Algo ha salido mal" })
      })
    }
  })
  
  module.exports = router;