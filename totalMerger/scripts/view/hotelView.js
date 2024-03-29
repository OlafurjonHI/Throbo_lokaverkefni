document.addEventListener('DOMContentLoaded', () => {
    
    let tab2 = document.querySelector('#tab2');
    let data = mMan.getAllHotels();
    let params = [];
    let criteria = new Array(8)
    initDataFromParams(initParams())
    let roomcount= parseInt(params[4][2])
    let grownups = parseInt(params[4][0]);
    let children = parseInt(params[4][1]);
    let nights = parseInt(DaysBetweenDates(params[2],params[3]))
    if(parseInt(nights) === 0)
        nights = 1


    /**
    /**
     * criteria[0] = name - Nóg að hafa hluttstreng
     * criteria[1] = address - Nóg að hafa hluttstreng
     * criteria[2] = stars - finnur x eða hærri (hægt að breyta í exact)
     * criteria[3] = rating -finnur x eða hærri (hægt að breyta í exact)
     * criteria[4] = smallRooms - finnur x eða hærri (hægt að breyta í exact)
     * criteria[5] = BigRooms- finnur x eða hærri (hægt að breyta í exact)
     * criteria[6] = price  - finnur x eða minna (hægt að breyta í exact)
     * criteria[7] = meta/keywords - nóg að 1 af metanu passi við eitthvað í keywords
     */
    
    const searchbtn = document.querySelector('.searchButton');
    searchbtn.addEventListener('click',(e)=>{
        initDataFromParams(gatherGetParams())  
        let active = document.querySelector('.tab__active')
        active.click();
    })
    

    
    
  
    function initDataFromParams(initparams){
        params = initparams;
        if (params.length !== 0) {
            for (let i = 0; i < criteria.length; i++)
                criteria[i] = ""
          //address
          criteria[1] = params[1]
          //rooms available
          criteria[4] = parseInt(params[4][2])
          data = mMan.getFilteredHotels(criteria,sortValue)
        }
    }
    
    
-


    tab2.addEventListener('click',()=> {
        tab2.classList.add('tab__active')
        initFilterCheckboxes();
        destroyPopUps();
        showHotels();
    });
    
    function initFilterCheckboxes() {
        const cbs = document.querySelectorAll('.filter__checkbox')
        const filter = document.querySelector('.filter');
        filter.classList.remove('filter--hidden')   
        for (cb of cbs) {
            cb.addEventListener('click', (e) => {
                showHotels();
            })
        }
    }

    function showHotels(){
        let content = document.querySelector("#content");
        empty(content)
        const hotel__list = el('section','hotel__list');
        const hotels__row = el('div','hotels__row',hotel__list);
        const hotels = el('div','hotels',hotels__row)
        content.appendChild(hotels)
        let meta = initMetaData();
        criteria[7] = meta;
        data = mMan.getFilteredHotels(criteria,sortValue)
        
        for(let d of data){
            let hotel = generateHotelCard(d.getInfoAsObject())
            hotel__list.appendChild(hotel)
        }
    }


function generateHotelCard(info){
    let hotel = el('div', 'hotel');

    let use_img = returnImgUrlHotel(info.stars);
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
        
    
    let price = el('span', 'room__price',document.createTextNode(`${info.price.toLocaleString()} kr. Per Room`));   
    let hotel_stars = el('span', 'hotel__stars', document.createTextNode(info.stars))
    let roomstexts = (roomcount > 1) ? 'rooms' : 'room'; 
    let nightsText = (nights > 1) ? 'nights' : 'night'; 
    
    let room = el('span',`hotel__rooms`,document.createTextNode(`${roomcount} ${roomstexts}, ${nights} ${nightsText}`));
    let tTotal = el('span', 'price__total', document.createTextNode(`Total: ${(info.price*(roomcount*nights)).toLocaleString()} kr.`));
   
    let book = el('div', 'bookButton', document.createTextNode('pick room'));
    let hotel_price = el('div', 'hotel__price', price,room,tTotal,book);
    book.addEventListener('click',()=>{
        mMan.addHotelToPackage(info.id);
        let tab2 = document.querySelector('#tab2');
        let popup = createPopUp(tab3,`Hotel: ${info.name}`);
        let body = document.querySelector('body')
        body.appendChild(popup)

    });
    let contentLeft = el('div', 'content__left', hotel_rating, hotel_price);
    let hotel__info = el('div', 'hotel__info', rightContent, contentLeft);
    
    hotel.appendChild(hotel__info);
    return hotel;
}

function returnImgUrlHotel(stars){
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