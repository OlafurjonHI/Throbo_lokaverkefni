document.addEventListener('DOMContentLoaded', () => {
    let tabs = document.querySelectorAll('.menu__tab'); 
    for(const t of tabs ){
        t.addEventListener('click',() =>{
            initFilters();
        });
    }
    initFilters()
    function initFilters(){
        let active = document.querySelector('.tab__active').textContent
        const filtercontainer = document.querySelector('.filter__keywords');
        empty(filtercontainer);
        let metadata = [];
        if(active.toLowerCase().includes('flight'))
            metadata = getFlightMetaData()
        if(active.toLowerCase().includes('accommodation'))
            metadata = getHotelMetaData ()
        if(active.toLowerCase().includes('trip'))
            metadata = getTripMetaData()
        console.log(active)
        for(const m of metadata){
            let cb = el('input','filter__checkbox')
            cb.setAttribute('type','checkbox')
            let lbl = el('label','filter__label',document.createTextNode(capitalize(m)),cb)
            let pair = el('div','filter__pair',lbl)
            filtercontainer.appendChild(pair)
        }
    }

});