import express from 'express';
import index from './views/pages/index';
import instagram from 'instagram-node';
// create an express app
var app = express();
var ig = instagram.instagram();
// Have to have this for the page to render!
// otherwise will get error of
// "Error: No default engine was specified and no extension was provided"
app.set('view engine', 'ejs');
// config the app
// tell node where to look for resources
app.use(express.static(__dirname + 'public'));
// configure instagram app with client-id

// create an express route for the home page
app.get('/', function(req, res) {
    // use the instagram package to get our profile's media
    // render the home page and pass in the our profile's images
    res.render('pages/index');
});

// start the server on port 8080
// =================================
app.listen(8080);

console.log('App started! http://localhost:8080');
