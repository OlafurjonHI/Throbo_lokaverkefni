document.addEventListener('DOMContentLoaded', () => {
    let mMan = new MainManager(50);
    let captionValue = null;
    let keepVal = [];
    let currentdata = mMan.getAllFlights();
    const form = document.querySelector('.search__form');
    showFlights(currentdata);
    initButtons();

    form.addEventListener('keyup',(e)=>{
        let keycode = e.keyCode;
        if(keycode === 13){
            submitSearch(event);
            keepInputs(keepVal);
        } 
    });
    const bt = document.querySelector('.form__submit');
    bt.addEventListener('click', ()=> {
        submitSearch(event);
        keepInputs(keepVal);
    }); 
    
    function initSearchOptions(data){
        if(data.length === 0)
            return
        empty(form)

        let keys = Object.keys(data[0].getInfoAsObject());
        let values = Object.values(data[0].getInfoAsObject());
        for(let i = 1 ; i < values.length; i++){
            if(keys[i].toLowerCase().includes("arrival")){
                continue;
            }
            let label = el('label','searchLabel');
            label.setAttribute("for",keys[i]);
            label.textContent = capitalize(keys[i])+":";
            let input = el('input','searchInput');
            if(values[i] instanceof Date){
                input.setAttribute('type','Date')
                input.setAttribute('Value',new Date().toLocaleDateString())
                input.setAttribute('min',new Date().toLocaleDateString())
            }
            else if(keys[i].toLowerCase().includes('price')){
                label.textContent += (" ( = or lower than)")
            }
            else
                input.setAttribute('type', 'textbox')
                
            form.appendChild(label);
            label.appendChild(input)
        }
        let submit = el('input','form__submit');
        submit.setAttribute('type','button');
        submit.setAttribute('value','Search')
        submit.addEventListener('click', ()=> {
            submitSearch(event);
            keepInputs(keepVal);
        }); 
        form.appendChild(submit)
    }
    
    function submitSearch(e){
        let caption = null;
        if(captionValue === null){
            caption = document.querySelector('.caption');
            captionValue = caption.textContent;
        }
        let data = null
        let criteria = [];
        let inputs = document.querySelectorAll('.searchInput');
        for(let inp of inputs){
            criteria.push(inp.value.trim())
        }
        if(captionValue.toLowerCase().includes('flight')){
            data = mMan.getFilteredFlights(criteria);
            caption = 'flight'
        }
        if(captionValue.toLowerCase().includes('trip')){
            data = mMan.getFilteredTrips(criteria);
            caption = 'trip'
        }
        if(captionValue.toLowerCase().includes('hotel')){
            data = mMan.getFilteredHotels(criteria);
            caption = 'hotel'
        }
        generateTableWithData(data);  
        initSearchOptions(data);
        keepVal = []
        for(let i = 0; i < criteria.length; i++){
            keepVal.push(criteria[i])
        }
    }

    function keepInputs(values){
        let inputs = document.querySelectorAll('.searchInput');
        for(let i = 0; i < values.length; i++){
            inputs[i].value = values[i]
        }
    }

    function showFlights(){
        currentdata = mMan.getAllFlights();
        generateTableWithData(currentdata);  
        initSearchOptions(currentdata);
    }    
    function showHotels(){
        currentdata = mMan.getAllHotels();
        generateTableWithData(currentdata);  
        initSearchOptions(currentdata);
    }
        
    function showTrips(){
        currentdata = mMan.getAllTrips();
        generateTableWithData(currentdata);  
        initSearchOptions(currentdata);
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
        captionValue = cap;
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
})();