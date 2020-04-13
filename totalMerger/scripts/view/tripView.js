document.addEventListener('DOMContentLoaded', () => {
    let tab3 = document.querySelector('#tab3');
    let data = mMan.getAllTrips();

    /**
     * criteria[0] = Title - Nóg að hafa hluttstreng
     * criteria[1] = Date - dagsetning á strengjaformi
     * criteria[2] = TimeStart -  Tímasetning á strengjaformi
     * criteria[3] = Duration -  skilar <= x
     * criteria[4] = location - Nót að hafa hlutsstreng
     * criteria[5] = slots - laus pláss skilar >= x 
     * criteria[6] = taken - pláss sem búið er að taka skilar <=x
     * criteria[7] = price  - skilar <= x
     * criteria[8] = meta/keywords - nóg að 1 af metanu passi við eitthvað í keywords
     */

    let criteria = new Array(9)
    let params = initParams();
    if (params.length !== 0) {
        for (let i = 0; i < criteria.length; i++)
            criteria[i] = ""
        criteria[1] = `${params[2]}$${params[3]}`
        //location
        criteria[4] = params[1]
        
        data = mMan.getFilteredTrips(criteria)
    }



    tab3.addEventListener('click', () => {
        initFilterCheckboxes();
        destroyPopUps();
        showTrips();
    });

    function initFilterCheckboxes() {
        const filter = document.querySelector('.filter');
        filter.classList.remove('filter--hidden')
        const cbs = document.querySelectorAll('.filter__checkbox')
        for (cb of cbs) {
            cb.addEventListener('click', (e) => {
                showTrips()
            })
        }
    }

    function showTrips() {
        let content = document.querySelector("#content");
        empty(content)
        const trips__list = el('section', 'trips__list');
        const trips__row = el('div', 'trips__row', trips__list);
        const trips = el('div', 'trips', trips__row)
        content.appendChild(trips)
        let meta = initMetaData()
        criteria[8] = meta;
        data = mMan.getFilteredTrips(criteria)
        for (let d of data) {
            let trip = generateTripCard(d.getInfoAsObject())
            trips__list.appendChild(trip)

        }
    }

    function generateTripCard(info) {
        let trip = el('div', 'trip');

        let tName = el('span', 'info__name', document.createTextNode(info.title));
        let tLocation = el('span', 'info__location', document.createTextNode(info.location));
        let tTime = el('span', 'info__time', document.createTextNode(`Start time: ${info.timeStart}`));
        let tDuration = el('span', 'info__duration', document.createTextNode(`Duration: ${info.duration} hours`));
        
        let tImage = el('img', 'image__image');
        tImage.setAttribute('src', './img/tripImage/trip1.jpg');
        let imageCard = el('div', 'trip__image', tImage);
        
        let tInfo = el('div', 'info__trip', tName, tLocation, tTime, tDuration)
        let allInfo = el('div', 'info__all', imageCard, tInfo ); 

        let tPrice = el('span', 'price__price', document.createTextNode(`${info.price} kr.`));
        let tTotal = el('span', 'price__total', document.createTextNode(`Total: ${info.price*2} kr.`));
        let tBook = el('span', 'bookButton', document.createTextNode('Book Trip'));
        tBook.addEventListener('click', () => {
            mMan.addTripToPackage(info.id);
            let tab4 = document.querySelector('#tab4');
            let popup = createPopUp(tab4, `Trip: ${info.title}`);
            let body = document.querySelector('body')
            body.appendChild(popup)

        });
        let tripPrice = el('div', 'trip__price', tPrice, tTotal, tBook);


        let tCard = el('div', 'trip__info', allInfo, tripPrice);
        trip.appendChild(tCard);

        return trip;
    }


});
