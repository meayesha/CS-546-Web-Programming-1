//const home = require("./main")
const searchResults = require("./searchResult")
const showsData = require("./shows")

const constructorMethod = app => { 

    app.get("/", (req,res) => {
        let title = "Show Finder"
        res.render("showresults/mainpage", { title } )

    })

    app.post("/search", searchResults)
    app.use("/shows", showsData)
    
    app.use("*",(req,res)=>{
        res.status(404).render("showresults/error", { "error": { "status": 404, "message": "Page Cannot Be Found" } } );
    })
}

module.exports = constructorMethod;