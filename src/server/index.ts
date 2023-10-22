import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { today, thisWeek, thisMonth, TimelinePost } from '../posts';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];

app.get('/posts', (_req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

app.post('/posts', (req, res) => {
    const post = {...req.body, id: ()}
  res.json();
});

app.listen(8000, () => {
  console.log('listening on port 8000');
});
