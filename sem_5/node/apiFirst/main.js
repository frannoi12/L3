const express = require('express');
const app = express()
const port = 3000;



app.get('/', (req, res) => {
    console.log(res);
    res.send('Hello World!')
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});