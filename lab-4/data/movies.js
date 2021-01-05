const mongoCollections=require("./../config/mongoCollections");
const movies=mongoCollections.movies;

let { ObjectId } =require('mongodb');
module.exports={
    async get(id)
    {
        if(!id) throw `You must supply an ID`;
       // if(!ObjectId.isValid(id)) throw `Not a valid ID.`
        const movieCollection=await movies();
        id=ObjectId(id);
        const movieId = await movieCollection.findOne({_id: id})
        if(!movieId) throw `No movie found with that ID.`;

        return movieId;
    },
    async create(title, plot, rating,runtime,genre,cast,info){
        let rate=["PG","G","PG-13","R"];
        let timePattern=/[0-9]{1,2}hr [0-9]{1,2}min/;
        let genrepattern=["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War" ,"Western"];
        if(!title) throw `Title must be supplied.`
        if(typeof title != 'string') throw `Title should be of type string.`
        if(!title.replace(/\s/g, '').length) throw `Title only contains whitespaces.`
        if(!plot) throw `Plot is missing.`
        if(typeof plot != 'string') throw `Plot should be of type string.`
        if(!plot.replace(/\s/g, '').length) throw `Plot only contains whitespaces.`
        if(!rating)  throw `Rating is missing.`
        if(typeof rating != 'string') throw `Rating should be of type string.`
        let count=0;
        for(let i=0;i<rate.length;i++)
        {
            if(rating == rate[i])
            count++;
        }
        if(count==0) throw `Rating is missing.`
        
        if(!rating.replace(/\s/g, '').length) throw `Rating only contains whitespace.`
        if(!runtime) throw `Runtime is missing.`
        if(typeof runtime != 'string')  throw `Runtime should be of type of string and should not be empty.`
        let runtimeMatch=runtime.match(timePattern);
        if(!runtimeMatch) throw `Runtime is missing.`
        if(!runtime.replace(/\s/g, '').length) throw `Runtime contains only whitespaces.`
        if(!genre) throw `Genre is missing.`
        if(typeof genre != 'string') throw `Genre should of type string.`
        count=0;
        for(let i=0;i<genrepattern.length;i++)
        {
            if(genre == genrepattern[i])
            count++;
        }
        if(count==0) throw `Genre is missing.`
        
        if(!genre.replace(/\s/g, '').length) throw `Genre only contains whitespaces.`
        
        if(!cast || !Array.isArray(cast)) throw `Cast must be supplied and should be an array.`
        if( cast.length===0) throw `Cast should have atleast one element.`
        cast.forEach(element => {
            if(typeof element !='string' || !element.replace(/\s/g, '').length)throw `Cast should contain string and should not be empty .`
            element.trim();
        });
        if(typeof info !='object') throw `Input info ${info} is of the wrong type.`
        if(!info.director) throw `Director is missing`
        if(typeof info.director !='string') throw `Director is of the wrong type`
        if(!info.yearReleased) throw `YearReleased is missing.`
        if(typeof info.yearReleased !='number') throw `YearReleased is of the wrong type`
        if(info.yearReleased <1930 || info.yearReleased>2025) throw `Year cannot be less than 1930 or more than 2025.`
        // let x=info.yearReleased.match(/[0-9]{4}/);
        // if(!x) throw `Year released is wrong.`

        const movieCollection= await movies ();
        
        const movie={
            title: title.trim(),
            plot: plot.trim(),
            rating: rating.trim(),
            runtime: runtime.trim(),
            genre: genre.trim(),
            cast : cast,
            info: info
        }
        
        const insertMovie= await movieCollection.insertOne(movie);
        if(insertMovie.insertedCount === 0) throw `Could not add movie.`;

        const newId=insertMovie.insertedId;
        const movieGet=await this.get(newId);
        
        return movieGet;
    },

    async getAll()
    {
        
        const movieCollection= await movies ();
        const movieList=await movieCollection.find({}).toArray();
        return movieList;
    },

    async remove(id){
        if(!id) throw `You must supply an id.`
        //if(!ObjectId(id)) throw `Not an Object Id.`
        id=ObjectId(id);
        const movieCollection= await movies();
        let titleId=await this.get(id);
        let titleInfo=titleId.title;
        const deleteMovieInfo= await movieCollection.deleteOne({_id: id});
        if(deleteMovieInfo.deletedCount ===0) throw `Could not delete movie.`;
        return (titleInfo + " has been successfully deleted.");
    },

    async rename(id, newTitle){
        if(!id) throw `You must supply an id.`
        //if(!ObjectId.isValid(id)) throw `Not a valid ID.`
        if(typeof id != 'string' || id.trim().length == 0) throw `Id should be a string and it should not be empty.`;
        if(!newTitle) throw `You must supply a newTitle.`
        if(typeof newTitle != 'string' || newTitle.trim().length == 0) throw `the newTitle should be a string and it should not be empty.`;
        if(!newTitle.replace(/\s/g, '').length) throw `NewTitle only contains whitespaces.`
        const movieCollection= await movies();
       
        id=ObjectId(id);
        const updatedInfo= await movieCollection.updateOne({_id: id},{$set:{title: newTitle.trim()}});

        if(updatedInfo.modifiedCount === 0) throw `No movie found with that ID.`;

        return await this.get(id);
    }
    

};
