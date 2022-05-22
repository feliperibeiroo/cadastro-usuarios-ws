var express = require('express')
var router = express.Router()

router.get('/', function(req: any, res: any) {
    res.send('Tudo ok com o GET do router usuario!')
})

module.exports = router