const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const books = mongoCollections.books;
let { ObjectId } =require('mongodb');

let exportedMethods = {

  async getById(id) {
    const reviewCollection = await reviews();
    id=ObjectId(id);
    const review = await reviewCollection.findOne({ _id: id});
    review._id=review._id.toString();
    review.bookBeingReviewed=review.bookBeingReviewed.toString();
    if (!review) throw 'Review not found';
    return review;
  },
  async getReviewsByBookId(bookId) {
    if(!bookId) throw `id needs to be supplied.`;
    bookId=ObjectId(bookId);
    // const bookCollection = await books();
    // const book = await bookCollection.findOne({ _id: id });
    const reviewCollection = await reviews();
    const review = await reviewCollection.find({bookBeingReviewed: bookId }).toArray();
    review.forEach(element => {
      let newId=element._id.toString();
      element._id=newId;
    });
    return review;
  },
  async getReviewsById(bookId,id) {
    if(!bookId) throw `book id needs to be supplied.`
    if(!id) throw `review id needs to be supplied.`
    const reviewCollection = await reviews();
    bookId=ObjectId(bookId);
    id=ObjectId(id);
    const review = await reviewCollection.findOne({ _id: id, bookBeingReviewed:bookId});
    review._id=review._id.toString();
    review.bookBeingReviewed=review.bookBeingReviewed.toString();
    if (!review) throw 'Review not found';
    return review;
  },
  async addReview(title, reviewer , bookBeingReviewed, rating, dateOfReview, review) {
    const reviewCollection = await reviews();
    if(!title) throw `You need to provide a title.`
    if(!reviewer) throw `You need to provide the na,e of the reviewer.`
    if(!bookBeingReviewed) throw `You need to provide the id of the book being reviewed.`
    if(!rating) throw `You need to provide the rating of the book.`
    if(!dateOfReview) throw `You need to provide the date of publishing.`
    if(!review) throw `You need to provide a summary for the book.`

    if(typeof title!= 'string') throw `title needs to be a string`
    if(typeof reviewer!= 'string') throw `name of the reviewer needs to be a string`
    if(typeof rating!= 'number') throw `rating needs to be a number`
    if(typeof dateOfReview!= 'string') throw `datepublished needs to be a string`
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateOfReview)) throw `datepublished is of the wrong format.`
    let checkDate=new Date(dateOfReview);
    if(!checkDate) throw `Date published is not valid`
    if(checkDate.getFullYear>2020) throw `date cannot be greater than current year.`
    if(typeof review!= 'string') throw `review needs to be a string`
   
    

    let newReview = {
      title: title,
      reviewer: reviewer,
      bookBeingReviewed: bookBeingReviewed,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review,
       
    };

    const newInsertInformation = await reviewCollection.insertOne(newReview);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    const bookCollection = await books();
     await bookCollection.updateOne(
      { _id: bookBeingReviewed },
      { $addToSet: { reviews: newReview._id} }
    );
    return this.getById(newInsertInformation.insertedId);
  },
  async removeReview(bookId,id) {
    if(!bookId) throw `book id needs to be supplied.`
    if(!id) throw `id of the review needs to be supplied.`
    const reviewCollection = await reviews();
    bookId=ObjectId(bookId);
    id=ObjectId(id);
    let deletedObj={};
    const deletionInfo = await reviewCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
      throw `Could not delete post with id of ${id}`;
      else
      deletedObj={
        reviewId: id.toString(),
        deleted: true
      }
      const bookCollection = await books();
       await bookCollection.updateOne(
        { _id: bookId },
        { $pull: { reviews: id} }
      );
    return deletedObj;
  }
};

module.exports = exportedMethods;