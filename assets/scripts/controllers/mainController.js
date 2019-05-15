const firebase = require('../firebase.js');
const bodyParser = require('body-parser');






var urlencodedParser = bodyParser.urlencoded({ extended: false })

const controller = function (app) {
    let Basket = [];

    /*GET REQUESTS*/
    let getPage = function (page, basket) {

        app.get('/' + page, function (req, res) {
            firebase.firestore.collection(page).get().then(snapshot => {

                let cardData = [];
                snapshot.docs.forEach(function (doc) {
                    let document = doc.data();
                    let id = doc.id;
                    var data = {
                        id: id,
                        document: document,
                        basket: basket
                    }
                    cardData.push(data);
                });

                res.render(page, { cardData: cardData });
            });
            console.log(Basket);
            console.log(page + ' page rendered');
        });
    }


    app.get('/', function (req, res) {
        console.log(Basket);
        res.render('index', { basket: Basket });
        console.log('index page rendered');
    });
    app.get('/index', function (req, res) {
        res.render('index', { basket: Basket });
        console.log('index page rendered');
    });
    app.get('/order', function (req, res) {
        res.render('order', { basket: Basket });
        console.log('order page rendered');
    });
    app.get('/about', function (req, res) {
        res.render('about', { basket: Basket });
        console.log('about page rendered');
        
    });
    app.get('/admin', function (req, res) {
        res.render('adminLogin', { basket: Basket });
        console.log('admin login page rendered');
        
    });
    app.get('/admin-panel',urlencodedParser,(req,res)=>{
        firebase.firestore.collection('orders').get().then(snapshot=>{
            let docs = [];
            snapshot.docs.forEach(doc=>{
                docs.push(doc.data());
            })
            res.render('admin-panel', {docs: docs});
            
        })
    })


    //RUN GET PAGE FUNCTION    
    getPage('cakes', Basket); //Get the cakes page

    getPage('bread', Basket); //Get the bread page

    getPage('croissants', Basket); //Get the Croissants page  

    getPage('pizza', Basket); //Get the Pizza Page
    
    


    /*POST REQUESTS */

    app.post('/basket', urlencodedParser, function (req, res) {
        console.clear();
        res.send(req.body);
        //return items in basket to the global variable   
        Basket.push(req.body);
    });
    
    
    app.post('/order', urlencodedParser, (req, res) => {
        console.clear();
        
        firebase.firestore.collection('orders').add({
            basket: JSON.stringify(Basket),
            customerInfo: JSON.stringify(req.body),
            submissionTime: new Date(),
        }).then(snapshot => {
            console.clear();
            res.render('index', {basket: []});            
            // res.send('Order successful')
        })
        Basket = [];
        
    });
    
    app.post('/get-orders', urlencodedParser, function (req, res) {
        firebase.firestore.collection('orders').get().then(snapshot=>{
           let data=[];
            snapshot.docs.forEach(doc=>{
                data.push(doc.data());
            })
            res.send(data); 

        })
    });
     


}


module.exports = controller;


//still there are problems with basket clearance