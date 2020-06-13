Backend for MERN stack todo app.

client: https://github.com/clairefro/mern-todo-app

## Setup

### General
`npm install`

`nodemon server`

### DB Setup
Get mongodb
`brew install mongodb`

Create a data folder for mongodb to use
`sudo mkdir -p /data/db`

Start mongo with
`mongod`

in other terminal tab, create 'todos' db in mongo
```
mongo
use todos
```

server should show success message once db is connected.

Serves from PORT 4000




( for my future reference: npm install express body-parser cors mongoose nodemon )
