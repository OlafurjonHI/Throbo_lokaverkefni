const mMan = new MainManager(50)
document.addEventListener('DOMContentLoaded', () => {

    let tab1 = document.querySelector('#tab1');
    let data = mMan.getAllFlights();
    let both = true;
    let params = []
    let criteria = new Array(10)
    /**
    * criteria[0] = flightNo - Nóg að hafa hluttstreng
    * criteria[1] = From - Nóg að hafa hluttstreng
    * criteria[2] = To -  Nóg að hafa hluttstreng
    * criteria[3] = Airline -  Nóg að hafa hluttstreng
    * criteria[4] = departureTime - tekur inn dagsetningu í strengjaformi og skilar x >= 
    * criteria[5] = status - nóg að hafa hlutsstreng
    * criteria[6] = TotalSeats  - heildarfjöldi sæta skilar x >= hægt að breyta í minna
    * criteria[7] = remainingSeats  - skilar >= x
    * criteria[8] = price  - skilar <= x
    * criteria[9] = meta/keywords - nóg að 1 af metanu passi við eitthvað í keywords
    */
    
    function initDataFromParams(initparams){
        params = initparams;

        if (params.length !== 0) {
            for (let i = 0; i < criteria.length; i++)
                criteria[i] = ""
            criteria[4] = params[2]
            data = mMan.getFilteredFlights(criteria,sortValue)
        }

    }

    function initFilterCheckboxes() {
        const cbs = document.querySelectorAll('.filter__checkbox')
        const filter = document.querySelector('.filter');
        filter.classList.remove('filter--hidden')
        for (cb of cbs) {
            cb.addEventListener('click', (e) => {
                showFlights()
            })
        }
    }

    function showFlights() {
        let content = document.querySelector("#content");
        empty(content)
        const flight__list = el('section', 'flight__list');
        const flights__row = el('div', 'flights__row', flight__list);
        const flights = el('div', 'flights', flights__row)
        let meta = initMetaData()
        if (both) {
            let criteria2 = [].concat(criteria)
            criteria2[2] = criteria[1]
            criteria2[1] = criteria[2]
            criteria2[4] = params[3]
            criteria2[9] = meta
            data2 = mMan.getFilteredFlights(criteria2,sortValue)
        }
        criteria[9] = meta
        data = mMan.getFilteredFlights(criteria,sortValue)
        
        content.appendChild(flights)
        for (let d of data) {
            let flight = generateFlightCard(d.getInfoAsObject())
            flight__list.appendChild(flight)
            if (both) {
                for (const d2 of data2) {
                    if (d.getTo() === d2.getFrom() && d.getFrom() === d2.getTo()) {
                        generateFlightCardOriginAndDest(d2.getInfoAsObject())
                        data2.splice(data2.indexOf(d2), 1)
                        flight.querySelector('.bookButton').addEventListener('click',(e)=> {
                            mMan.addFlightBackToPackage(d2.getInfoAsObject().id);
                            let pops = document.querySelectorAll('.popup__headline')
                            let otherFlight = pops[pops.length-1].textContent.split(' ')[2];
                            let popup = createPopUp(tab2, `Flights: ${otherFlight} and ${d2.getFlightNumber()}`);
                            let body = document.querySelector('body')
                            body.appendChild(popup)
                        })
                        break
                    }
                }
            }
        }
    }
    function generateFlightCard(info) {


        let number_info = el('span', 'number__info', document.createTextNode('Flightnumber:'));
        let number = el('h2', 'number', document.createTextNode(info.flightNo))
        let flight_number = el('div', 'flight__number', number_info, number)

        //Destination and arrival
        let aTime = info.arrivalTime.toLocaleString();
        let adate = aTime.split(',')[0];
        let atime = aTime.split(',')[1];
        let arrivalTime = el('span', 'flight__arrtime', document.createTextNode(atime));
        let dlong = (info.to).split(' ')[0];
        let dshort = (info.to).split(' ')[1].substring(1, 4);
        let destShort = el('span', 'flight__destShort', document.createTextNode(dshort));
        // let destLong = el('span','flight__destLong',document.createTextNode(dlong));
        let arrival = el('div', 'flight__planDest', arrivalTime, destShort);

        // Origin and departure
        let dur = msToTime(info.arrivalTime - info.departureTime)

        //console.log(new Date(info.arrivalTime - info.departureTime));
        let dTime = info.departureTime.toLocaleString();
        let ddate = dTime.split(',')[0];
        let dtime = dTime.split(',')[1];
        let olong = (info.from).split(' ')[0];
        let oshort = (info.from).split(' ')[1].substring(1, 4);
        let departureTime = el('span', 'flight__deptime', document.createTextNode(dtime));
        let origShort = el('span', 'flight__origShort', document.createTextNode(oshort));
        let departure = el('div', 'flight__planDest', departureTime, origShort);

        //Duration
        let time = dtime;
        let flight_time = el('span', 'flight__time', document.createTextNode(dur));
        let decoration = el('span', 'flight__dec', document.createTextNode('------------------------------------>'));
        let duration = el('div', 'flight__duration', flight_time, decoration);

        let plan = el('div', 'flight__plan', departure, duration, arrival);

        //Price 
        let price = info.price.toLocaleString();
        let ticketPrice = el('span', 'ticket__price', document.createTextNode(`${price} kr. per seat`));
        let totalPrice = el('span', 'ticket__total', document.createTextNode(`Total price: ${price} kr.`));
        let book = el('button', 'bookButton', document.createTextNode('Book'));

        let price_info = el('div', 'flight__price', ticketPrice, totalPrice, book);

        let use_img = returnImgUrl(info.airline);
        let airline_image = el('img', 'airline__image')
        airline_image.setAttribute("src", use_img);
        airline_image.setAttribute('alt', `The Logo for ${info.airline}`)
        let flight_airline = el('div', 'flight__airline', airline_image)

        let flight_info = el('div', 'flight__info', flight_airline, plan, price_info);
        let flight = el('div', 'flight', flight_info);
        book.addEventListener('click', () => {
            mMan.addFlightToPackage(info.id);
            let tab2 = document.querySelector('#tab2');
            let popup = createPopUp(tab2, `Flight: ${info.flightNo}`);
            let body = document.querySelector('body')
            body.appendChild(popup)

        });
        return flight;

    }

    function generateFlightCardOriginAndDest(info) {
        let number_info = el('span', 'number__info', document.createTextNode('Flightnumber:'));
        let number = el('h2', 'number', document.createTextNode(info.flightNo))
        //let flight_number = el('div','flight__number',number_info,number)

        //Destination and arrival
        let aTime = info.arrivalTime.toLocaleString();
        let adate = aTime.split(',')[0];
        let atime = aTime.split(',')[1];
        let arrivalTime = el('span', 'flight__arrtime', document.createTextNode(atime));
        let dlong = (info.to).split(' ')[0];
        let dshort = (info.to).split(' ')[1].substring(1, 4);
        let destShort = el('span', 'flight__destShort', document.createTextNode(dshort));
        // let destLong = el('span','flight__destLong',document.createTextNode(dlong));
        let arrival = el('div', 'flight__planDest', arrivalTime, destShort);

        // Origin and departure
        let dur = msToTime(info.arrivalTime - info.departureTime)

        //console.log(new Date(info.arrivalTime - info.departureTime));
        let dTime = info.departureTime.toLocaleString();
        let ddate = dTime.split(',')[0];
        let dtime = dTime.split(',')[1];
        let olong = (info.from).split(' ')[0];
        let oshort = (info.from).split(' ')[1].substring(1, 4);
        let departureTime = el('span', 'flight__deptime', document.createTextNode(dtime));
        let origShort = el('span', 'flight__origShort', document.createTextNode(oshort));
        let departure = el('div', 'flight__planDest', departureTime, origShort);

        //Durationt
        let time = dtime;
        let flight_time = el('span', 'flight__time', document.createTextNode(dur));
        let decoration = el('span', 'flight__dec', document.createTextNode('<------------------------------------'));
        let duration = el('div', 'flight__duration', flight_time, decoration);

        let plan = el('div', 'flight__plan', departure, duration, arrival);


        //Price 
        /*
        let price = info.price.toLocaleString();
        let ticketPrice = el('span', 'ticket__price', document.createTextNode(`${price} kr.`));
        let totalPrice = el('span', 'ticket__total', document.createTextNode(`Total price: ${price} kr.`));
        let book = el('button', 'bookButton', document.createTextNode('Book'));
        book.addEventListener('click',()=>{
            mMan.addFlightToPackage(info.id);
            let tab2 = document.querySelector('#tab2');
            let popup = createPopUp(tab2,`Flight: ${info.flightNo}`);
            let body = document.querySelector('body')
            body.appendChild(popup)

        });
        let price_info = el('div', 'flight__price', ticketPrice, totalPrice, book);
        */
        let use_img = returnImgUrl(info.airline);
        let airline_image = el('img', 'airline__image')
        airline_image.setAttribute("src", use_img);
        airline_image.setAttribute('alt', `The Logo for ${info.airline}`)
        let flight_airline = el('div', 'flight__airline', airline_image)

        let flight_airlines__dest = document.querySelectorAll('.flight__airline');
        let flight__airline__dest = flight_airlines__dest[flight_airlines__dest.length - 1]
        let flight__airline__cln = flight__airline__dest.cloneNode(true);
        flight__airline__dest.parentNode.removeChild(flight__airline__dest);

        let flight__plans__dest = document.querySelectorAll('.flight__plan');
        let flight__plan__dest = flight__plans__dest[flight__plans__dest.length - 1]
        let flight__plan__cln = flight__plan__dest.cloneNode(true);
        flight__plan__dest.parentNode.removeChild(flight__plan__dest);


        let flight__dest = el('div', 'flight__dest', flight_airline, plan)
        let flight__origin = el('div', 'flight__origin', flight__airline__cln, flight__plan__cln)
        let flight__package = el('div', 'flight__package', flight__origin, flight__dest)

        let flight__infos = document.querySelectorAll('.flight__info');
        let flight__info = flight__infos[flight__infos.length - 1]
        let sibling = flight__info.querySelector('.flight__price')
        flight__info.insertBefore(flight__package, sibling)

        let price = info.price.toLocaleString();
        let ticketPrice = el('span', 'ticket__price', document.createTextNode(`${price.toLocaleString()} kr. per seat`));
        //let totalPrice = el('span', 'ticket__total', document.createTextNode());
        flight__price = flight__info.querySelector('.flight__price');
        let totalPrice = flight__price.querySelector('.ticket__total')
        flight__price.insertBefore(ticketPrice, totalPrice)
        let currentPrice = parseFloat(totalPrice.textContent.split(' ')[2].replace(',', '.')) * 1000
        let newTotal = parseInt(info.price) + currentPrice
        totalPrice.textContent = `Total price: ${(newTotal*personCount).toLocaleString()} kr.`



    }
    
    tab1.addEventListener('click', () => {
        tab1.classList.add('tab__active')
        initFilterCheckboxes()
        destroyPopUps();
        showFlights();

    });
    const searchbtn = document.querySelector('.searchButton');
    searchbtn.addEventListener('click',(e)=>{
  
        let active = document.querySelector('.tab__active')
        active.click();
    })

    initDataFromParams(initParams())
    let personCount = parseInt(params[4][0])+ parseInt(params[4][1])
    initFilterCheckboxes();
    showFlights();
});