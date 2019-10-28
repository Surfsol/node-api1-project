// implement your API here
const express = require('express')

const server = express()

const db = require('./data/db')

//so express can read .json in request body
server.use(express.json())

server.get()


const port = 7000
server.listen(port, () => console.log(`\n** API on port ${port} **\n`))
