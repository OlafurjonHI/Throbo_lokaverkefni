class Flight {
    /**
     * # þýðir private variable
     */
    #flightId = null;
    #flightNo = null;
    #from = null;
    #to = null;
    #airline = null;
    #departureTime = null;
    #arrivalTime = null;
    #status = null;
    #price = null;
    #totalSeats = null;
    #takenSeats = [];
    #meta = [];
    
    constructor(flightNo,from,to,airline,departureTime,arrivalTime,status,price,totalSeats,takenSeats,flightMeta){
        this.#flightId = Flight.getFlightIdCount();
        this.#flightNo = flightNo;
        this.#from = from;
        this.#to = to;
        this.#airline = airline;
        this.#departureTime = departureTime;
        this.#arrivalTime = arrivalTime;
        this.#status = status;
        this.#price = price;
        this.#totalSeats = this._initializeSeats(totalSeats);
        this._initializeTakenSeats(takenSeats);
        for (const s in flightMeta) {
            this.#meta.push(s);
        }
        Flight.count++;
    }
    _initializeSeats(totalSeats){
        let N = parseInt(totalSeats);
        let seats = [];
        let a="abcdefghijklmnopqrstuvwxyz";
        let seatsplit  = N/100;
        if(N<=100)
            seatsplit = 5;
        for (let i = 0,j = 0, k = 0; i < N; i++,j++) {
            let seat = ""
            if(j % seatsplit == 0)
                j = 0; k++;
            if(j > a.length)
                j = 0;
            seat += a[j];
            if(k<10)
                seat+="0"
            seat += (k);
            seats.push(seat);
        }
        return seats;
    }
    _initializeTakenSeats(taken){
        for (let i = 0; i < taken; i++) {
            this.#takenSeats.push(this.#totalSeats[i]);
        }
    }
    getFlightId(){
        return this.#flightId;
    }
    getFlightNumber(){
        return this.#flightNo;
    }
    getFrom() {
        return this.#from;
    }
    getTo() {
        return this.#to;
    }
    getAirline(){
        return this.#airline;
    }
    getDepartureTime(){
        return this.#departureTime;
    }
    getArrivalTime(){
        return this.#arrivalTime;
    }
    getStatus(){
        return this.#status;
    }
    getPrice(){
        return this.#price;
    }
    getFlightMeta(){
        return this.#meta;
    }
    getTotalSeat(){
        return this.#totalSeats;
    }
    getTotalSeatsCount(){
        return this.#totalSeats.length;
    }
    getTakenSeats(){
        return this.#takenSeats;
    }
    getTotalSeatsTakenCount(){
       return this.#takenSeats.length;
    }
    getTotalRemainingSeatsAvailable(){
        return (this.getTotalSeatsCount() - this.getTotalSeatsTakenCount());
    }
    getNewSeat(count = 1){
            let seats = [];
            const takenSeats = this.getTotalSeatsTakenCount();
            console.log(takenSeats+count )
            
            if(takenSeats+count > this.getTotalSeatsCount()){
                return -1;
            }
            for (let i = takenSeats,j=0; i < takenSeats+count; i++,j++) {
                let seat = this.#totalSeats[i];
                seats[j] = seat;
                this.#takenSeats.push(seat)                
            }
            if(count === 1)
                return seats[0];
            return seats;
    }
    toString() {
        return `FlightNumber: ${this.getFlightNumber()} - Arriving From: ${this.getFrom()} - Arriving to: ${this.getTo()} Airline ${this.getAirline()} AvailableSeats: ${this.getTotalRemainingSeatsAvailable()} Leaves: ${this.getDepartureTime()} Arrives ${this.getArrivalTime()} Status: ${this.getStatus()}`;
    }
    static getFlightIdCount(){
        return Flight.count;
    }

}

Flight.count = 1;
