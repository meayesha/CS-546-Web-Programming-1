const dbConnection = require('../config/mongoConnection');
const mongoCollections=require("./../config/mongoCollections");
//const { reviews } = require('../data/');
const data = require('../data/');
const books = data.books;
const reviewsData= data.reviews;
const bookData=mongoCollections.books;
let { ObjectId } =require('mongodb');

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const book1 = await books.addBooks("The Shining UPDATED","Patrick","Hill",["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],"01/28/1977","Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",[]);
  let bookid = ObjectId(book1._id);
  const review1=await reviewsData.addReview("This book scared me to death!!","scaredycat",bookid,5,"07/10/2020","This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!");
  const review2=await reviewsData.addReview("All time favourite!!","BookNerd",bookid,8,"08/24/2020","This book was really good and well articulated!!! It had me at the edge of my seat.  One of Stephan King's best work!");
  const review3=await reviewsData.addReview("An enthralling book!!","helloKitty",bookid,7.5,"08/14/2020","This book was was really fascinating !!! It had me at the edge of my seat and absorbed the whole time.  One of the best books I have read so far....!");
  
  const book1Data=await bookData();
await book1Data.updateOne({_id: bookid},{$set:{reviews: [review1._id,review2._id,review3._id]}});

const book2 = await books.addBooks("To Kill A Mocking Bird","Harper","Lee",["Novel","Southern Gothic", "Bildungsroman"],"07/11/1960","To Kill a Mockingbird by Harper Lee centres on Atticus Finch's attempts to prove the innocence of Tom Robinson, a black man who has been wrongly accused of raping a white woman in 1930s Alabama.",[]);
bookid = ObjectId(book2._id);
  const review1book2=await reviewsData.addReview("Well articulated book","Matt Berman",bookid,9.3,"05/24/2010","One of Harper Lee best works.. This richly textured novel, woven from the strands of small-town life, lets readers walk in the shoes of one fully realized character after another. A must read!!! ");
  const review2book2=await reviewsData.addReview("All time favourite!!","Bookworm",bookid,8.98,"06/17/2015","Novelist Lee's prose has an edge that cuts through cant, and she teaches the reader an astonishing number of useful truths about little girls and about Southern life");
  const book2Data=await bookData();
await book2Data.updateOne({_id: bookid},{$set:{reviews: [review1book2._id,review2book2._id]}});

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();