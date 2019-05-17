const express = require('express')
const router = express.Router()
let db = require('megadb')
const util = require('util')
const utils = require('../utils/util.js')

router.get('/megadb/set', async (req, res) => {
  
  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  if(!info.id) return res.status(402).json({
  status: 402,
  message: `No ID was entered`
  })
  
  if(!info.value) return res.status(402).json({
  status: 402,
  message: `No Value was entered`
  })
    
  let value;
  if(info.value[0] === '{') value = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  value = []
  for(var item of info.value) if(item[0] === ' ') value.push(item.slice(1)); else value.push(item)
  } else if(/^[0-9]+$/.test(info.value)) value = parseFloat(info.value);
  else value = info.value
    
  let data = await DB.establecer(info.id, value)
  
  if(info.db && info.sub) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  data: value
  });
  else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  data: value
  })

  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message
  })
  }
  
})

router.get('/megadb/delete', async(req, res) => {
  
  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  if(!info.id) return res.status(402).json({
  status: 402,
  message: `No ID was entered`
  })
  
  if(!info.value) return res.status(402).json({
  status: 402,
  message: `No Value was entered`
  })
    
  let value = await utils.JSON(info.value)
    
  let data = await DB.eliminar(info.id, value)
  
  if(info.db && info.sub) {
  if(data) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  message: 'The id data were successfully deleted'
  });
  else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  message: 'The entered id does not have any data'
  });
  }
  else {
  if(data) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  message: 'The id data were successfully deleted'
  });
  else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  message: 'The entered id does not have any data'
  });
  }

  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message
  })
  }
  
})

router.get('/megadb/all', async (req, res) => {
  
  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  sort: req.headers['sort'] || req.query.sort,
  filter: req.headers['filter'] || req.query.filter
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  let array = await DB.datos()
  
  let temp = []  
  let keys = Object.keys(array)
  
  for(var i in keys) temp.push({ID: keys[i], data: array[keys[i]]})
    
  array = temp;
  
  if(info.sort && info.sort.length > 0) {
  array = await array.filter(x => x.data[`${info.sort}`]);
  array = await array.sort((a, b) => b.data[`${info.sort}`] - a.data[`${info.sort}`]);
  }
    
  if(info.filter && info.filter.length > 0) {
  let c = await eval(`array.filter(${info.filter})`)
  array = c
  }
    
  if(info.db && info.sub) return res.status(200).json({
  status: 200,
  db: info.db,
  subfile: info.sub,
  data: array
  });
  else return res.status(200).json({
  status: 200,
  db: info.db,
  data: array
  })

  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message
  })
  }
  
})

router.get('/megadb/get', async (req, res) => {
  
  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  if(!info.id) return res.status(402).json({
  status: 402,
  message: `No ID was entered`
  })
    
  await DB.obtener(info.id).then(data => {
  if(info.db && info.sub) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  data: data
  }); else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  data: data
  })
  }).catch(e => {
  return res.status(404).json({
    status: 403,
    message: "The entered id does not contain any value"
    })
  })
    
  } catch(e) {
  console.log(e)
    return res.status(404).json({
    status: 404,
    error: e.message
    })
  }
    
})

router.get('/megadb/push', async(req, res) => {

  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  if(!info.id) return res.status(402).json({
  status: 402,
  message: `No ID was entered`
  })
    
  let value;
  if(info.value[0] === '{') value = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  value = []
  for(var item of info.value) if(item[0] === ' ') value.push(item.slice(1)); else value.push(item)
  } else if(/^[0-9]+$/.test(info.value)) value = parseFloat(info.value);
  else value = info.value
    
  await DB.push(info.id, value).then(data => {
  
  if(info.db && info.sub) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  data: data
  }); else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  data: data
  })
  
  }).catch(e => {
  return res.status(404).send({
  status: 404,
  error: e.mensaje
  })
  })
    
  } catch(e) {
  console.log(e)
  return res.status(404).send({
  status: 404,
  error: e.messsage
  })
  }
  
})

router.get('/megadb/extract', async(req, res) => {

  try {
  
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
  
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
    
  if(!info.id) return res.status(402).json({
  status: 402,
  message: `No ID was entered`
  })
    
  let value;
  if(info.value[0] === '{') value = await utils.JSON(info.value);
  else if(info.value[0] === '[') {
  info.value = info.value.split('[').join('')
  info.value = info.value.split(']').join('')
  info.value = info.value.split(`\"`).join('')
  info.value = info.value.split(',')
  value = []
  for(var item of info.value) if(item[0] === ' ') value.push(item.slice(1)); else value.push(item)
  } else if(/^[0-9]+$/.test(info.value)) value = parseFloat(info.value);
  else value = info.value
    
  await DB.extract(info.id, value).then(data => {
  
  if(info.db && info.sub) return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  subfile: info.sub,
  data: data
  }); else return res.status(200).json({
  status: 200,
  id: info.id,
  db: info.db,
  data: data
  })
  
  }).catch(e => {
  return res.status(404).send({
  status: 404,
  error: e.mensaje
  })
  })
    
  } catch(e) {
  console.log(e)
  return res.status(404).send({
  status: 404,
  error: e.messsage
  })
  }
  
})

router.get('/megadb/add', async (req, res) => {
 
  try {
    
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
  
  if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered`})
 
  if(!info.value) return res.status(404).send({status: 404,
  error: `No Value was entered`})
  
  let data;
  data = await DB.obtener(`${info.id}`).then(i => i).catch(async e => data = await DB.establecer(info.id, 0).then(i => i[info.id]))
  let data2 = await DB.sumar(`${info.id}`, parseInt(info.value))
  if(info.db && info.sub)
  return res.status(200).json({
  status: 200,
  id: req.query.id, 
  db: info.db,
  subfile: info.sub,
  toRemove: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  }); else return res.status(200).json({
  status: 200,
  id: req.query.id, 
  db: info.db,
  toRemove: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
  
  } catch(e) {
  console.log(e)
  return res.status(404).json({
  status: 404,
  error: e.message ? e.message : e.mensaje
  })
    
  }
    
})

router.get('/megadb/subtract', async (req, res) => {
    
  try {
    
  let info = {
  db: req.headers['db'] || req.query.db || 'db',
  sub: req.headers['sub'] || req.query.sub,
  id: req.headers['id'] || req.query.id,
  value: req.headers['value'] || req.query.value
  }
    
  let DB;
    
  if(info.db && info.db.length > 0 && !info.sub) DB = new db.crearDB(info.db.split(' ').join('_')); 
  else if(info.db && info.db.length > 0 && info.sub && info.sub.length > 0) DB = new db.crearDB(info.db.split(' ').join('_'), info.sub.split(' ').join('_'))
  
  if(!info.id) return res.status(404).send({status: 404,
  error: `No ID was entered`})
 
  if(!info.value) return res.status(404).send({status: 404,
  error: `No Value was entered`})
  let data;
  data = await DB.obtener(`${info.id}`).then(i => i).catch(async e => data = await DB.establecer(info.id, 0).then(i => i[info.id]))
  let data2 = await DB.restar(`${info.id}`, parseInt(info.value))
  if(info.db && info.sub)
  return res.status(200).json({
  status: 200,
  id: req.query.id, 
  db: info.db,
  subfile: info.sub,
  toAdd: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  }); else return res.status(200).json({
  status: 200,
  id: req.query.id, 
  db: info.db,
  toAdd: parseInt(info.value),
  oldvalue: /^[0-9]+$/.test(data) ? parseInt(data) : data,
  newvalue: parseInt(data2)
  })
  
  } catch(e) {
  
  return res.status(404).json({
  status: 404,
  error: e.message
  })
    
  }
    
})

module.exports = router;