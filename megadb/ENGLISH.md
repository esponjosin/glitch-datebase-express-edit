
**Endpoints**
All endpoints support json and array

All endpoints require 2 parameters / headers that are for data storage [db (default is db), sub (it is so that a subfolder is created within the first parameter and the data is stored)

The endpoints **(set, push, extract, add, subtract)** require 2 parameters or headers [id, value]
The endpoint **all** has 2 optional parameters or headers [sort, filter]
Endpoints **(get / fetch, delete)** require 1 parameter / header [id]

***set***
```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/megadb/set').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/megadb/set').set({
id: 'test',
value: 'test'
})

/*
/ Returns the new data
/*
```

***get/fetch***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/megadb/get').query({
id: 'test',
value: 'test'
})

//O

let { body } = await get('proyect-url/megadb/get').set({
id: 'test',
value: 'test'
})

/*
/ Returns the data of the id
/*
```

***extract***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/megadb/extract').query({
id: 'test',
value: 'test'
})

//O

let { body } = await get('proyect-url/megadb/extract').set({
id: 'test',
value: 'test'
})

/*
/ Returns the data of the id without the object to extract (only works in arrays)
/*
```

***Add***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/megadb/add').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/megadb/add').set({
id: 'test',
value: 'test'
})

/*
/ Returns the id, table, value to be add, old value and the new value
/*
```

***Subtract***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/megadb/subtract').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/megadb/subtract').set({
id: 'test',
value: 'test'
})

/*
/ Returns the id, table, value to be removed, old value and the new value
/*
```

***All***

```js
let { body } = await get('proyect-url/megadb/all')

/*
/ Returns an array with all the values, you can accommodate them by a value with sort by putting it in the query or in a header
/*
```

***Push***

```js
let { body } = await get('proyect-url/megadb/push').query({
id: 'test',
value: 1
})

/*
/ Returns the new data
/*
```

***Delete***

```js
let { body } = await get('proyect-url/megadb/delete').query({
id: 'test'
})

/*
/ Returns a message saying if the id data was deleted or if the id had no data
/*
```


Hecho por [Esponjosin](https://discord.gg/PY5PKfk)
-------------------

\ ゜o゜)ノ
