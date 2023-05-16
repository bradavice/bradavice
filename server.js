const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const dataFilePath = './data/posts.json';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to retrieve all posts
app.get('/posts', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const posts = JSON.parse(data);
    return res.json(posts);
  });
});

// POST endpoint to add a new post
app.post('/posts', (req, res) => {
  const { title, content, video, photo } = req.body;

  const newPost = {
    title,
    content,
    video: video || '',
    photo: photo || ''
  };

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const posts = JSON.parse(data);
    posts.push(newPost);

    fs.writeFile(dataFilePath, JSON.stringify(posts), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.sendStatus(200);
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
