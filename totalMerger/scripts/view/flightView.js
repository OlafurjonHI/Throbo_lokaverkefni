    document.addEventListener('DOMContentLoaded', () => {
        
        const mMan = new MainManager(50)
        let tab1 = document.querySelector('#tab1');
        let data = mMan.getAllFlights();

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
        let criteria = new Array(10)
        let params = initParams();
        if(params.length !== 0){
            for(let i = 0; i < criteria.length; i++)
            criteria[i] = ""
            console.log(new Date(Date.parse(params[2])))
            criteria[4] = params[1]
            data = mMan.getFilteredFlights(criteria)
        }
        
        tab1.addEventListener('click',()=> {
            showFlights();
        });
        



        function showFlights(){
            let content = document.querySelector("#content");
            empty(content)
            const flight__list = el('section','flight__list');
            const flights__row = el('div','flights__row',flight__list);
            const flights = el('div','flights',flights__row)
            content.appendChild(flights)
            for(let d of data){
                let flight = generateFlightCard(d.getInfoAsObject())
                flight__list.appendChild(flight)

            }
        }
        function generateFlightCard(info){
            
          
            
        
            let number_info = el('span','number__info',document.createTextNode('Flightnumber:'));
            let number = el('h2','number',document.createTextNode(info.flightNo))
            let flight_number = el('div','flight__number',number_info,number)
            
            //Destination and arrival
            let aTime = info.arrivalTime.toLocaleString();
            let adate = aTime.split(',')[0];
            let atime = aTime.split(',')[1];
            let arrivalTime = el('span','flight__arrtime',document.createTextNode(atime));
            let dlong = (info.to).split(' ')[0];
            let dshort = (info.to).split(' ')[1].substring(1,4);
            let destShort = el('span','flight__destShort',document.createTextNode(dshort));
            // let destLong = el('span','flight__destLong',document.createTextNode(dlong));
            let arrival = el('div', 'flight__planDest', arrivalTime, destShort);
            
            // Origin and departure
            let dTime = info.departureTime.toLocaleString();
            let ddate = dTime.split(',')[0];
            let dtime = dTime.split(',')[1];
            let olong = (info.from).split(' ')[0];
            let oshort = (info.from).split(' ')[1].substring(1,4);
            let departureTime = el('span','flight__deptime',document.createTextNode(dtime));
            let origShort = el('span', 'flight__origShort', document.createTextNode(oshort));
            let departure = el('div','flight__planDest', departureTime, origShort);
    
            //Durationt
            let time = dtime;
            let flight_time = el('span', 'flight__time', document.createTextNode(`2k 0m`));
            let decoration = el('span', 'flight__dec', document.createTextNode('------------------------------------>'));
            let duration = el('div', 'flight__duration', flight_time, decoration);
    
            let plan = el('div', 'flight__plan', departure, duration, arrival);
    
            //Price 
            let price = info.price.toLocaleString();
            let ticketPrice = el('span', 'ticket__price', document.createTextNode(`${price} kr.`));
            let totalPrice = el('span', 'ticket__total', document.createTextNode(`Total price: ${price} kr.`));
            let book = el('button', 'bookButton', document.createTextNode('Book'));
            let price_info = el('div', 'flight__price', ticketPrice, totalPrice, book);
    
            let use_img = returnImgUrl(info.airline);
            let airline_image = el('img','airline__image')
            airline_image.setAttribute("src",use_img);
            airline_image.setAttribute('alt',`The Logo for ${info.airline}`)
            let flight_airline = el('div','flight__airline',airline_image)
    
            let flight_info = el('div','flight__info',flight_airline, plan, price_info);
            let flight = el('div','flight',flight_info);
            return flight;
            
        }

        function returnImgUrl(airline){
            const airlines = ["Isavia","Air Connect","Ernir", "Play-Air"]
            let img_playair = './img/airlinelogo/playair.png';
            let img_ernir = './img/airlinelogo/ernir.png';
            let img_isavia = './img/airlinelogo/isavia.png'
            let img_airconnect = './img/airlinelogo/airconnect.png'

            let use_img = null;

            if(airline == airlines[0])
                use_img = img_isavia;
            if(airline == airlines[1])
                use_img = img_airconnect;
            if(airline == airlines[2])
                use_img = img_ernir;
            if(airline == airlines[3])
                use_img = img_playair;
            
            return use_img;
        }

        showFlights();


    });