const express = require('express')
const router = express.Router()
const moment = require("moment")
const jwt = require("jwt-simple");
//const moment = require("moment");  //para trabajar cómodamente con fechas
// Import models
//const dbHelper = require("../models/dbHelpers")

/**
 * Metodo privado que decodifica la cabecera para obtener el JWT y agrega el rol al body
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*} Agrega el jwt decodificado a la cabecera
 */
const authenticateJWT = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ') // Separamos BEARER y TOKEN
        if(!token[0].toLowerCase().startsWith("bearer"))
            throw new Error("Falta BEARER")
        req.body["decodedToken"] = jwt.decode(token[1], "unencodedKey", "HS512") 
        //console.log(req.body)
        next();
    } catch {
        // De momento no relanzamos el error
        res.status(401).json({ error: new Error("No tienes derechos.")})
    }
}

/**
 * Comprueba si el tiempo de expiracion es mayor
 * @param {*} expDate 
 * @returns {boolean} - True si expDate > actualDate
 */
function validJWTExpDate(expDate) {
    return expDate > moment().valueOf()
}

/**
 * Comprueba si el usuario tiene permisos de admin con su JWT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*} Agrega el "decodedToken" con datos del usuario a la pet o lanza Error
 */
var hasAdminsRights = [
    authenticateJWT, 
    (req, res, next) => {
    try {
        const rol = req.body.decodedToken.rol.toString()
        //delete req.body["decodedToken"]
        if(validJWTExpDate(req.body.decodedToken.exp)) 
        if(rol==="admin" && validJWTExpDate(req.body.decodedToken.exp)) {
            next()
        } else {
            throw new Error("No tienes privilegios de admin")
        }
    } catch {
        // De momento no relanzamos el error
        res.status(401).json({ error: new Error("No tienes derechos.")})
    }
    }   
]

/**
 * Comprueba si el usuario tiene permisos de usuario con su JWT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*} Agrega el "decodedToken" con datos del usuario a la pet o lanza Error
 */
const hasUsersRights = [
    authenticateJWT, 
    (req, res, next) => {
    try {
        const rol = req.body.decodedToken.rol.toString()
        //delete req.body["decodedToken"]

        if((rol==="usuario" || rol==="admin")  && validJWTExpDate(req.body.decodedToken.exp)) {
            next()
        } else {
            throw new Error("No tienes privilegios de usuario")
        }
    } catch {
        // De momento no relanzamos el error
        res.status(401).json({ error: new Error("No tienes derechos.")})
    }
    }
]

module.exports = {
    hasAdminsRights,
    hasUsersRights
}    