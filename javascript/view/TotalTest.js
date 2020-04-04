document.addEventListener('DOMContentLoaded', () => {
    let mMan = new MainManager(50);
    console.log(mMan.getAllHotels()[0].getInfoAsObject())
    showFlights(mMan.getAllHotels());
    const buttons = document.querySelectorAll('.get');
    buttons.forEach(b => {
        b.addEventListener('click',(e) => {
            let t = (e.target.textContent);
            if(t.toLowerCase().includes("flight"))
                showFlights()
            if(t.toLowerCase().includes("hotel"))
                showHotels()
            if(t.toLowerCase().includes("trip"))
                showTrips()
        });
        
    });
    
    function showFlights(){
        let data = mMan.getAllFlights();
        generateTableWithData(data);  
    }    
    function showHotels(){
        let data = mMan.getAllHotels();
        generateTableWithData(data);  
    }
        
    function showTrips(){
        let data = mMan.getAllTrips();
        generateTableWithData(data);  
    }

    function generateTableWithData(data){
        let parent = document.querySelector(".data");
        empty(parent)
        let table = el('table','table');
        
        let firstrow = el('tr','firstrow');
        let keys = Object.keys(data[0].getInfoAsObject());
        let cap = "Tada";
        if(keys[1].toLowerCase().includes('flight'))
            cap = "Flights"
        if(keys[1].toLowerCase().includes('title'))
            cap = "Trips"
        if(keys[1].toLowerCase().includes('name'))
            cap = "Hotels";
        let caption = el('caption','caption',cap)
        table.appendChild(caption)
        let indexOfPrice;
        for(let k of keys){
            if(k.toLowerCase().includes('price'))
                indexOfPrice = keys.indexOf(k);
            let header = el('th','rowHeader');
            header.appendChild(document.createTextNode(capitalize(k)))
            firstrow.appendChild(header);
        }
        table.appendChild(firstrow)
        for(let d of data){
            let values = (Object.values(d.getInfoAsObject()))
            let row = el('tr','tableRow');
            for(let v of values){
                if(v instanceof Date)
                    v = v.toLocaleString();
                if(values.indexOf(v) == indexOfPrice)
                    v+="$"
                let rowItem = el('td','rowItem');
                rowItem.appendChild(document.createTextNode(v));
                row.appendChild(rowItem);
            }
            table.appendChild(row);
        }
        
        console.log(keys)
        parent.appendChild(table);
        console.log(parent)

    }
});