// npm i
// npm i express;
// npm run server

// implement your API here
const express = require('express')

const server = express()

const dbModel = require('./data/db')

//so express can read .json in request body
server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello, server works')
})


// When the client makes a `POST` request to `/api/users`:

// - If the request body is missing the `name` or `bio` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

// - If the information about the _user_ is valid:

//   - save the new _user_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _user document_.

// - If there's an error while saving the _user_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the user to the database" }`.


server.post('/db/users', (req, res) => {
    const dbData = req.body
    console.log(dbData)

    if(!dbData.name || !dbData.bio){
        res.status(400).json({message: "Please provide name and bio for the user."})
    } else {
        //add to db
        dbModel
            .insert(dbData)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(500).json({error: "There was an error while saving the user to the database"})
            })

    }
})

// When the client makes a `GET` request to `/api/users`:

// - If there's an error in retrieving the _users_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The users information could not be retrieved." }`.
server.get('/db/users', (req, res) => {
    //localhost:7000/db/users
    dbModel
        .find()
        .then(users => {
            res.send(users)
        })
        .catch(error => {
            res.send({message:"The users information could not be retrieved."})
        })

})


// When the client makes a `GET` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in retrieving the _user_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user information could not be retrieved." }`.
server.get('/db/users', (req, res) => {
    //localhost:7000/db/users
    dbModel
        .find()
        .then(users => {
            res.send(users)
        })
        .catch(error => {
            res.send({message:"The users information could not be retrieved."})
        })

})

server.get('/db/users/:id', (req, res)=> {

    const id = req.params.id
  
    console.log(id)
    if(!id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {

    
        dbModel
            .findById(id)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => {
                res.status(500).json({ error: "The user information could not be retrieved." })
        })
    }
})


// When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in removing the _user_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user could not be removed" }`.

server.delete('/db/users/:id', (req, res) => {
    const id = req.params.id
    if(!id){
        res.status(404).json({message: "The user with the specified ID does not exist."})
    } else {

    dbModel
        .remove(id)
        .then(users => {
            res.status(200).json(users)
        })
        
        .catch(error => {
            res.status(500).json({error: "The user could not be removed"})
        })
    }
})

// When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If the request body is missing the `name` or `bio` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

// - If there's an error when updating the _user_:

//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user information could not be modified." }`.

// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _user document_.

server.put('/db/users/:id', (req, res) => {
    const id = req.params.id
    const user = req.body
    if(!id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        dbModel
            .update(id, user)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                error.status(500).json({ error: "The user information could not be modified." })
            })
    }
   

    
})

const port = 7000
server.listen(port, () => console.log(`\n** API on port ${port} **\n`))




    // if(!id){
    //     res.status(404).json({ message: "The user with the specified ID does not exist." })
    // } else if (!dbData.name || !dbData.bio) {
    //     res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    // } else {
    //     dbModel
    //         .update(id, dbData)
    //         .then(users => {
    //             res.status(200).json(users)
    //         })
    //         .catch(error => {
    //             error.status(500).json({ error: "The user information could not be modified." })
    //         })
    // }

    // dbModel.update(id, user)
    // .then(user => {
    // if (user) {
    //   res.status(200).json(user);
    // } else {
    //   res
    //     .status(500)
    //     .json({ error: "The user information could not be modified." });
    // }