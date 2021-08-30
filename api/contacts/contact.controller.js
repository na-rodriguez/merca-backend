const { createContact, getContacts } = require("./contact.service");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
const jwt_decode = require('jwt-decode');

const clientMacapaAuthKey = process.env.CLIENT_MACAPA_KEY;
const clientVarejaoAuthKey = process.env.CLIENT_VAREJAO_KEY;
const isClientValidKey = (key) => {
    return clientMacapaAuthKey === key || clientVarejaoAuthKey === key
}
const getClientName = (key) => {
    if(clientMacapaAuthKey === key)
        return process.env.CLIENT_MACAPA_NAME
    if(clientVarejaoAuthKey === key)
        return process.env.CLIENT_VAREJAO_NAME
    return ''
}

module.exports = {
createContacts: (req, res) => {
    const clientName = jwt_decode(JSON.stringify(req.headers.authorization)).clientName;
    req.body.contacts.forEach(contact => {
        const body = contact;
        body.name = formatName(body.name, clientName);
        body.celular = formatCelular(body.cellphone, clientName)
        body.client = clientName
        createContact(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
            success: 0,
            message: "Database connection errror"
            });
        }
        return res.status(201).json({
            success: 1,
            data: results
        });
        });
    });
},
login: (req, res) => {
    const body = req.body;
    const isClientValid = isClientValidKey(body.key);
    if (isClientValid) {
        const jsontoken = sign({clientName: getClientName(body.key) }, process.env.JWT_KEY, {
        expiresIn: "1h"
        });
        return res.json({
        success: 1,
        message: "login successfully",
        token: jsontoken
        });
    } else {
        return res.json({
        success: 0,
        data: "Invalid authentication key"
        });
    }
},
getContacts: (req, res) => {
    getContacts((err, results) => {
    if (err) {
        console.log(err);
        return;
    }
    return res.json({
        success: 1,
        contacts: results
    });
    });
}
};

const formatName = (name, client) => {
    if(isClientVarejao(client)){
        return name
    }
    return name.toUpperCase()
}

const isClientVarejao = (client) => {
    return client === "VareJão"
}

const formatCelular = (celular, client) => {
    let celularFormatted = "";

    if (isClientVarejao(client)) {
        celularBeginning = celular.substring(0, 4);
        celularEnd = celular.substring(5, celular.length);
        celularFormatted = `${celularBeginning}${celularEnd}`;
    } else {
        celularFormatted =
            `+${celular.slice(0, 2)} (${celular.slice(2, 4)}) ${celular.slice(4, 9)}-${celular.slice(9, celular.length)}`
    }

    return celularFormatted
}
