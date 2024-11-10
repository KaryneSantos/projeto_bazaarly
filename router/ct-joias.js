const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('ct-joias');
});

module.exports = router;