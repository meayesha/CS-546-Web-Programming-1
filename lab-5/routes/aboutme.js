const express = require('express');
const router = express.Router();
const data = require('../data');
const aboutmeData = data.aboutme;

router.get('/', async (req, res) => {
    try {
      const meDetails = await aboutmeData.getDetailsAboutMe();
      res.json(meDetails);
    } catch (e) {
      res.status(500).send();
    }
  });

  module.exports = router;