import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'started' });
});

app.listen(port, () => {
  console.log(`Millennium Falcon started on port ${port}`);
});
