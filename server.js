const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
// setup view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=> {
    res.render('main');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})