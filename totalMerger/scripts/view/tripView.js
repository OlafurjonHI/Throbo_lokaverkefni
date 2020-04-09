document.addEventListener('DOMContentLoaded', () => {
    const mMan = new MainManager(10)
    showTripss();

    function showTripss(){
        const list = document.querySelector('.trips__list');
        empty(list)
        let data = mMan.getAllTrips();
        for(let d of data){
            let trip = generateTripCard(d.getInfoAsObject())
            list.appendChild(trip)

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
