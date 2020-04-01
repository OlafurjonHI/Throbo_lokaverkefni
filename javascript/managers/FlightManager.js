
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
class FlightManager {
    #flights = [];
    constructor(n){
        this.#flights = this._getFligthsFromData(n);
    }
    getFlights(){
        return this.#flights;
    }
    _getFligthsFromData(n){
        let flights = [];
        const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        const digits = "0123456789";
        const places = ["Reykjavík (REY)", "Isafjörður (ISA)", "Akureyri (AKU)","Keflavík (KEF)"];
        const statuses = ["Late", "Arrived", "On Time","Bermuda Triangle","Slight Delay"];
        const airlines = ["Isavia","Air Connect","Ernir", "Play-Air"]
        for(let i = 0; i < n ; i++){
            let flightNumber = "";
            for (let j = 0; j < 5; j++) {
                if(j >= 3)
                    flightNumber += digits[nextInt(digits.length)];
                else
                    flightNumber += alphabet[nextInt(alphabet.length)];
            }
            const from = places[nextInt(places.length)];
            let to = places[nextInt(places.length)];
            const airline = airlines[nextInt(airlines.length)];
            while(to != from)
                to = places[nextInt(places.length)];
            const status = statuses[nextInt(statuses.length)]
            let departure = getRandomDate(new Date("01/04/2020"),new Date());
            let arrival = getRandomDate(departure,departure.addHours(nextInt(12)));
            const price = (nextInt(9)+1) * 100;
            const totalSeats = 200+nextInt(800);
            const seatsTaken = nextInt(totalSeats);
            let f = new Flight(flightNumber,from,to,airline,departure,arrival,price,totalSeats,seatsTaken,["Fun","Family"]);
            flights.push(f);

        }
        return flights;
    }
}
