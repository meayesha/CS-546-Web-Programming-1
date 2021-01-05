const express = require("express");
const router  = express.Router();
const axios =  require("axios");
const data = require('../data');
const showsData = data.shows;
router.post("/search", async (req, res) => {
    try {
       let showInfo=req.body;
        let title = "Shows Found";
        var result = [];
        var counter = 0;
        if(!showInfo.searchTerm || showInfo.searchTerm==" ")
            res.status(400).render("showresults/error", { error: { "message": "You need to enter a search Term to get show details. " } } ) ;
        if(typeof showInfo.searchTerm != 'string')
            res.status(400).render("showresults/error", { error: { "message": "You need to enter a string as a search Term " } } ) ;

            const showsSearch = await showsData.getShowsBySearchItem(showInfo.searchTerm);
            //console.log(showsSearch[0]);
            for(let i=0;i<showsSearch.length;i++)
            {
                result.push(showsSearch[i]);
                counter++;
                if(counter == 20)
                break;
            
            }
            //console.log(result);
            res.render("showresults/search",{"searchTerm":showInfo.searchTerm, "title":title, "showsResult": result});
    } catch (err) {
        res.status(400).render("showresults/error", { error: { "message": "Show not found" } } )
    }
});

module.exports = router