document.addEventListener('DOMContentLoaded', () => {
    const mMan = new MainManager(50)
    showFlights();

    function showFlights(){
        const list = document.querySelector('.flight__list');
        empty(list)
        let data = mMan.getAllFlights();
        for(let d of data){
            let flight = generateFlightCard(d.getInfoAsObject())
            list.appendChild(flight)

        }
    }
    function generateFlightCard(info){
        let flight = el('div','flight');
        
        let number_info = el('span','number__info',document.createTextNode('Flightnumber:'));
        let number = el('h2','number',document.createTextNode(info.flightNo))
        let flight_number = el('div','flight__number',number_info,number)
        
        let dlong = (info.to).split(' ')[0]
        let dshort = (info.to).split(' ')[1].substring(1,4);
        let destShort = el('span','flight__destShort',document.createTextNode(dshort))
        let destLong = el('span','flight__destLong',document.createTextNode(dlong))
        let destination = el('div','flight__destination',destShort,destLong);

        let dTime = info.departureTime.toLocaleString();
        let date = dTime.split(',')[0];
        let time = dTime.split(',')[1];
        let flight_date = el('span','flight__date',document.createTextNode(date))
        let flight_time = el('span','flight__time',document.createTextNode(time))
        let datetime = el('div','flight__datetime',flight_date,flight_time)

        let use_img = returnImgUrl(info.airline);
        let airline_image = el('img','airline__image')
        airline_image.setAttribute("src",use_img);
        airline_image.setAttribute('alt',`The Logo for ${info.airline}`)
        let flight_airline = el('div','flight__airline',airline_image)

        let flight_info = el('div','flight__info',flight_number,destination,datetime,flight_airline)
        flight.appendChild(flight_info);
        return flight;
        
    }

    function returnImgUrl(airline){
        const airlines = ["Isavia","Air Connect","Ernir", "Play-Air"]
        let img_playair = './img/airlinelogo/playair.png';
        let img_ernir = './img/airlinelogo/ernir.png';
        let img_isavia = './img/airlinelogo/isavia.png';
        let img_airconnect = './img/airlinelogo/airconnect.png';

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


});