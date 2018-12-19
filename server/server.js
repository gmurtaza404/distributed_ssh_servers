const express = require("express")

// Globals
temp_db = {"abc": {"machine_identifier": 1234, "current_ip": "1.1.1.1"}}
const port = 3000
const app = express()


console.log("Starting the server...")




const main = () => {
    
    app.get('/', (req, res) => {
        console.log(req)
        res.send("Help message, API supports following operations\n1. /machine\n\n\n\n")
    })
    
    app.get('/all_machines', (req, res) => {
        res.send(temp_db)
    })
    app.get('/machine', (req, res) => {
        res.send(temp_db[req.query.machine_name])
    })
    app.put('/machine', (req, res) =>{
        // do something
    })



    app.listen(port, () => console.log("listening on port 3000!"))
}


main()







/*
    DB entry structure, 
        machine_identifier: hash
        curr_ip: string
*/
