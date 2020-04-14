
class FlightManager {
    #flights = [];
    #datagenerator = [];
    constructor(){
        try{
            //this.#flights = this._getFlightsFromText();
            this.#flights = this._getFligthsFromData(200);
        }
        catch{
            this.#flights = this._getFligthsFromData(100);
            console.log("data")
        }
        
    }
    getFlights(){
        return this.#flights;
    }
    getFlightById(id){
        for(const f of this.getFlights())
            if(f.getFlightId() == id)
                return f;
    }
    searchFlightsByFlightNo(target) {
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getFlightNumber().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByAirline(target){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getAirline().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByFrom(target){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getFrom().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    searchFlightsByTo(target){
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
    searchFlightsByTotalSeats(x){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getTotalSeatsCount()>= x)
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
    searchFlightsByMetaIncludes(mm){
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            let meta = f.getFlightMeta()
            let expected = mm.length;
            let actual = 0;
            for(let m of mm){
                if(meta.includes(m.toLowerCase()))
                    actual++;
            }
            if(actual === expected)
                filteredFlights.push(f)   
        }
        return filteredFlights;
    }
    
    searchFlighTsByStatus(target) {
        let filteredFlights = [];
        for (const f of this.getFlights()) {
            if(f.getStatus().toLowerCase().includes(target.toLowerCase()))
                filteredFlights.push(f)
        }
        return filteredFlights;
    }
    _getDataGenerator(){
        return this.#datagenerator
    }
    _getFligthsFromData(n){
        let flights = [];
        const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        const flightmetadata = getFlightMetaData();
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
            let g = (new Date(departure)).addHours(nextInt(10)+1)
            let arrival = g.addMinutes(nextInt(59))
            const price = (nextInt(9)+5) * 5500;
            const totalSeats = 200+nextInt(800);
            const seatsTaken = nextInt(totalSeats);
            let meta = [];
            for(let j = 0; j < nextInt(4)+2; j++){
                let m = flightmetadata[nextInt(flightmetadata.length-1)]
                while(meta.includes(m))
                    m = flightmetadata[nextInt(flightmetadata.length-1)]
                meta.push(m)
            }
            this.#datagenerator.push(`${flightNumber};${from};${to};${airline};${departure};${arrival};${status};${price};${totalSeats};${seatsTaken};${meta}|`)
            let f = new Flight(flightNumber,from,to,airline,departure,arrival,status,price,totalSeats,seatsTaken,meta);
            flights.push(f);

        }
        return flights;
    }
    _getFlightsFromText(){
        let data = getSavedFlights();
        let flights = []
        let flightstrings = data.split('|');
        for(const flightString of flightstrings){
            let fi = flightString.split(';');
            if(fi.length < 11)
                continue
            let fNo = fi[0]
            let from = fi[1]
            let to = fi[2]
            let airline = fi[3];
            let departure = fi[4];
            let arrival = fi[5];
            let status = fi[6];
            let price = fi[7];
            let totalSeats = fi[8]
            let seatsTaken = fi[9]
            let meta = fi[10].split(',');
            let f = new Flight(fNo,from,to,airline,new Date(Date.parse(departure)),new Date(Date.parse(arrival)),status,parseInt(price),totalSeats,seatsTaken,meta);
            flights.push(f);
        }
        return flights;
    }
}
/*let fMan = new FlightManager();
let help = document.querySelector('.datahelp');
if(help){
    for(const s of fMan._getDataGenerator()){
        help.appendChild(document.createTextNode(s))
    }
}*/