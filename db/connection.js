const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true}, () => {
    console.log('connected to database');
})