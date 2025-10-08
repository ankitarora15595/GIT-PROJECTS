const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`URL Shortener backend running on port ${PORT}`);
});
