const basket = function(item){
    let newItem = {
        name: item.name,
        price: item.price,
        info: item.info,
        image: item.imgURL
    }
    
    let items = [];

    items.push(newItem)

    return items;
}


module.exports = basket;