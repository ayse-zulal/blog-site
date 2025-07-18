const express= require('express');
const cors= require('cors');

const app= express();
const port= 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/images', require('./routes/images'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
