class TripManager {
    #trips = [];

    constructor(n) {
        this.#trips = this._getTripsFromData(n);
    }
    getTrips(){
        return this.#trips;
    }

    _getTripsFromData(n) {
        let activities = ['Horseback Riding', "Mountain Climbing", "Extreme Sports", "Deep Diving", "Cave Exploring", "Sightseeing", "Elf Counting","Local Life"]
        let postnumer = getPostNumer();
        let adjectives = getAdjectives();
        let metadata = getTripMetaData();
        let trips = []
        for(let i = 0; i < n; i++){
            
            let title = adjectives[nextInt(adjectives.length-1)];
            title += ` ${activities[nextInt(activities.length-1)]}`
            title = capitalize(title);
            let date = (new Date()).addDays(nextInt(70));
            let timeStart = `${nextInt(23)}:${nextInt(5)*10}`;
            let duration = nextInt(12);
            let location = postnumer[nextInt(postnumer.length-1)];
            let slots = 5 + nextInt(100);
            let taken = nextInt(slots);
            let price = nextDouble(3,2)*50;
            let meta = []
            for(let j = 0; j < nextInt(metadata.lengt-5)+2; j++){
                let m = metadata[nextInt(metadata.length-1)];
                while(meta.includes(m))
                    m = metadata[nextInt(metadata.length-1)];
                meta.push(m)
            }
            let t = new Trip(title,date,timeStart,duration,location,slots,taken,price,meta)
            console.log(t.toString())
            trips.push(t)
        }

        return trips;
    }

}

