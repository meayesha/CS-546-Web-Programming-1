const express = require('express');
const router = express.Router();
const data = require('../data');
const booksData = data.books;

router.get('/:id', async (req, res) => {
  try {
    let book = await booksData.getBooksById(req.params.id);
    res.status(200).json(book);
  } catch (e) {
    res.status(404).json({ error: 'User not found' });
  }
});

router.get('/', async (req, res) => {
  try {
    let booksList = await booksData.getAllBooks();
    res.json(booksList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  let bookInfo = req.body;

  if (!bookInfo) {
    res.status(400).json({ error: 'You must provide data to create a book data' });
    return;
  }

  if (!bookInfo.title) {
    res.status(400).json({ error: 'You must provide a title for the book.' });
    return;
  }

  if (!bookInfo.author.authorFirstName) {
    res.status(400).json({ error: 'You must provide the first name of the author.' });
    return;
  }
  if (!bookInfo.author.authorLastName) {
    res.status(400).json({ error: 'You must provide the last name of the author.' });
    return;
  }
if (!bookInfo.genre) {
        res.status(400).json({ error: 'You must provide the genre of the book.' });
        return;
  }
  if (!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide the date on which the book was published.' });
    return;
}

if (!bookInfo.summary) {
    res.status(400).json({ error: 'You must provide a summary of the book.' });
    return;
}
  try {
    const newBook = await booksData.addBooks(
      bookInfo.title,
      bookInfo.author.authorFirstName,
      bookInfo.author.authorLastName,
      bookInfo.genre,
      bookInfo.datePublished,
      bookInfo.summary,
      bookInfo.reviews
    );
    // newBook.reviews=[];
    res.status(200).json(newBook);
  
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  let bookInfo = req.body;

  if (!bookInfo) {
    res.status(400).json({ error: 'You must provide data to update a book' });
    return;
  }

  if (!bookInfo.title) {
    res.status(400).json({ error: 'You must provide a title for the book' });
    return;
  }

  if (!bookInfo.author.authorFirstName) {
    res.status(400).json({ error: 'You must provide a first name for the author' });
    return;
  }

  if (!bookInfo.author.authorLastName) {
    res.status(400).json({ error: 'You must provide a last name for the author' });
    return;
  }
  if (!bookInfo.genre) {
    res.status(400).json({ error: 'You must provide the genre for the book.' });
    return;
  }
  if (!bookInfo.datePublished) {
    res.status(400).json({ error: 'You must provide the date when the book when was published.' });
    return;
  }

  if (!bookInfo.summary) {
    res.status(400).json({ error: 'You must provide the summary for the book.' });
    return;
  }

  try {
    await booksData.getBooksById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  try {
    const updatedBook = await booksData.updateBooks(req.params.id, bookInfo);
    res.json(updatedBook);
  } catch (e) {
    res.sendStatus(500).json({error:e});
  }
});

router.patch('/:id', async (req, res) => {
    const requestBody = req.body;
    let updatedObject = {};
    let author={};
    try {
      const oldBook = await booksData.getBooksById(req.params.id);
      let count=0;
        updatedObject.title = requestBody.title;
      if (requestBody.author.authorFirstName && requestBody.author.authorFirstName !== oldBook.author.authorFirstName)
      {author.authorFirstName = requestBody.author.authorFirstName;
        count=count+1;
      }
        if (requestBody.author.authorLastName && requestBody.author.authorLastName !== oldBook.author.authorLastName)
         {
           author.authorLastName = requestBody.author.authorLastName;
           count=count+1;
         }
         updatedObject.author=author;
      if (requestBody.genre && requestBody.genre !== oldBook.genre)
        {
          updatedObject.genre = requestBody.genre;
          count=count+1;
        }
      if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished)
        {
          updatedObject.datePublished = requestBody.datePublished;
          count=count+1;
        }
        if (requestBody.summary && requestBody.summary !== oldBook.summary)
        {
          updatedObject.summary = requestBody.summary;
          count=count+1;
        }
        if(count===0) throw `Atleast one field must be updated.`
    } catch (e) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    if (Object.keys(updatedObject).length !== 0) {
      try {
        const updatedBook = await booksData.updateBooks(
          req.params.id,
          updatedObject
        );
        res.json(updatedBook);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    } else {
      res
        .status(400)
        .json({
          error:
            'No fields have been changed from their inital values, so no update has occurred'
        });
    }
  });

router.delete('/:id', async (req, res) => {
  if (!req.params.id) throw 'You must specify an ID to delete';
  try {
    await booksData.getBooksById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  try {
    const flag=await booksData.removeBook(req.params.id);
    let deletedData={};
    if(flag)
    deletedData=await booksData.removeReviewAfterBookDeleted(req.params.id);
    
    res.json(deletedData);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;