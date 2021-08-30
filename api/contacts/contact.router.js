const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { 
    createContacts,
    getContacts,
    login } = require("./contact.controller");

router.post("/", checkToken, createContacts);
router.get("/", getContacts);
router.post("/login", login);

module.exports = router;
