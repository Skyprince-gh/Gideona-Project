window.onload = function(){
   console.log("window loaded")
   let addBtn = document.querySelector('.add');
   console.log(addBtn);
   // addBtn.addEventListener('click', (e)=>{  
   //    e.preventDefault();
   //    alert('add clicked')
   // });
  
   /* Cards */
   let cards = document.querySelectorAll('.card');
   console.log(cards)
   cards.forEach(function(card){
      card.addEventListener('click', handleCardButtonClick )
   })
   
  
   function handleCardButtonClick(e){
      //e.preventDefault()
      e.stopPropagation();
      console.log(e.target);
      if(e.target.classList.contains('btn')){
         console.log('item picked')
       let cardName = e.target.parentElement.previousElementSibling.textContent;
       let cardID = e.target.parentElement.parentElement.parentElement.id;

       //fire modal to ask if user wants to add item to basket

       //post the info to the server
       $.ajax({
          type: 'POST',
          url: '/basket',
          data: { // data to be sent through post
             cardName: cardName,
             cardID: cardID,
          },
          success: function (data){
            //do something with the data via front end
            console.log('this is the data you posted: ', data);
            //location.reload();
          }
       })

      }  
      console.log('the element is', e.target);
   }
}