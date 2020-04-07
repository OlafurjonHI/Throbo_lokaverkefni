document.addEventListener('DOMContentLoaded', () => {
    const mMan = new MainManager(50)
    showHotels();

    function showHotels(){
        const list = document.querySelector('.hotel__list');
        empty(list)
        let data = mMan.getAllHotels();
        for(let d of data){
            let hotel = generateHotelCard(d.getInfoAsObject())
            list.appendChild(hotel)

        }
    }


function generateHotelCard(info){
    let hotel = el('div', 'hotel');

    let use_img = returnImgUrl('Hotel Saga');
    let hotel_img = el('img', 'image__image');
    hotel_img.setAttribute('src', use_img);
    hotel_img.setAttribute('alt', `The image og ${info.name}`);
    let hotel_image_parent = el('div', 'hotel__image', hotel_img);
    
    let name = el('h2', 'hotel__name', document.createTextNode(info.name));
    let address = el('span', 'hotel__address', document.createTextNode(info.address));
    let hotel_info = el('div', 'info__info', name, address);
    
    let rating_img = returnRatingImg(3, 'Hotel Saga');
    let hotel_rating = el('div', 'hotel__rating', rating_img[0]);
    for(i = 1; i < rating_img.length; i++)
        hotel_rating.appendChild(rating_img[i]);
    
    let price = el('span', 'room__price',document.createTextNode(info.price));   
    let hotel_price = el('div', 'hotel_price', price, hotel_rating);

    let hotel__info = el('div', 'hotel__info', hotel_image_parent, hotel_info, hotel_price);
    hotel.appendChild(hotel__info);
    return hotel;
}

function returnImgUrl(name){
    let img_temp = './img/hotelimage/hotelsaga.jpg';
    return img_temp;
}

function returnRatingImg(stars, name){
    let rating = [];
    let rating_img = el('img', 'rating__img');
    rating_img.setAttribute('src', './img/star.png');
    rating_img.setAttribute('alt', `Rating for ${name}`);
    for(i = 0; i< stars; i++)
        rating.push(rating_img);
    return rating;
}

});