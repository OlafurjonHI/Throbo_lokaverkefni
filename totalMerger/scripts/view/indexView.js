document.addEventListener('DOMContentLoaded', () => {
    let url = "scripts/extras/postnumer.txt";
    let postnumer = 0;
    const searchButton = document.querySelector('.searchButton');

    searchButton.addEventListener('click',(e)=> {
        gatherGetParams();
    });

    function gatherGetParams(){
        let select = document.querySelector('#origin');
        let origin = select.value;
        let select2 = document.querySelector('#dest');
        let dest =  select2.value;
        let picker1 = document.querySelector('#startDate');
        let startDate = picker1.value
        let picker2 = document.querySelector('#endDate');
        let endDate = picker2.value
        let guests = document.querySelector('.guests');
        let acr = "";
        for(let n of guests.childNodes){
            if(n.tagName){
            let text = n.innerText;
            if(text.length > 1){
                acr += text.split(' ')[0];
            }
        }
        }
        window.location.href = `./flight.html?origin=${origin}?dest=${dest}?startDate=${startDate}?endDate=${endDate}?acr=${acr}`
       
    }

    loadData(url)
    async function loadData(url) {
        await fetch(url).then((res)=>{
            return res.text().then((text)=>{
                let locations = getLocation(text);
                initOptions(locations);
            });
        })
    };

    function getLocation(text){
        let loc = text.split(';');
        let locations = [];
        for(let l of loc){
            let s = l.split(',');
            let location = s[s.length-1].trim()
            if(!locations.includes(location) && location !== "")
                locations.push(location)
        }
        return locations;
    }

    function initOptions(options){
        const place = document.querySelectorAll('.place');
        empty(place);
        for(let o of options){
            let opt = el('option','place__option');
            opt.setAttribute('value',o)
            opt.appendChild(document.createTextNode(o))
            place.forEach(place => {
                let opt2 = opt.cloneNode(true)
                place.appendChild(opt2)
            });
        }
    }
});