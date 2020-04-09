document.addEventListener('DOMContentLoaded', () => {
    const mMan = new MainManager(50)
    let tab2 = document.querySelector('#tab2');
    
    tab2.addEventListener('click',()=> {
        showHotels();
        console.log("Display Hotels")

    });
   

    function showHotels(){
        let content = document.querySelector("#content");
        empty(content)
        const hotel__list = el('section','hotel__list');
        const hotels__row = el('div','hotels__row',hotel__list);
        const hotels = el('div','hotels',hotels__row)
        content.appendChild(hotels)
        let data = mMan.getAllHotels();
        for(let d of data){
            let hotel = generateHotelCard(d.getInfoAsObject())
            hotel__list.appendChild(hotel)
        }
    }


function generateHotelCard(info){
    let hotel = el('div', 'hotel');

    let use_img = returnImgUrl(info.stars);
    let hotel_img = el('img', 'image__image');
    hotel_img.setAttribute('src', use_img);
    hotel_img.setAttribute('alt', `The image og ${info.name}`);
    let hotel_image_parent = el('div', 'hotel__image', hotel_img);
    
    let name = el('h2', 'hotel__name', document.createTextNode(info.name));
    let address = el('span', 'hotel__address', document.createTextNode(info.address));
    let hotel_info = el('div', 'info__info', name, address);

    let rightContent = el('div', 'content__right', hotel_image_parent, hotel_info)
    
    let hotel_rating = el('div', 'hotel__rating');
    for(i = 0; i < info.stars; i++){
        let rating_img = returnRatingImg(info.name);
        hotel_rating.appendChild(rating_img);
    }
        
    
    let price = el('span', 'room__price',document.createTextNode(`${info.price} kr.`));   
    let hotel_stars = el('span', 'hotel__stars', document.createTextNode(info.stars))
    let hotel_price = el('div', 'hotel_price', hotel_rating, hotel_stars, price);
    let book = el('div', 'bookButton', document.createTextNode('pick room'));
    let contentLeft = el('div', 'content__left', hotel_price, book);
    let hotel__info = el('div', 'hotel__info', rightContent, contentLeft);
    
    hotel.appendChild(hotel__info);
    return hotel;
}

function returnImgUrl(stars){
    let ranNum = Math.round(Math.random()*12);
    let img_temp = `./img/hotelimage/${stars}-star/hotel${ranNum}.jpg`;
    return img_temp;
}

function returnRatingImg(name){
    let rating_img = el('img', 'rating__img');
    rating_img.setAttribute('src', './img/star.png');
    rating_img.setAttribute('alt', `Rating for ${name}`);
    return rating_img;
}

});