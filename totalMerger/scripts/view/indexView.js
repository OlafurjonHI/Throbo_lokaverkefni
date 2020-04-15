document.addEventListener('DOMContentLoaded', () => {
    let url = "scripts/extras/postnumer.txt";
    let postnumer = 0;
    const searchButton = document.querySelector('.searchButton');

    searchButton.addEventListener('click',()=>{
        gatherGetParams();
    });



    loadData(url)
    async function loadData(url) {
        await fetch(url).then((res)=>{
            return res.text().then((text)=>{
                let locations = getLocation(text);
                initOptions(locations);
                if(window.location.href.toLowerCase().includes('flight.html'))
                    initTinyPicker(initParams())
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