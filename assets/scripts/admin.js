window.onload = function(e){
 //alert('admin loaded');

 let links = document.querySelector('.links');
 let buttons = links.querySelectorAll('span');
 
 buttons.forEach(button=>{
     button.addEventListener('click',e=>{
        e.stopPropagation();
        e.preventDefault();
        //console.log(e.target.innerText);

        if(e.target.innerText.toLowerCase() === "dashboard"){
            loadDashboard()
        }
        else if(e.target.innerText.toLowerCase() ==='orders'){
            loadOrders();
        }
        else if(e.target.innerText.toLowerCase() ==='settings'){
            loadSettings();
        }
     })
 })


let loadDashboard = function(){
    console.log('dashboard Loaded');    
}

let loadOrders = function(){
    console.log('orders Loaded')
}

let loadSettings = function(){
    console.log('settings Loaded');
}









}