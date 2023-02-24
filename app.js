const express = require('express');

const app = express();
const port = 3000;

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error) {
        console.log('Something went wrong.', error);
    }
    else {
        console.log(`Server running on port ${port}`);
    }
});
