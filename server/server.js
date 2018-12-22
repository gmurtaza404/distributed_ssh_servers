const express = require("express")
const bodyParser = require("body-parser");
const util = require("util")
const fs = require("fs")
// Promises
readFile = util.promisify(fs.readFile)
writeFile = util.promisify(fs.writeFile)
appendFile = util.promisify(fs.appendFile)

// Globals
database = {} 
const app = express()
app.use(bodyParser.json({ extended: false }));


const port = 3000

console.log("Starting the server...")

const add_auth_to_tor_file = async (onion_link, key)=>{
    data = await readFile("/etc/tor/torrc", "utf-8")
    line_to_add = "HidServAuth " + onion_link + " " + key
    console.log(data)
    if (data.indexOf(line_to_add) == -1) {
        await appendFile("/etc/tor/torrc", line_to_add)
    }
}


const main = () => {
    app.route('/servers')
    .get((req, res)=>{
        res.status(200).json({server_list: database});
    })
    .put(async (req, res)=>{
        request_time = new Date().getTime()
        console.log(req.body.computer_name)
        try{
            database[req.body.computer_name] = {
                "onion_link": req.body.onion_link,
                "key": req.body.key,
                "local_ip": req.body.local_ip,
                "private_ip": req.body.private_ip,
                "online": true
            }
            await add_auth_to_tor_file(req.body.onion_link, req.body.key)
            res.status(200).json({"message": "Joined the network!"});

        }catch(err){
            console.log(err)
            res.status(400).json({"message": "Bad Request!"});
        }

    })
    .post((req, res)=>{    
        res.status(200).json({"message": "SUCCESS!"});
    })

    app.listen(port, () => console.log("listening on port 3000!"))

}
main()






/*
    DB entry structure, 
    
    onion_link: string
    {    
        machine_name: string
        onion_link: string 
        key: string
        local_ip: string
        public_ip: string
        online: boolean
    }

*/
