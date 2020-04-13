document.addEventListener('DOMContentLoaded', () => {
    let tab1 = document.querySelector('#tab1');
    let tab2 = document.querySelector('#tab2');
    let tab3 = document.querySelector('#tab3');
    let tab4 = document.querySelector('#tab4');
    let data = mMan.getPackageInfo();

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




    tab4.addEventListener('click', () => {
        //initFilterCheckboxes();
        destroyPopUps();
        showPackage();
    });

    function initFilterCheckboxes() {
        const cbs = document.querySelectorAll('.filter__checkbox')
        for (cb of cbs) {
            cb.addEventListener('click', (e) => {
                showTrips()
            })
        }
    }

    function showPackage() {
        let content = document.querySelector("#content");
        empty(content)
        const package__list = el('section', 'package__list');
        const package__row = el('div', 'package__row', package__list);
        const packages = el('div', 'packages', package__row)
        content.appendChild(packages)
        for(let i = 0; i < 3; i++){
            let package = null;
            if(i===0)
                package = 
            package__list.appendChild(package)
        }
    }

    function generatePackageCards(info) {
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
