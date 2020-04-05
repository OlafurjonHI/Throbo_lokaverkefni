
class FlightManager {
    #flights = [];
    constructor(n){
        this.#flights = this._getFligthsFromData(n);
    }
    getFlights(){
        return this.#flights;
    }
    searcFlightsByAirline(target){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getAirline().toLowerCase() == target.toLowerCase())
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searcFlightsByFrom(target){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getFrom().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searcFlightsByTo(target){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getTo().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByAtleastXFreeSeats(x){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getTotalRemainingSeatsAvailable()>= x)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByPriceHigher(x){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getPrice() >= x)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByPriceLower(x){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getPrice() <= x)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByExactDate(date){
        let filteredFlights = [];
        let d = Date.parse(date);
        for (const f of this.getFlights()) {
            if(Date.parse(f.getDepartureTime()) === d)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByExactDateAndNewer(date){
        let filteredFlights = [];
        let d = Date.parse(date);
        for (const f of this.getFlights()) {
            if(Date.parse(f.getDepartureTime()) === d)
                filteredFlights.push(f)
            if(Date.parse(f.getDepartureTime()) > d)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByExactDateAndOlder(date){
        let filteredFlights = [];
        let d = Date.parse(date);
        for (const f of this.getFlights()) {
            if(Date.parse(f.getDepartureTime()) === d)
                filteredFlights.push(f)
            if(Date.parse(f.getDepartureTime()) < d)
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByMetaIncludes(m){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            for(let meta of f.getFlightMeta()){
                if(meta.toLowerCase().includes(m.toLowerCase())){
                    filteredFlights.push(meta)
                    continue;
                }
            }
        }
        return filteredFlights;
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
                    flightNumber += digits[nextInt(digits.length-1)];
                else
                    flightNumber += alphabet[nextInt(alphabet.length-1)];
            }
            const from = places[nextInt(places.length-1)];
            let to = places[nextInt(places.length-1)];
            const airline = airlines[nextInt(airlines.length-1)];
            while(to === from)
                to = places[nextInt(places.length-1)];
            const status = statuses[nextInt(statuses.length-1)]
            let departure = getRandomDate(new Date(),new Date("06/01/2020"));
            let arrival = getRandomDate(departure,departure.addHours(nextInt(12)));
            const price = (nextInt(9)+1) * 100;
            const totalSeats = 200+nextInt(800);
            const seatsTaken = nextInt(totalSeats);
            let f = new Flight(flightNumber,from,to,airline,departure,arrival,status,price,totalSeats,seatsTaken,["Fun","Family"]);
            flights.push(f);

        }
        return flights;
    }
}

const places = ["Reykjavík (REY)", "Isafjörður (ISA)", "Akureyri (AKU)","Keflavík (KEF)"];
const statuses = ["Late", "Arrived", "On Time","Bermuda Triangle","Slight Delay"];
const airlines = ["Isavia","Air Connect","Ernir", "Play-Air"]
