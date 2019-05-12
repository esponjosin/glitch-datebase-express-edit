Example Quick.db Edit With Express
=================

**Proyect**, This is a mini project for those users who have a bot with the db quick.db, this will help them if they want to make a dashboard or have a datebase server not linked to the bot project.

Find out more [Discord](https://discord.gg/PY5PKfk)


Your Project
------------

On the back-end,
- your app starts at `server.js`

Example:

***Set data***
```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/set').query({
id: 'test',
value: 'test'
})

/*
/ Return the new data
/*
```

***Get data***

```js
let { body } = await get('proyect-url/get').query({
id: 'test'
})

/*
/ Return the data of id
/*
```

***Add***

```js
let { body } = await get('proyect-url/add').query({
id: 'test',
value: 1
})

/*
/ Return the value toadd, old value and new value
/*
```

***Subtract***

```js
let { body } = await get('proyect-url/subtract').query({
id: 'test',
value: 1
})

/*
/ Return the value subtract, old value and new value
/*
```

***All Datas***

```js
let { body } = await get('proyect-url/all')

/*
/ Return array with all ids with the data
/*
```

***Push***

```js
let { body } = await get('proyect-url/push').query({
id: 'test',
value: 1
})

/*
/ Return old value and new value
/*
```

***Delete***

```js
let { body } = await get('proyect-url/delete').query({
id: 'test'
})

/*
/ Return any message for id deleted or is empy
/*
```


Made by [Esponjosin](https://discord.gg/PY5PKfk)
-------------------

\ ゜o゜)ノ
