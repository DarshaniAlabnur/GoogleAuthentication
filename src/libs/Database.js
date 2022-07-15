const mongoose = require('mongoose');
// const { MONGO_URI } = process.env;

mongoose.connect("mongodb://localhost:27017/UserDetails", {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.export = conn;
