const express= require('express');
const path=require('path')
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./schemas/contact');
const app=express();
 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList= [
    {
        name: "Anurag Singh",
        phone: "1111111111"

    },

    {
        name: "Abhay",
        phone: "22222222"
    },

    {
        name: "Tony",
        phone: "3276467897"
    }
]


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Feching Contacts from db');
            return;
        }
    return res.render('home',{
        title: "Contact List",
        contact_list: contacts
     });
  });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Lets play with ejs"
    });
});
app.post('/create-contact',function(req,res){
    /*contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });*/
    //contactList.push(req.body);
    //console.log(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating contact');
        return;}

        console.log('********',newContact);
        return res.redirect('back');
    });
    //return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){
    
     //get the id from quary in the url
     let id=req.query.id;
     
     //find contact in the databse using db
     Contact.findByIdAndDelete(id,function(err){
         if(err){
             console.log('Error in deleting from database');
             return;
         }
         return res.redirect('back');
     });
   
});
/*
app.post('/create-contact',function(req,res){
    contactList.push(req.body);
    return res.redirect('back');
})
*/
app.listen(port,function(err){
    if(err){
        console.log('error is runing the server'); 
    }
    console.log('Yup! My Express server is running on port :',port);
});