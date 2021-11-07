const express= require('express');
const path=require('path')
const port=8000;

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
    return res.render('home',{
        title: "Contact List",
        contact_list: contactList
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
    contactList.push(req.body);
    console.log(req.body);
    return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){
    //console.log(req.query);
     let phone=req.query.phone;
     let contactIndex=contactList.findIndex(contact => contact.phone==phone);

     if(contactIndex!=-1){
         contactList.splice(contactIndex,1);
     }
     return res.redirect('back');
     
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