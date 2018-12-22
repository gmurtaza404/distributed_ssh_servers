const express = require("express")

// Globals
database = {} 
const port = 3000
const app = express()


console.log("Starting the server...")




const main = () => {
    app.route('/servers')
        .get((req, res)=>{
            res.status(200).json({
                message: 'servers...'
            });
        })
        .put((req, res)=>{
            res.status(200).json({
                message: 'server added'
            });

        })
        .post((req, res)=>{   
            res.status(200).json({
                message: 'server added'
            });
        })
    


    app.listen(port, () => console.log("listening on port 3000!"))
}


main()







/*
    DB entry structure, 
    onion_link: string
    {    
        machine_name: string
        onion_key: string 
        curr_ip: string
        machine_location: string , (add or remove?)
        online: boolean
    }
*/
