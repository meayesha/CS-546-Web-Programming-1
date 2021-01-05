const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const booksData = data.books;
let { ObjectId } =require('mongodb');
router.get('/:id', async (req, res) => {
  try {
    const reviewList = await reviewData.getReviewsByBookId(req.params.id);
    res.json(reviewList);
  } catch (e) {
    res.status(404).json({ error: 'Reviews not found' });
  }
});



router.get('/:bookId/:id', async (req, res) => {
  try {
    const bookReview = await reviewData.getReviewsById(req.params.bookId,req.params.id);
    res.json(bookReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/:id', async (req, res) => {
  try {
    await booksData.getBooksById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  const reviewPostData = req.body;
  if (!reviewPostData.title) {
    res.status(400).json({ error: 'You must provide a title for the review' });
    return;
  }
  if (!reviewPostData.reviewer) {
    res.status(400).json({ error: 'You must provide name for the reviewer' });
    return;
  }
  if (!reviewPostData.bookBeingReviewed) {
    res.status(400).json({ error: 'You must provide an Id for the for the book being reviewed.' });
    return;
  }
  if (!reviewPostData.rating) {
    res.status(400).json({ error: 'You must provide for the book.' });
    return;
  }
  if (!reviewPostData.dateOfReview) {
    res.status(400).json({ error: 'You must provide an date for the book review.' });
    return;
  }
  if (!reviewPostData.review) {
    res.status(400).json({ error: 'You must provide an review for the book.' });
    return;
  }
  // try {
  //   const { title, reviewer, bookBeingReviewed, rating,dateOfReview,review } = blogPostData;
  //   const newReview = await reviewData.addReview(title, reviewer, bookBeingReviewed, rating, dateOfReview,review);
  reviewPostData.bookBeingReviewed=ObjectId(reviewPostData.bookBeingReviewed);
  try {
    const newReview = await reviewData.addReview(
      reviewPostData.title,
      reviewPostData.reviewer,
      reviewPostData.bookBeingReviewed,
      reviewPostData.rating,
      reviewPostData.dateOfReview,
      reviewPostData.review
    );
    res.json(newReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:bookId/:id', async (req, res) => {
  if (!req.params.bookId || !req.params.id) {
    res.status(400).json({ error: 'You must Supply a bookID and a reviewID to delete' });
    return;
  }
  try {
    await reviewData.getReviewsById( req.params.bookId,req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  try {
    const reviewResult=await reviewData.removeReview(req.params.bookId,req.params.id);
    res.status(200).json(reviewResult);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
