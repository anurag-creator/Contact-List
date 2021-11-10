//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection(to check if it is succesfull)
const db=mongoose.connection;

//if error
db.on('error',console.error.bind(console,'Error connecting to db'));

//up and running the print the massage
db.once('open',function(){
    console.log('Succesfull connected to database');
});
