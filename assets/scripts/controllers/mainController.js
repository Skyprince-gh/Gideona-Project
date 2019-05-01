const firebase = require('../firebase.js');
const bodyParser = require('body-parser');
const basket = require('./basket.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const controller = function(app){

    /*GET REQUESTS*/

app.get('/', function(req, res){
    res.render('index');
    console.log('index page rendered');
});
app.get('/index', function(req, res){
    res.render('index');
    console.log('index page rendered');
});
app.get('/cakes', function(req, res){
    firebase.firestore.collection('cakes').get().then(snapshot=>{
        
        let cardData = [];
        snapshot.docs.forEach(function(doc){ 
            let document = doc.data(); 
            let id = doc.id;
            var data = {
                id: id,
                document: document 
            }
            cardData.push(data);
        });
        
        console.log('card data: \n',cardData);
        res.render('cakes', {cardData: cardData});
    });
    
    console.log('cakes page rendered');
});



    /*POST REQUESTS */
app.post('/basket', urlencodedParser, function(req, res){
   basket(req.body); 
});

}


module.exports = controller;