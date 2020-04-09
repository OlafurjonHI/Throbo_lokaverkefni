document.addEventListener('DOMContentLoaded', () => {
    const mMan = new MainManager(10)
    let tab3 = document.querySelector('#tab3');
    let data = mMan.getAllTrips();

    let criteria = new Array(9)
    let params = initParams();
    if(params.length !== 0){
        for(let i = 0; i < criteria.length; i++)
            criteria[i] = ""
        criteria[1] = `${params[1]}$${params[2]}`
        //location
        criteria[4] = params[0]
        console.log(params[3][2])

        data = mMan.getFilteredTrips(criteria)
    }



    tab3.addEventListener('click',()=> {
        showTrips();
    });

    function showTrips(){
        let content = document.querySelector("#content");
        empty(content)
        const trips__list = el('section','trips__list');
        const trips__row = el('div','flights__row',trips__list);
        const trips = el('div','trips',trips__row)
        content.appendChild(trips)
        
        for(let d of data){
            let trip = generateTripCard(d.getInfoAsObject())
            trips__list.appendChild(trip)

        }
    }

    function generateTripCard(info){
        let trip = el('div', 'trip');

        let tName = el('span', 'info__name', document.createTextNode(info.title));
        let tLocation = el('span', 'info__location', document.createTextNode(info.location));
        let tTime = el('span', 'info__time', document.createTextNode(info.timeStart));
        let tDuration = el('span', 'info__duration', document.createTextNode(info.duration));
        let tInfo = el('div', 'info__info', tName, tLocation, tTime, tDuration);

        let tPrice = el('span', 'price__price', document.createTextNode(info.price));
        let tTotal = el('span', 'trip__total', document.createTextNode((info.price)*2));
        let tBook = el('span', 'bookButton', document.createTextNode('Book Trip'));
        let tripPrice = el('div', 'trip__price', tPrice, tTotal, tBook);

        let tImage = el('img', 'image__image');
        tImage.setAttribute('src', './img/tripImage/trip1.jpg');
        let imageCard = el('div', 'trip__image', tImage);
        
        let tCard = el('div', 'trip__info', imageCard, tInfo, tripPrice);      
        
        trip.appendChild(tCard);

        return trip;
       }


});
