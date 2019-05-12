Example Quick.db Edit With Express
=================

**Proyect**, This is a mini project for those users who have a bot with the db quick.db, this will help them if they want to make a dashboard or have a datebase server not linked to the bot project.

Find out more [Discord](https://discord.gg/PY5PKfk)


Your Project
------------

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)

Example:

***Set data***
```js
const { get } = require('node-superfetch')

let { body } = await get('proyect-url/set').query({
id: 'test',
value: 'test'
})

/*
/ Return the data
/*
```

***Get data***

```js
let { body } = await get('proyect-url/get').query({
id: 'test'
})
```

***Add***

```js
let { body } = await get('proyect-url/add').query({
id: 'test',
value: 1
})
```

***Remove***

```js
let { body } = await get('proyect-url/subtract').query({
id: 'test',
value: 1
})
```

***All Dates***

```js
let { body } = await get('proyect-url/all')
```

***Push***

```js
let { body } = await get('proyect-url/push').query({
id: 'test',
value: 1
})
```

***Delete***

```js
let { body } = await get('proyect-url/delete').query({
id: 'test'
})
```

***Add***

```js
let { body } = await get('proyect-url/add').query({
id: 'test',
value: 1
})
```


Made by [Esponjosin](https://discord.gg/PY5PKfk)
-------------------

\ ゜o゜)ノ
