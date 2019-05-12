const express = require('express')
const router = express.Router()

router.get('*', (req, res) => {
 res.redirect(`http://${process.env.PROJECT_DOMAIN}.glitch.me/help/endpoints`)
})

module.exports = router;
