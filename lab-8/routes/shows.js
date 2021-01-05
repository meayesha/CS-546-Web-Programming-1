const express= require('express');
const router=express.Router();
const data=require('../data');
const showsData=data.shows;



router.get('/:id', async (req, res)=>{
    try{
        let checkShows={};
        const showsId=await showsData.getShowsById(req.params.id);
      // console.log(showsId);
       checkShows["title"]=showsId.name;
       checkShows["name"]=showsId.name;
       if(showsId.language === null)
       checkShows["language"]="";
       else
       checkShows["language"]=showsId.language;
       if(showsId.image === null || showsId.image.medium === null )
       checkShows["image"]="";
       else
       checkShows["images"]=showsId.image.medium;
       if(showsId.network === null || showsId.network.name===null  )
       checkShows["network"]="";
       else
       checkShows["network"]=showsId.network.name;
       if(showsId.summary === null)
       checkShows["summary"]="";
       else
       checkShows["summary"]=showsId.summary;
       checkShows.summary= checkShows.summary.replace(/<[^>]*>?/gm, '');
       //console.log(checkShows);
       
      res.render("showresults/shows", {"title": checkShows.title,"name": checkShows.name, "language":checkShows.language, "image":checkShows.images, "genres": showsId.genres, "rating" : checkShows.rating, "network":checkShows.network, "summary":checkShows.summary})
    }catch(e){
        res.status(404).render("showresults/error", { "error": { "status": 404, "message": "Sorry no shows found" } } );
    }
});

module.exports = router;