window.onload = function () {
   
   //MATERIALIZE FEATURES  
   $('.parallax').parallax();
   $('.dropdown-trigger').dropdown();
   
   function checkIfUserIsSignedIn(){
      $.ajax({
         type:'GET',
         url: '/checkAuthStatus',
         success: function(data){
            if(data){
               //replace signin button with a dropdown list
               console.log('signed in')
              let signBtn = document.querySelector('#signBtn');
              signBtn.innerHTML = ` <a class='dropdown-trigger btn btn-floating' href='' data-target='dropdown1'><i class="material-icons right" href="">account_circle</i></a>`
               //optional: if user is signed in, the name of the items order list will be replaced with user name;
               //also comments will also be replaced
               $('.dropdown-trigger').dropdown();
            }
         }
      })
   }
   //CHECK AUTHENTICATION STATUS
   checkIfUserIsSignedIn();
//////////////////////////////////////////////////////////////////////

   console.log("window loaded")
   let body = document.querySelector('body');

   if (body.className === 'order') {
      //Order Page : Order List Items
      let basketItems = document.getElementById('basket-items');
      basketItems.addEventListener('click', e => {
         e.preventDefault();
         e.stopPropagation();
         if (e.target.innerHTML === "cancel") {
            let li = e.target.parentElement.parentElement;
            console.log(basketItems.childNodes);
            let lis = basketItems.querySelectorAll('li');
            let index = Array.from(lis).indexOf(li);
            console.log('index is: ', index);

            basketItems.removeChild(li);
            $.ajax({
               type: 'POST',
               url: '/remove',
               data: { index: index },
               success: function (res) {
                  //do something
                  location.reload();
               },
               error: function (res) {
                  //do something
               }
            })
         }
      })

   }
   //code for backend admin section
   let addBtn = document.querySelector('.add');
   console.log(addBtn);
   // addBtn.addEventListener('click', (e)=>{  
   //    e.preventDefault();
   //    alert('add clicked')
   // });

   /* Cards */
   let cards = document.querySelectorAll('.card');
   console.log(cards)
   cards.forEach(function (card) {
      card.addEventListener('click', handleCardButtonClick)
   })


   function handleCardButtonClick(e) {

      //e.preventDefault();
      //e.stopPropagation();
      console.log(e.target);
      if (e.target.classList.contains('btn')) {
         e.preventDefault()
         e.stopPropagation();

         //Get Item Name
         //clone the node to manipulate into getting the inner text
         let clonedSpan = e.target.parentElement.previousElementSibling.cloneNode(true);
         let i = clonedSpan.querySelector('i');
         clonedSpan.removeChild(i);
         let cardName = clonedSpan.innerText.trim();

         //Get Item ID
         let cardID = e.target.parentElement.parentElement.parentElement.id;
         //Get Item Price
         let price = e.target.nextElementSibling.innerText;
         console.log('price: ', price);
         //Get Item info
         let info = e.target.parentElement.parentElement.nextElementSibling.querySelector('p').innerText.trim();
         //Get image URL
         let imgURL = e.target.parentElement.parentElement.previousElementSibling.
            querySelector('img').getAttribute('src');

         //fire modal to ask if user wants to add item to basket



         //post the info to the server
         $.ajax({
            type: 'POST',
            url: '/basket',
            data: { // data to be sent through post
               name: cardName,
               id: cardID,
               price: price,
               info: info,
               imgURL: imgURL
            },
            success: function (data) {
               //do something with the data via front end
               console.log('this is the data you posted: ', data);
               location.reload();
            }
         })

      }
      //location.reload();
   }
   // else if(e.target)

   let getTotal = function () {
      $.ajax({
         type: 'GET',
         url: 'total',
         data: {},
         success: function (data) {
            let p = document.querySelector('.items-total');
            p.innerHTML = `<strong>Total Amount: GHS ${data.total}.00 </strong>`;
         }
      })
   }


   if (body.classList.contains('order')) {
      getTotal();
   }

   //NAVBAR
   let nav = document.querySelector('nav');
   console.log(nav);
   nav.addEventListener('click', function (e) {
      if (e.target.innerText.trim() === "shopping_cart") {
         e.preventDefault();
         $('.modal').modal();
      }
   })

   //Comment Section
   let commentBtn = document.getElementById('commentBtn');
   commentBtn.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation();

      let commentForm = document.getElementById('commentForm');
      let thankYou = document.getElementById('thank-you');
      if (commentForm.classList.contains('hide')) {
         commentForm.classList.remove('hide');
         commentForm.classList.add('show')
      } else {
         commentForm.classList.remove('show');
         commentForm.classList.add('hide')
      }

      commentForm.onsubmit = function (e) {
         e.preventDefault();

         $.ajax({
            type: 'POST',
            url: '/comment',
            data: {
               review: commentForm.review.value,
               userName: commentForm.name.value,
               email: commentForm.email.value
            },
            success: function(data){
               console.log(data);
            },
            error: function(err){
               console.log('error : ', err);
            }
         });

         commentForm.classList.remove('show');
         thankYou.innerHTML = `Thank you for sending us your review
         we will get back to you later with a personal message`
         thankYou.classList.add("shake");

         setTimeout(function(){
            commentForm.classList.add('hide');
            commentForm.classList.remove('shake');
            commentForm.review.value = "";
            commentForm.name.value = "";
            commentForm.email.value = "";
         }, 2000);
        
      }
   });





   //MATERIALIZE FEATURES  
   $('.parallax').parallax();
   $('.dropdown-trigger').dropdown();




}