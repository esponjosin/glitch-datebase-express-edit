const express = require('express')
const router = express.Router()
let db = require('quick.db')
const util = require('util')
const utils = require('/app/utils/util.js')

router.get('/quick_db/set', async (req, res) => {
 
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
    
  if(info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/set`})
 
  if(info.value && info.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/set`})
    
  let vala;
  if(info.value[0] === '{') vala = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  vala = []
  for(var item of info.value) if(item[0] === ' ') vala.push(item.slice(1)); else vala.push(item)
  } else if(/^[0-9]+$/.test(info.value)) vala = parseFloat(info.value);
  else vala = info.value
  
  let data = await table.set(`${info.id}`, vala)
  
  return res.status(200).json({
  status: 200,
  table: info.table,
  id: info.id,
  data: data
  })
    
  } 
  else {
  
  if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/set`})
 
  if(!info.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/set`})
    
  let vala;
  if(info.value[0] === '{') vala = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  vala = []
  for(var item of info.value) if(item[0] === ' ') vala.push(item.slice(1)); else vala.push(item)
  } else if(/^[0-9]+$/.test(info.value)) vala = parseFloat(info.value);
  else vala = info.value
  
  let data = await db.set(`${info.id}`, vala)
  
  return res.status(200).json({
  status: 200,
  id: info.id,
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

router.get('/quick_db/get', async (req, res) => {

  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
  
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/get`})
    
  let data = await table.get(info.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  table: info.table,
  id: info.id,
  data: data
  })
    
  } else {
  
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/get`})
    
  let data = await db.get(info.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: info.id,
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

router.get('/quick_db/fetch', async (req, res) => {

  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
  
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/fetch`})
    
  let data = await table.fetch(info.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  table: info.table,
  id: info.id,
  data: data
  })
    
  } else {
  
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/fetch`})
    
  let data = await db.fetch(info.id)
  
  if(!data || data === null) return res.status(402).json({
  status: 402,
  message: 'The entered id does not contain any value'
  })
  
  return res.status(200).json({
  status: 200,
  id: info.id,
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

router.get('/quick_db/all', async (req, res) => {
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  sort: req.headers['sort'] || req.query.sort,
  filter: req.headers['filter'] || req.query.filter
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
    
  let data = await table.all()
  
  let response = []
  
  for(var i in data) response.push({ID: data[i].ID, data: data[i].data})
  
  for(var i in response) response[i].data = JSON.parse(response[i].data)
    let temp = []
  
  if(info.sort && info.sort.length > 0) {
  
  for(var i in data) {
  let text = data[i].data
  if(text[0] === '{') {
let argument = await utils.JSON(text)
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  }
  }
  data = temp
  data = await data.sort((a, b) => b.data[`${info.sort}`] - a.data[`${info.sort}`])
  } else {
  for(var i in data) {
  if(data[i].data[0] === '{') {
  let text = data[i].data
let argument = await utils.JSON(text)
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  } else {
  temp.push({ID: data[i].ID, data: data[i].data})
  }
  }
  data = temp
  }
  if(info.filter && info.filter.length > 0) {
  let c = await eval(`data.filter(${info.filter})`)
  data = c
  }
    
  return res.status(200).json({
  status: 200,
  data: response
  })
    
  }
  else {
    
  let data = await db.all()
    
  for(var i in data) {
  data[i].data = JSON.parse(data[i].data)
  }
    
  let temp = []
  
  if(info.sort && info.sort.length > 0) {
  
  for(var i in data) {
  let text = data[i].data
let argument = await utils.JSON(text)
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  }
  data = temp
  data = await data.filter(x => x.data[`${info.sort}`])
  data = await data.sort((a, b) => b.data[`${info.sort}`] - a.data[`${info.sort}`])
  } else {
  for(var i in data) {
  let text = data[i].data
let argument = await utils.JSON(text)
  data[i].data = argument
  temp.push({ID: data[i].ID, data: argument})
  }
  data = temp
  }
  if(info.filter && info.filter.length > 0) {
  let c = await eval(`data.filter(${info.filter})`)
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

router.get('/quick_db/add', async (req, res) => {
 
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
    
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/add`})
 
  if(!info.value && info.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/add`})
  
  let data = await table.fetch(`${info.id}`)
  let data2 = await table.add(`${info.id}`, parseInt(info.value))
  
  return res.status(200).json({
  status: 200,
  id: info.id,
  table: info.table,
  toAdd: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseFloat(data) : data,
  newvalue: parseInt(data2)
  })
    
  } 
  else {
  
  if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/add`})
 
  if(!info.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/quick_db/add`})
  
  let data = await db.fetch(`${info.id}`)
  let data2 = await db.add(`${info.id}`, parseInt(info.value))
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toAdd: parseInt(info.value),
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

router.get('/quick_db/subtract', async (req, res) => {
 
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
    
  if(!info.id && info.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
 
  if(!info.value && info.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
  
  let data = await table.fetch(`${info.id}`)
  let data2 = await table.subtract(`${info.id}`, parseInt(info.value))
  
  return res.status(200).json({
  status: 200,
  id: info.id,
  table: info.table,
  toRemove: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
    
  } 
  else {
  
  if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
 
  if(!info.value) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/subtract`})
  
  let data = await db.fetch(`${info.id}`)
  let data2 = await db.subtract(`${info.id}`, parseInt(info.value))
  
  return res.status(200).json({
  status: 200,
  id: req.query.id,
  toRemove: parseInt(info.value),
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

router.get('/quick_db/push', async (req, res) => {
  
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }

  if(!req.query.id && req.query.id.length > 0) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/push`})
 
  if(!req.query.value && req.query.value.length > 0) return res.status(404).send({status: 404,
  error: `No Value was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/push`})
  
  if(req.query.table && req.query.table.length > 0) {
  
  let table = new db.table(req.query.table.split(' ').join('_'))
    
  let vala;
  if(info.value[0] === '{') vala = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  vala = []
  for(var item of info.value) if(item[0] === ' ') vala.push(item.slice(1)); else vala.push(item)
  } else if(/^[0-9]+$/.test(info.value)) vala = parseFloat(info.value);
  else vala = info.value
  
  let data = await table.fetch(req.query.id)
  let data2 = await table.push(req.query.id, vala)
  
  return res.status(200).send({
  status: 200,
  oldvalue: data,
  newvalue: data2
  })
    
  } else {
    
  let vala;
  if(info.value[0] === '{') vala = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  vala = []
  for(var item of info.value) if(item[0] === ' ') vala.push(item.slice(1)); else vala.push(item)
  } else if(/^[0-9]+$/.test(info.value)) vala = parseFloat(info.value);
  else vala = info.value
  
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

router.get('/quick_db/delete', async (req, res) => {
  
  try {
    
  let info = {
  table: req.headers['table'] || req.query.table,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }

if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered, for more help: http://${process.env.PROJECT_DOMAIN}.glitch.me/help/delete`})
  
  if(info.table && info.table.length > 0) {
  
  let table = new db.table(info.table.split(' ').join('_'))
    
  let data = await table.delete(info.id)
  
  if(data) return res.status(200).json({
  status: 200,
  id: info.id,
  message: 'The id data were successfully deleted'
  }); 
  else return res.status(401).json({
  status: 401,
  id: info.id,
  table: info.table,
  message: 'The entered id does not have any data'
  })
    
  }
  else {
  let data = await db.delete(req.query.id)
  
  if(data) return res.status(200).json({
  status: 200,
  id: info.id,
  message: 'The id data were successfully deleted'
  }); 
  else return res.status(401).json({
  status: 401,
  id: info.id,
  message: 'The entered id does not have any data'
  })
  }
    
  } catch(e) {
  return res.status(404).json({
  status: 404,
  error: e.message
  })
  }
  
})

module.exports = router;