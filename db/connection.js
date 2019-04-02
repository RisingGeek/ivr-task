const mongoose = require('mongoose');

/* Connect to database */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true}, () => {
    console.log('connected to database');
})