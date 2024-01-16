const {getTopics, getEndpoints} = require("./controllers/topics.controllers")
const express = require("express")
const app = express()
app.use(express.json())



app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

module.exports = app

// const port = 8080;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
