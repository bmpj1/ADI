const express = require('express')
// Import models
const dbHelper = require("../models/dbHelpers")
// Exportamos las rutas con esto y "module.exports = router" al final del archivo
const router = express.Router()


/**
 * Devuelve los datos que hagan falta en el Home del servidor
 * @author Brian Mathias Pesci Juliani
 */
router.get("/", (pet, res) => {
  res.json({ message: "Ruta principal"})
})

module.exports = router;