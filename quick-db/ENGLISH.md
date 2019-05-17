
**Endpoints**

All endpoints support json, array

Endpoints **(set, add, subtract, push)** require 2 parameters / headers [id, value]
The endoints **get / fetch, delete)** require 1 parameter / header [id]

The endpoint **all** has 2 optional parameters [sort, filter]

***set***
```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/set').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/quick_db/set').set({
id: 'test',
value: 'test'
})

/*
/ Return the new data
/*
```

***get/fetch***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/get').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/quick_db/get').set({
id: 'test',
value: 'test'
})

/*
/ Return the data of id
/*
```

***Add***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/add').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/quick_db/add').set({
id: 'test',
value: 'test'
})

/*
/ Returns the id, table, value to add, old value and the new value
/*
```

***Subtract***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/subtract').query({
id: 'test',
value: 'test'
})

//Or

let { body } = await get('proyect-url/quick_db/subtract').set({
id: 'test',
value: 'test'
})

/*
/ Returns the id, table, value to remove, old value and the new value
/*
```

***All Datas***

```js
let { body } = await get('proyect-url/quick_db/all')

/*
/ Returns an array with all the values, you can accommodate them by a value with sort by putting it in the query or in a header
/*
```

***Push***

```js
let { body } = await get('proyect-url/quick_db/push').query({
id: 'test',
value: 1
})

/*
/ Return old value and new value
/*
```

***Delete***

```js
let { body } = await get('proyect-url/quick_db/delete').query({
id: 'test'
})

/*
/ Return any message for id deleted or is empy
/*
```


Made by [Esponjosin](https://discord.gg/PY5PKfk)
-------------------

\ ゜o゜)ノ
