const firebase = require('../firebase.js');
const bodyParser = require('body-parser');





var urlencodedParser = bodyParser.urlencoded({ extended: false })

const controller = function (app) {

    /*GET REQUESTS*/
    let getPage = function(page){

        app.get('/' + page , function (req, res) {
            firebase.firestore.collection(page).get().then(snapshot => {
    
                let cardData = [];
                snapshot.docs.forEach(function (doc) {
                    let document = doc.data();
                    let id = doc.id;
                    var data = {
                        id: id,
                        document: document
                    }
                    cardData.push(data);
                });
    
                res.render(page, { cardData: cardData });
            });
    
            console.log(page + ' page rendered');
        });
    }


    app.get('/', function (req, res) {
        res.render('index');
        console.log('index page rendered');
    });
    app.get('/index', function (req, res) {
        res.render('index');
        console.log('index page rendered');
    });

    //RUN GET PAGE FUNCTION    
    getPage('cakes'); //Get the cakes page

    getPage('bread'); //Get the bread page

    getPage('croissants'); //Get the Croissants page  

    getPage('pizza'); //Get the Pizza Page


    /*POST REQUESTS */
    let Basket = [];

    app.post('/basket', urlencodedParser, function (req, res) {

        console.clear();
        res.send(req.body);
        //return items in basket to the global variable   
        Basket.push(req.body);
        console.log('basket items: ', Basket);
    });

}


module.exports = controller;