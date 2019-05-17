
**Endpoints**
Todos los endpoints soportan json, array

Los endpoints **(set, add, subtract, push)** requieren de 2 parametros/headers [id, value]
Los endoints **(get/fetch, delete)** requiren de 1 parametro/header [id]

El endpoint **all** tiene 2 parametros opcionales [sort, filter]

***set***
```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/set').query({
id: 'test',
value: 'test'
})

//O

let { body } = await get('proyect-url/quick_db/set').set({
id: 'test',
value: 'test'
})

/*
/ Devuelve los nuevos datos
/*
```

***get/fetch***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/get').query({
id: 'test',
value: 'test'
})

//O

let { body } = await get('proyect-url/quick_db/get').set({
id: 'test',
value: 'test'
})

/*
/ Devuelve los datos de la id
/*
```

***Add***

```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/quick_db/add').query({
id: 'test',
value: 'test'
})

//O

let { body } = await get('proyect-url/quick_db/add').set({
id: 'test',
value: 'test'
})

/*
/ Devuelve la id, table, valor a agregar, antiguo valor y el nuevo valor
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
/ Devuelve la id, table, valor a remover, antiguo valor y el nuevo valor
/*
```

***All***

```js
let { body } = await get('proyect-url/quick_db/all')

/*
/ Devuelve un array con todos los valores, puedes acomodarlos por un valor con sort poniendolo en el query o en un header
/*
```

***Push***

```js
let { body } = await get('proyect-url/quick_db/push').query({
id: 'test',
value: 1
})

/*
/ Devuelve los antiguos datos y los nuevos
/*
```

***Delete***

```js
let { body } = await get('proyect-url/quick_db/delete').query({
id: 'test'
})

/*
/ Devuelve un mensaje diciendo si los datos de la id fueron elimiandos o si la id no tenia datos
/*
```


Hecho por [Esponjosin](https://discord.gg/PY5PKfk)
-------------------

\ ゜o゜)ノ
