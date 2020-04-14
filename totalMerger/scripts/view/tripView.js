document.addEventListener('DOMContentLoaded', () => {
    let tab3 = document.querySelector('#tab3');
    let data = mMan.getAllTrips();
    let criteria = new Array(9)
    let params = []
    initDataFromParams(initParams());
    let grownups = parseInt(params[4][0]);
    let children = parseInt(params[4][1]);
    let personCount = grownups+ children;
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
                criteria[1] = `${params[2]}$${params[3]}`
                //location
                criteria[4] = params[1]
                
                data = mMan.getFilteredTrips(criteria)
        }
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
        tImage.setAttribute('src', returnImgUrl(info));
        let imageCard = el('div', 'trip__image', tImage);
        
        let tInfo = el('div', 'info__trip', tName, tLocation, tTime, tDuration)
        let allInfo = el('div', 'info__all', imageCard, tInfo ); 

        let tPrice = el('span', 'price__price', document.createTextNode(`${info.price} kr. per person`));
        let adults = (grownups > 1) ? 'adults' : 'adult'; 
        let child = (children > 1) ? 'children': 'child'
        let ppltext =  (children > 0) ? `${grownups} ${adults}, ${children} ${child}` : `${grownups} ${adults}`;
        let ppl = el('span',`price__people`,document.createTextNode(ppltext));
        let tTotal = el('span', 'price__total', document.createTextNode(`Total: ${info.price*personCount} kr.`));
        let btnText = (mMan.getTripPackageContains(info.id)) ? 'Cancel Trip' : 'Book Trip';
        let tBook = el('span', 'bookButton', document.createTextNode(btnText));
        if((tBook.textContent).toLowerCase().includes('cancel'))[
            tBook.classList.add('booked')
        ]

        tBook.addEventListener('click', () => {
            if(tBook.textContent.toLowerCase() === 'Book Trip'.toLowerCase()){
                tBook.textContent = "Cancel Trip";
                tBook.classList.add('booked')
                if(!mMan.getTripPackageContains(info.id))
                    mMan.addTripToPackage(info.id); 
            }
            else if(tBook.textContent.toLowerCase() === "Cancel Trip".toLowerCase()){
                tBook.textContent = "Book Trip"
                tBook.classList.remove('booked')
                mMan.removeTripFromPackage()
            }
            
            //let tab4 = document.querySelector('#tab4');
            //let popup = createPopUp(tab4, `Trip: ${info.title}`);
            //let body = document.querySelector('body')
            //body.appendChild(popup)

        });
        let tripPrice = el('div', 'trip__price', tPrice,ppl, tTotal, tBook);


        let tCard = el('div', 'trip__info', allInfo, tripPrice);
        trip.appendChild(tCard);

        return trip;
    }

    function returnImgUrl(info){
        let keywords = ['cave','diving','elf','extreme','horse','mountain'];
        let folder = 'other';
        for(let k of keywords){
            if(info.title.toLowerCase().includes(k.toLowerCase())){
                folder = k
                break;
            }
        }
        let ranNum = nextInt(2);
        let img_temp = `./img/tripImage/${folder}/${folder.concat(ranNum)}.jpg`;
        return img_temp;
    }


});
