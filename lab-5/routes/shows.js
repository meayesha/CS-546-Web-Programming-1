const express= require('express');
const router=express.Router();
const data=require('../data');
const showsData=data.shows;



router.get('/:id', async (req, res)=>{
    try{
        const showsId=await showsData.getShowsById(req.params.id);
        res.json(showsId);
    }catch(e){
        res.status(404).json({message:e});
    }
});

router.get('/', async (req, res)=>{
    try{
        const showsList=await showsData.getShows();
        res.json(showsList);
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;