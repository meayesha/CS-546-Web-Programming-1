const movies=require("./data/movies");

let { ObjectId } =require('mongodb');

const connection =require("./config/mongoConnection");

async function main(){
   // Creating the first movie and logging the newly created movie
    
    // try{
    // let billAndTed = await movies.create("Bill and Ted Face the Music",
    // "Once told they'd save the universe during a time-traveling adventure,2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.",
    // "PG-13", 
    // "1hr 31min",
    // "Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
    // console.log("------Movie one has been added.-------");
    // let newId=(ObjectId(billAndTed._id)).toString();
    // billAndTed._id=newId;
    // console.log("------Logging the newly created movie.-------");
    // console.log(billAndTed);
    // }catch(e)
    // {
    //     console.log(e);
    // }
    // //Creating a second movie.
    // try{
    // let darkKnight = await movies.create("The Dark Knight",
    // "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 
    // "R",
    // "2hr 34min",
    // "Action",["Christian Bale","Heath Ledger"],{director: "Christopher Nolan", yearReleased: 2008});
    // console.log("-----Movie two has been added.------");
    // }catch(e)
    // {
    //     console.log(e);
    // }
    // //Logging all the movies created till now
    // console.log("-----Logging all the movies created.-------");
    // try{
    // let getAllResults= await movies.getAll();
    // getAllResults.forEach(element => {
    //     let newId=element._id.toString();
    //     element._id=newId;
    // });
    // console.log(getAllResults);
    // }catch(e){
    //     console.log(e);
    // }
    // //Creating a third movie
    // try{
    //     let hiddenFigures = await movies.create("Hidden Figures",
    //     "The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.",
    //     "PG", 
    //     "2hr 7min",
    //     "Drama",["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],{director: "Theodore Melfi", yearReleased: 2016});
    //     console.log("Movie three has been added.");
    //     let newId=(ObjectId(hiddenFigures._id)).toString();
    //     hiddenFigures._id=newId;
    //     console.log("-----Logging the newly created third movie.-----");
    //     console.log(hiddenFigures);
    //     }catch(e)
    //     {
    //         console.log(e);
    //     }
    
    //Renaming the name of the first movie and logging the movie
    console.log("-----Renaming the first movie created.------");
        try{
    let renameMovie=await movies.rename("5f846d02407e8bb37fcb928f", "   Say Hello World and Face the Music    ")
    let newId=(ObjectId(renameMovie._id)).toString();
    renameMovie._id=newId;
    console.log(renameMovie);
        }catch(e){
            console.log(e)
        }
    
    //Removing the second movie created
    console.log("------Removing the secong movie created.-------");
    try{
    let removeMovie=await movies.remove("5f846d02407e8bb37fcb9290");
    console.log(removeMovie);
    }catch(e)
    {
        console.log(e);
    }
     //Logging all the movies again
    console.log("----Logging all the movies after removing the second movie.-----");
     try{
        let getAllResults= await movies.getAll();
        getAllResults.forEach(element => {
            let newId=element._id.toString();
            element._id=newId;
        });
        console.log(getAllResults);
        }catch(e){
            console.log(e);
        }
        //Trying to create a movie with bad paramaeters 
    console.log("-----Trying to create a movie with bad paramaeters-------");
        try{
            let badMovie = await movies.create("hello",
            "The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.", 
            "PG-13",
            "2hr 31min",12345,
            ["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],{director: "Theodore Melfi", yearReleased: 2016});
            console.log("Movie three has been added.");
            let newId=(ObjectId(badMovie._id)).toString();
            badMovie._id=newId;
            console.log(badMovie);
            }catch(e)
            {
                console.log(e);
            }
        //Trying to remove a movie that does not exist 
    console.log("-----Trying to remove a movie that does not exist-------");
        try{
            let removeMovie=await movies.remove("5f76eb280cb85124c2f20241");
            console.log(removeMovie);
            }catch(e)
            {
                console.log(e);
            }
         //Trying to rename a movie that does not exist 
    console.log("-----Trying to rename a movie that does not exist------");
         try{
            let renameMovie=await movies.rename("5f76eb280cb85124c2f20241","This is a new movie");
            console.log(renameMovie);
            }catch(e)
            {
                console.log(e);
            }
        //Trying to rename a movie by passing invalid data for parameters 
    console.log("-----Trying to rename a movie with invalid data for paramaeters-------");
        try{
            let renameMovie=await movies.rename("microsoft1234","hello how are you");
            console.log(renameMovie);
            }catch(e)
            {   
                console.log(e.message);
            }
        //Trying to get a movie by ID that does not exist 
    console.log("-----Trying to get a movie by ID that does no exist-------");
        try{
            let getMovieID=await movies.get("5f76eb280cb85124c2f20241");
            console.log(renameMovie);
            }catch(e)
            {
                console.log(e);
            }
        const db=await connection();
    await db.serverConfig.close();
    console.log("Finished");
 };

main().catch((error) => {
    console.log(error);
});