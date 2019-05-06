window.onload = function () {
   console.log("window loaded")

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
      //e.stopPropagation();
      //e.preventDefault();
      console.log(e.target);
      if (e.target.classList.contains('btn')) {
         e.preventDefault()

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
         console.log('price: ',price);
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
      location.reload();
   }
  // else if(e.target)

   //NAVBAR
   let nav = document.querySelector('nav');
   console.log(nav);
   nav.addEventListener('click', function(e){      
      if(e.target.innerText.trim() === "shopping_cart"){
         e.preventDefault();
         $('.modal').modal();
      }
   })


   //MATERIALIZE FEATURES  
   $('.parallax').parallax();



 
    
}