const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const dbservices = require('./dbServices');
// const { createDbInstance } = require('./dbServices');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// college
app.get('/getAll',(req,res)=>{
    const db = dbservices.createDbInstance();
    const result = db.getAllData();
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
});


app.post('/insert',(req,res)=>{
    // console.log(req.body);
    const name= req.body.name;
    const addr= req.body.addr;
    const pin= req.body.pin;
    const branches= req.body.branches;
    const avgPack= req.body.avgPack;
    const rating= req.body.rating;
    const review= req.body.review;
    const db = dbservices.createDbInstance();
    const result = db.insertData(name,addr,pin,branches,avgPack,rating,review);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

});


// hostel
app.get('/getAllHostels',(req,res)=>{
    const db = dbservices.createDbInstance();
    const result = db.getAllHostelsData();
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
});
app.post('/insertHostelInfo',(req,res)=>{
    // console.log(req.body);
    const name= req.body.name;
    const addr= req.body.addr;
    const pin= req.body.pin;
    const facilities= req.body.facilities;
    const fees= req.body.fees;
    const rating= req.body.rating;
    const review= req.body.review;
    const db = dbservices.createDbInstance();
    const result = db.insertHostelData(name,addr,pin,facilities,fees,rating,review);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

});


// mess
app.get('/getAllMess',(req,res)=>{
    const db = dbservices.createDbInstance();
    const result = db.getAllMessData();
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
});
app.listen(process.env.port,()=> console.log('app is running'));

app.post('/insertMessInfo',(req,res)=>{
    // console.log(req.body);
    const name= req.body.name;
    const addr= req.body.addr;
    const pin= req.body.pin;
    const facilities= req.body.facilities;
    const fees= req.body.fees;
    const rating= req.body.rating;
    const review= req.body.review;
    const db = dbservices.createDbInstance();
    const result = db.insertMessData(name,addr,pin,facilities,fees,rating,review);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

});



// searching the id and for displaying temp hostel list
app.get('/search/:id' ,(req,res)=>{
    const {id} = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchHostelsById(id);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
    
})

// searching the id and for displaying temp mess list
app.get('/searchM_Id/:id' ,(req,res)=>{
    const {id} = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchMessById(id);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

})

// searching for college
app.get('/searchCollegeName/:name' ,(req,res)=>{
    const {name} = req.params;
    const db = dbservices.createDbInstance();
    const result = db.searchCollegeByName(name);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

})

app.post('/insertComment',(req,res)=>{
    // console.log(req.body);
    const name= req.body.name;
    const email= req.body.email;
    const comment= req.body.comment;
    
    const db = dbservices.createDbInstance();
    const result = db.insertCommentData(name,email,comment);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

});

app.post('/register',(req,res)=>{
    // console.log(req.body);
    const name= req.body.name;
    const pass= req.body.pass;
    // const confirmPass= req.body.confirmPass;
    
    const db = dbservices.createDbInstance();
    const result = db.registerUser(name,pass);
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

});

app.get('/searchUserName/:pass' ,(req,res)=>{
    // const name = req.params.name;
    const {pass} = req.params;
    const db = dbservices.createDbInstance();
    const result = db.verifyUser(pass);
    // console.log(result)
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));


})
