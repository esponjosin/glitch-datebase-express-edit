const express = require('express')
const router = express.Router()
let info = {
 '/set': {
  desc: 'This endpoint requires 2 parameters [id, value (support json)]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/set?id=test&value=hi`,
  return: `The new data that was entered in the id`
 },
 '/get': {
  desc: 'This endpoint requires 1 parameters [id]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/get?id=test`,
  return: `The data possessed by id or null if it has nothing`
 },
 '/fetch': {
  desc: 'This endpoint requires 1 parameters [id]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/fetch?id=test`,
  return: `The data possessed by id or null if it has nothing`
 },
 '/add': {
  desc: 'This endpoint requires 2 parameters [id, value]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/add?id=test&value=200`,
  return: `The value to be added, the old value and the new valu`
 },
 '/subtract': {
  desc: 'This endpoint requires 2 parameters [id, value]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/subtract?id=test&value=200`,
  return: `The value that was subtracted, the old value and the new value`
 },
 '/delete': {
  desc: 'This endpoint requires 1 parameters [id]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/delete?id=test`,
  return: `It will return a message saying if the id data were deleted or if the id did not have any data`
 },
 '/all': {
  desc: 'This endpoint requires 1 endpoint [id], and 2 does not need [sort, filter]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/all?sort=balance`,
  return: `t returns an array and if you used the sort it returns it ordered according to what you indicated in the parameter and / or filtering according to the filter you used`
 },
 '/push': {
  desc: 'This endpoint requires 2 parameters [id, value (support json)]',
  example: `https://${process.env.PROJECT_NAME}.glitch.me/push?id=test&value={balance: 200}`,
  return: `It will return the old value of the id and the new value of the id or if the id is not an array it will return an error saying (Target is not an array.)`
 }
 }

router.get('/help/endpoints', (req, res) => {
 
 res.json(info)
  
})
router.get('/help/*', (req, res) => {
let endpoint = req.url.split('/help/').join('')

if(endpoint.includes('/')) endpoint = endpoint.split('/').join('')

let data = info[`/${endpoint}`]

if(data === null) return res.status(405).json({
status: 405,
message: 'This endpoint does not exist'
}); else return res.status(200).json(data)
  
})

module.exports = router;
