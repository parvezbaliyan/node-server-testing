const express = require('express');
const hbs = require('hbs');//this is used for renderenig different page based upon the different conditions
const fs=require('fs');
const port=process.env.port||3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));//this is used for setting up static server

app.use((req,res,next)=>{//if we call next() then our handler works fine otherwise not
var now=new Date().toString();
console.log(now);
console.log(req.method)
var log=req.method;
try{
    fs.appendFile('hlo.txt',log,(err)=>
{
    console.log('hhhhhhhhhh')
})
}
catch(err){
    console.log(err)
}

next()
})
// app.get('/',(req,res)=>{
// // res.send('hello express')

// //return json from the method
// res.send({
//     name:'parvez',
//     likes:[
//         'bike',
//         'race'
//     ]
// })
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});//used for passing commmon data to the of the various file that need to render such as the copyright info or the data

hbs.registerHelper('Abc',(text) => {
    debugger;
    return text.toUpperCase();

});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my first static website',
        currentYear: new Date().getFullYear()
    })

})
app.get('/about', (req, res) => {
    //res.send("hi parvez how r u")
    res.render('about.hbs', {
        pageTitle: 'myPagessss',
        currentYear: new Date().getFullYear()
    })
})

app.get('/baddata', (req, res) => {
    res.send({
        name: 'parvez',
        errorMessage: "ohh no"
    })
})

app.listen(port, () => {
    console.log("Server run on"+port)
});