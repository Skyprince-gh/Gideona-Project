window.onload = function (e) {
    //alert('admin loaded');

    let links = document.querySelector('.links');
    let buttons = links.querySelectorAll('span');
    let area = document.querySelector('.area');

    buttons.forEach(button => {
        button.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            //console.log(e.target.innerText);

            if (e.target.innerText.toLowerCase() === "comments"){
                loadComments();
            }
            else if (e.target.innerText.toLowerCase() === 'orders') {
                loadOrders();
            }
            else if (e.target.innerText.toLowerCase() === 'settings') {
                loadSettings();
            }
        })
    })


    let loadDashboard = function () {
        console.log('dashboard Loaded');
    }

    let loadOrders = function(){
        $.ajax({
            type: "GET",
            url: 'get-orders',
            data: {},
            success: function (data) {
                console.log('orders:', data);
                displayOrders(data);
            },
            error: function (err) {
                console.log('error: ', err)
            }
        })
    }

    let loadSettings = function () {
      
    }


    let displayOrders = function (data) {
        let orderList = document.querySelector('ul.collapsible');
        let customerInfo = JSON.parse(data[0].customerInfo);
        let basket = JSON.parse(data[0].basket);
        console.log('info: ', customerInfo);
        console.log('basket: ', basket)

        orderList.innerHTML = '';
        data.forEach(function (user) {
            let customerInfo = JSON.parse(user.customerInfo);
            let basket = JSON.parse(user.basket);
            let items = '';
            let total = user.total

            basket.forEach(item => {
                items += `<li class="collection-item" >${item.name}</li>`;
            })

            orderList.innerHTML += ` <li>
    <div class="collapsible-header">
        <strong>
            <span>${customerInfo.firstname} ${customerInfo.lastname}</span>
            <span>0${customerInfo.mobile}</span>
            <span>${customerInfo.address}</span>    
            <span>${customerInfo.payment}</span>    
        </strong>
    </div>
   <div class="collapsible-body">
   <ul class="collection">
        ${items}
        <li class="collection-item"><b>Total: GHS ${total}.00 </b></li>  
    </ul>
         
    </div>
  </li>`

        });


    }

    let loadComments = function () {
        $.ajax({
            type: "GET",
            url: '/get-comments',
            success: function (data) {
                console.log('comments: ', data);               displayComments(data);
            },
            error: function (err) {
                console.log('error', err)
            }
        })
    }
   
    let displayComments = function (data) {
        
        area.innerHTML = `<h2>Comments</h2>
        <ul class="collapsible w"></ul> `;

        setTimeout(function(){
         comments = area.querySelector('.collapsible')

         data.forEach(comment=>{
           comments.innerHTML += `<li>
           <div class="collapsible-header">
           <i class="material-icons">comment</i>
           <strong>${comment.userName}</strong>
           </div>

           <div class="collapsible-body">
           <span>${comment.review}</span> 
           </div>
         </li>`
        })
        });

       
        console.log(data);
    }


    //MATERIALIZE FEATURES  
    $('.collapsible').collapsible();

}

