const mongoCollections = require('./../config/mongoCollections');
const { addReview } = require('./reviews');
let { ObjectId } =require('mongodb');
const books = mongoCollections.books;
const reviews = mongoCollections.reviews;

let exportedMethods = {
  async getAllBooks() {
    const bookCollection = await books();
    let bookList = await bookCollection.find({},{projection:{ _id: 1, title:1}}).toArray();
    bookList.forEach(element => {
      let newId=element._id.toString();
      element._id=newId;
  });
    return bookList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getBooksById(id) {
    if(!id)  throw `Id needs to be provided.`
    const bookCollection = await books();
   id=ObjectId(id);
   //console.log(id);
    const book = await bookCollection.findOne({ _id: id });
    book._id=book._id.toString();
    if (!book) throw 'Book not found';
    return book;
  },
  async addBooks(title, authorFirstName, authorLastName, genre, datePublished, summary) {
    if(!title) throw `You need to provide a title.`
    if(!authorFirstName) throw `You need to provide the first name of the author.`
    if(!authorLastName) throw `You need to provide the last name of the author.`
    if(!genre) throw `You need to provide the genre of the book.`
    if(!datePublished) throw `You need to provide the date of publishing.`
    if(!summary) throw `You need to provide a summary for the book.`

    if(typeof title!= 'string') throw `title needs to be a string`
    if(typeof authorFirstName!= 'string') throw `First name of the author needs to be a string`
    if(typeof authorLastName!= 'string') throw `Last name of the author needs to be a string`
    if(!Array.isArray(genre)) throw `Genre needs to be an array.`
    genre.forEach(element => {
      if(typeof element !='string') throw `Genre needs to be string.`
  });
    if(typeof datePublished!= 'string') throw `datepublished needs to be a string`
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(datePublished)) throw `datepublished is of the wrong format.`
    let checkDate=new Date(datePublished);
    if(!checkDate) throw `Date published is not valid`
    if(checkDate.getFullYear>2020) throw `date cannot be greater than current year.`
    if(typeof summary!= 'string') throw `genre needs to be a string`
    //if(!Array.isArray(reviews)) throw `Reviews needs to be an array.`
    
    const bookCollection = await books();

    let newBook = {
      title: title,
      author: {
          authorFirstName: authorFirstName,
          authorLastName: authorLastName
      },
      genre:genre,
      datePublished: datePublished,
      summary: summary,
      reviews: [],
     
      
    };

    const newInsertInformation = await bookCollection.insertOne(newBook);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getBooksById(newInsertInformation.insertedId);
  },
  

  async updateBooks(id, bookInfo) {
    if(!id) throw `id needs to be supplied.`
    if(!bookInfo) throw `updated info of the book needs to be supplied.`
    id=ObjectId(id);
    const book = await this.getBooksById(id);
    console.log(book);

    const bookUpdateInfo = {} ;
    const author={};
    if(bookInfo.title)
    {
      bookUpdateInfo.title= bookInfo.title;
    }
    if(bookInfo.author.authorFirstName)
    {
      author.authorFirstName= bookInfo.author.authorFirstName;
    }
    else
    {
      author.authorFirstName=book.author.authorFirstName;
    }
    if(bookInfo.author.authorLastName)
    {
      author.authorLastName= bookInfo.author.authorLastName;
    }
    else{
      author.authorLastName=book.author.authorLastName;
    }
    bookUpdateInfo.author=author;
    if(bookInfo.genre)
    {
      bookUpdateInfo.genre= bookInfo.genre;
    }
    if(bookInfo.datePublished)
    {
      bookUpdateInfo.datePublished= bookInfo.datePublished;
    }
    if(bookInfo.summary)
    {
      bookUpdateInfo.summary= bookInfo.summary;
    }
    bookUpdateInfo.reviews=book.reviews;
    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: id },
      { $set: bookUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBooksById(id);
  },

  async addReviewsToBook(bookId, reviewId) {
    if(!bookId) throw ` book id needs to be supplied.`
    if(!reviewId) throw `id of the review  needs to be supplied.`
    bookId= ObjectId(bookId);
    reviewId=ObjectId(reviewId);
    let currentBook = await this.getBooksById(bookId);
    console.log(currentBook);

    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
      { _id: bookId },
      { $addToSet: { reviews: [reviewId]} }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBooksById(bookId);
  },
  async removeBook(id) {
    if(!id) throw `id needs to be supplied.`
  
    const bookCollection = await books();
    id=ObjectId(id);
    const deletionInfo = await bookCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },
  async removeReviewAfterBookDeleted(bookId) {
    if(!bookId) throw `id needs to be supplied.`
   
    const reviewCollection = await reviews();
    bookId=ObjectId(bookId);
    //id=ObjectId(id);
    let deletedObj={};
    const deletionInfo = await reviewCollection.deleteMany({ bookBeingReviewed: bookId });
    if (deletionInfo.deletedCount === 0)
      throw `Could not delete post with id of ${bookId}`;
      else
      deletedObj={
        bookId: bookId.toString(),
        deleted: true
      }
      // const bookCollection = await books();
      //  await bookCollection.updateOne(
      //   { _id: bookId },
      //   { $pull: { reviews: [reviewId] } }
      // );
    return deletedObj;
  },
  async removeReviewsFromBook(bookId) {
    if(!bookId) throw `id needs to be supplied.`
    bookId= ObjectId(bookId);
    let currentBook = await this.getBooksById(bookId);
    console.log(currentBook);

    const bookCollection = await books();
    const bookInfo = await bookCollection.updateOne(
      { _id: bookId },
      { $pull: { reviews: [reviewId] } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBooksById(bookId);
  }

  
};

module.exports = exportedMethods;