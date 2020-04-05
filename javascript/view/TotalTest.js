document.addEventListener('DOMContentLoaded', () => {
    let mMan = new MainManager(50);
    let caption = null;
    let values = [];
    const form = document.querySelector('.search__form');
    showFlights(mMan.getAllHotels());
    initButtons();

    
    form.addEventListener('submit', ()=> {
        submitSearch(event);
        keepInputs(values);
    }); 
    
    function initSearchOptions(data){
        if(data.length === 0)
            return
        empty(form)

        let keys = Object.keys(data[0].getInfoAsObject());
        let values = Object.values(data[0].getInfoAsObject());
        for(let i = 1 ; i < values.length; i++){
            let label = el('label','searchLabel');
            label.setAttribute("for",keys[i]);
            label.textContent = capitalize(keys[i])+":";
            let input = el('input','searchInput');
            if(values[i] instanceof Date){
                input.setAttribute('type','Date')
                input.setAttribute('Value',new Date().toLocaleDateString())
                input.setAttribute('min',new Date().toLocaleDateString())
            }
            else
                input.setAttribute('type', 'textbox')
                
            form.appendChild(label);
            label.appendChild(input)
        }
        let submit = el('input','form__submit');
        submit.setAttribute('type','submit');
        submit.setAttribute('value','Search')
        form.appendChild(submit)
    }
    
    function submitSearch(e){
        e.preventDefault();
        if(caption === null){
            caption = document.querySelector('.caption');
        
        }
        let criteria = [];
        let data = null;
        let inputs = document.querySelectorAll('.searchInput');
        for(let inp of inputs){
            criteria.push(inp.value.trim())
        }
        if(caption.textContent.toLowerCase().includes('flight')){
            data = mMan.getFilteredFlights(criteria);
        }
        generateTableWithData(data);  
        initSearchOptions(data);
        values = []
        for(let i = 0; i < criteria.length; i++){
            values.push(criteria[i])
        }
    }

    function keepInputs(values){
        let inputs = document.querySelectorAll('.searchInput');
        for(let i = 0; i < values.length; i++){
            inputs[i].value = values[i]
        }
    }

    function showFlights(){
        let data = mMan.getAllFlights();
        generateTableWithData(data);  
        initSearchOptions(data);
    }    
    function showHotels(){
        let data = mMan.getAllHotels();
        generateTableWithData(data);  
        initSearchOptions(data);
    }
        
    function showTrips(){
        let data = mMan.getAllTrips();
        generateTableWithData(data);  
        initSearchOptions(data);
    }
    function initButtons(){
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
    }

    function generateTableWithData(data){
        let parent = document.querySelector(".data");
        empty(parent)
        console.log(data)
        if(data.length === 0){
            parent.appendChild(el('h1','message',"No Data Available"))
            return;
        }
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
        parent.appendChild(table);

    }
});