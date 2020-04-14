class TripManager {
    #trips = [];

    constructor(n) {
        this.#trips = this._getTripsFromData(n);
    }
    getTrips(){
        return this.#trips;
    }
    getTripsById(id){
        for(const t of this.getTrips())
            if(t.getId() == id)
                return t;
    }
    searchTripsByTitle(substring){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getTitle().toLowerCase().includes(substring))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDate(date) {
        let filteredTrips = [];
        let d = Date.parse(date);
        for(const t of this.getTrips())
            if(Date.parse(t.getDate()) === d)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDatesBetween(date1,date2) {
        let filteredTrips = [];
        let d = Date.parse(date1);
        let d2 = Date.parse(date2);
        for(const t of this.getTrips())
            if(Date.parse(t.getDate()) >= d && Date.parse(t.getDate()) <= d2 )
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDurationLessAnd(h){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getDuration() <= h)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDurationMoreAnd(h){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getDuration() >= h)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByLocation(loc) {
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getLocation().toLowerCase().includes(loc.toLowerCase()))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsBySlots(slots){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(parseInt(t.getSlots()) >= parseInt(slots))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByTaken(taken) {
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(parseInt(t.getSlots()) <= parseInt(taken))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByPriceLowerAnd(p){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getPrice() <= p)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByPriceHigherAnd(p){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getPrice() >= p)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByMetaIncludes(mm){
        let filteredTrips = [];
        for (const t of this.getTrips()) {
            let meta = t.getMeta();
            let expected = mm.length;
            let actual = 0;
            for(let m of mm){
                if(meta.includes(m.toLowerCase()))
                    actual++;
            }
            if(actual === expected)
                filteredTrips.push(t)
        }
        return filteredTrips;
    }
    _getTripsFromData(n) {
        let activities = ['Horseback Riding', "Mountain Climbing", "Extreme Sports", "Deep Diving", "Cave Exploring", "Sight-seeing", "Elf Counting","Local Life"]
        let postnumer = getPostNumer();
        let adjectives = getAdjectives();
        let metadata = getTripMetaData();
        let trips = []
        for(let i = 0; i < n; i++){
            
            let title = adjectives[nextInt(adjectives.length-1)];
            title += ` ${activities[nextInt(activities.length-1)]}`
            title = capitalize(title);
            let date = null;
            if(nextInt(1)>0)
                date = (getTodayDateNoClock()).addDays(nextInt(70));                
            else
                date = getTodayDateNoClock();
            let timeStart = `${nextInt(23)}:${nextInt(5)*10}`;
            let duration = nextInt(11)+1;
            let location = postnumer[nextInt(postnumer.length-1)];
            let slots = 5 + nextInt(100);
            let taken = nextInt(slots);
            let price = nextDouble(3,2)*1000;
            let meta = []
            for(let j = 0; j < nextInt(5)+2; j++){
                let m = metadata[nextInt(metadata.length-1)];
                while(meta.includes(m))
                    m = metadata[nextInt(metadata.length-1)];
                meta.push(m)
            }
            let t = new Trip(title,date,timeStart,duration,location,slots,taken,price,meta)
            trips.push(t)
        }

        return trips;
    }

}

