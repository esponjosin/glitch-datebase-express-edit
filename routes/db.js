const express = require('express')
const router = express.Router()
let db = require('quick.db')
const util = require('util')

router.get('/set', async (req, res) => {
 
  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/set`})
 
  if(!req.query.value && req.query.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/set`})
  
  let data = await table.set(`${req.query.id}`, req.query.value)
  
  return res.status(200).json({
  status: 200,
  table: req.query.table,
  id: req.query.id,
  data: data
  })
    
  } 
  else {
  
  if(!req.query.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/set`})
 
  if(!req.query.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/set`})
  
  let vala = req.query.value
  
  if(vala[0] === '{') {
    let text = vala
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
  }
vala = argument
  }
  
  let data = await db.set(`${req.query.id}`, req.query.vala)
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  data: data
  })
    
  }
  
  } catch(e) {
  
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
    
})

router.get('/get', async (req, res) => {

  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
  
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/get`})
    
  let data = await table.get(req.query.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  data: data
  })
    
  } else {
  
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/get`})
    
  let data = await db.get(req.query.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  data: data
  })
    
  }
    
  } catch(e) {
  
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
})

router.get('/fetch', async (req, res) => {

  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
  
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/fetch`})
    
  let data = await table.fetch(req.query.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  data: data
  })
    
  } else {
  
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/fetch`})
    
  let data = await db.fetch(req.query.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  data: data
  })
    
  }
    
  } catch(e) {
  
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
})

router.get('/all', async (req, res) => {
  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  let data = await table.all()
  
  let response = []
  
  for(var i in data) response.push({ID: data[i].ID, data: data[i].data})
  
  for(var i in response) response[i].data = JSON.parse(response[i].data)
    let temp = []
  
  if(req.query.sort && req.query.sort.length > 0) {
  
  for(var i in data) {
  let text = data[i].data
  if(text.startsWith('{')) {
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
}
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  }
  }
  data = temp
  data = await data.sort((a, b) => b.data[`${req.query.sort}`] - a.data[`${req.query.sort}`])
  } else {
  for(var i in data) {
  if(data[i].data[0] === '{') {
  let text = data[i].data
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
}
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  } else {
  temp.push({ID: data[i].ID, data: data[i].data})
  }
  }
  data = temp
  }
  if(req.query.filter && req.query.filter.length > 0) {
  let c = await eval(`data.filter(${req.query.filter})`)
  data = c
  }
    
  return res.status(200).json({
  status: 200,
  data: response
  })
    
  }
  else {
    
  let data = await db.all()
    
  for(var i in data) data[i].data = JSON.parse(data[i].data)
  let temp = []
  
  if(req.query.sort && req.query.sort.length > 0) {
  
  for(var i in data) {
  let text = data[i].data
  if(text.startsWith('{')) {
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
}
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  }
  }
  data = temp
  data = await data.sort((a, b) => b.data[`${req.query.sort}`] - a.data[`${req.query.sort}`])
  } else {
  for(var i in data) {
  if(data[i].data[0] === '{') {
  let text = data[i].data
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
}
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  } else {
  temp.push({ID: data[i].ID, data: data[i].data})
  }
  }
  data = temp
  }
  if(req.query.filter && req.query.filter.length > 0) {
  let c = await eval(`data.filter(${req.query.filter})`)
  data = c
  }
    
  return res.status(200).json({
  status: 200,
  data: data
  })
  }
    
  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
})

router.get('/add', async (req, res) => {
 
  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/add`})
 
  if(!req.query.value && req.query.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/add`})
  
  let data = await table.fetch(`${req.query.id}`)
  let data2 = await table.add(`${req.query.id}`, parseInt(req.query.value))
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toAdd: parseInt(req.query.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
    
  } 
  else {
  
  if(!req.query.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/add`})
 
  if(!req.query.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/add`})
  
  let data = await db.fetch(`${req.query.id}`)
  let data2 = await db.add(`${req.query.id}`, parseInt(req.query.value))
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toAdd: parseInt(req.query.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
    
  }
  
  } catch(e) {
  
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
    
})

router.get('/subtract', async (req, res) => {
 
  try {
    
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
 
  if(!req.query.value && req.query.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
  
  let data = await table.fetch(`${req.query.id}`)
  let data2 = await table.subtract(`${req.query.id}`, parseInt(req.query.value))
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toRemove: parseInt(req.query.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
    
  } 
  else {
  
  if(!req.query.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
 
  if(!req.query.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
  
  let data = await db.fetch(`${req.query.id}`)
  let data2 = await db.subtract(`${req.query.id}`, parseInt(req.query.value))
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toRemove: parseInt(req.query.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
    
  }
  
  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
    
})

router.get('/push', async (req, res) => {
  
  try {

  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/push`})
 
  if(!req.query.value && req.query.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/push`})
  
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  let vala = req.query.value
  
  if(vala[0] === '{') {
    let text = vala
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
  }
vala = argument
  }
  
  let data = await table.fetch(req.query.id)
  let data2 = await table.push(req.query.id, vala)
  
  return res.status(200).send({
  status: 200,
  oldvalue: data,
  newvalue: data2
  })
    
  } else {
  
  let vala = req.query.value
  
  if(vala[0] === '{') {
    let text = vala
text = text.split('{').join('')
text = text.split('}').join('')
text = text.split(',')
let argument = {}
for(var i in text) {
let t = text[i].split(':')
t[1] = t[1].slice(1)
let val;
if(/^[0-9]+$/.test(t[1])) val = parseFloat(t[1]); else val = t[1]
argument[t[0].replace(' ', '')] = val
  }
vala = argument
  }
  
  let data = await db.fetch(req.query.id)
  let data2 = await db.push(req.query.id, vala)
  
  return res.status(200).send({
  status: 200,
  oldvalue: data,
  newvalue: data2
  })
  }
    
  } catch(e) {
  console.log(e)
    
  return res.status(400).json({status: 404,
  error: e.message
  })
  } 
  
})

router.get('/delete', async (req, res) => {

if(!req.query.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/delete`})
  
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table)
    
  let data = await table.delete(req.query.id)
  
  if(data) return res.status(200).json({
  status: 200,
  id: req.query.id,
  message: 'The id data were successfully deleted'
  }); 
  else return res.status(401).json({
  status: 401,
  id: req.query.id,
  message: 'The entered id does not have any data'
  })
    
  }
  else {
  let data = await db.delete(req.query.id)
  
  if(data) return res.status(200).json({
  status: 200,
  id: req.query.id,
  message: 'The id data were successfully deleted'
  }); 
  else return res.status(401).json({
  status: 401,
  id: req.query.id,
  message: 'The entered id does not have any data'
  })
  }
  
})

module.exports = router;
