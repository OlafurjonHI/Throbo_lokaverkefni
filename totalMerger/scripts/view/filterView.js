let sortValue = 0;
document.addEventListener('DOMContentLoaded', () => {
     


   
    function initFilters(){
        let active = document.querySelector('.tab__active').textContent
        const filter = document.querySelector('.filter');
        empty(filter);
        initGroupSelection(active);
        initKeywords(active)

    }
    function initKeywords(active){
        const filter = document.querySelector('.filter');
        let filter__title = el('span','filter__title',document.createTextNode('Filter'))
        filter.appendChild(filter__title)
        let filter__keywords = el('div','filter__keywords')
        filter.appendChild(filter__keywords)
        let metadata = [];
        if(active.toLowerCase().includes('flight'))
            metadata = getFlightMetaData()
        if(active.toLowerCase().includes('accommodation')){
            metadata = getHotelMetaData ()
        }
        if(active.toLowerCase().includes('trip'))
            metadata = getTripMetaData()
        for(const m of metadata){
            let cb = el('input','filter__checkbox')
            cb.setAttribute('type','checkbox')
            let lbl = el('label','filter__label', cb, document.createTextNode(capitalize(m)))
            let pair = el('div','filter__pair',lbl)
            filter__keywords.appendChild(pair)
        }
    }

    function initGroupSelection(active){
        let filter__option2 = el('option','filter__option',document.createTextNode('Price (Highest First)'))
        filter__option2.setAttribute('value',2);
        let filter__option1 = el('option','filter__option',document.createTextNode('Price (Lowest First)'))
        filter__option1.setAttribute('value',1);
        let filter__option0 = el('option','filter__option',document.createTextNode('Default'))
        filter__option0.setAttribute('value',0);
        let filter__select = el('select','filter__inpSelect',filter__option0,filter__option1,filter__option2)
        
        if(active.toLowerCase().includes('accommodation')){
            let filter__option3 = el('option','filter__option',document.createTextNode('Stars (Highest First)'))
            filter__option3.setAttribute('value',3);
            let filter__option4 = el('option','filter__option',document.createTextNode('Stars (Lowest First)'))
            filter__option4.setAttribute('value',4);
            filter__select.appendChild(filter__option3)
            filter__select.appendChild(filter__option4)
            let filter__option5 = el('option','filter__option',document.createTextNode('Rating (Highest First)'))
            filter__option5.setAttribute('value',3);
            let filter__option6 = el('option','filter__option',document.createTextNode('Lowest (Highest First)'))
            filter__option6.setAttribute('value',4);
            filter__select.appendChild(filter__option5)
            filter__select.appendChild(filter__option6)
        }
        if(active.toLowerCase().includes('trip')){
            let filter__option3 = el('option','filter__option',document.createTextNode('Duration (Highest First)'))
            filter__option3.setAttribute('value',3);
            let filter__option4 = el('option','filter__option',document.createTextNode('Duration (Lowest First)'))
            filter__option4.setAttribute('value',4);
            filter__select.appendChild(filter__option3)
            filter__select.appendChild(filter__option4)
            let filter__option5 = el('option','filter__option',document.createTextNode('Date'))
            filter__option5.setAttribute('value',5);
            filter__select.appendChild(filter__option5)
        }

        let filter__options = el('div','filter__options',filter__select)
        let filter__title = el('span','filter__title',document.createTextNode('Sort By'))
        let filter = document.querySelector('.filter');
        
        let sibling = document.querySelector('.filter__title');
        if((filter__select.childNodes).length-1 >= sortValue){
            (filter__select.childNodes)[sortValue].selected = true;
        }
        filter.insertBefore(filter__options,sibling);
        filter.insertBefore(filter__title,filter__options);
        
        
        const filter__option = document.querySelector('.filter__inpSelect');
        filter__option.addEventListener('change',(e)=>{
            sortValue = e.target.value;
            document.querySelector('.tab__active').click()
        });
    }

   
    let tabs = document.querySelectorAll('.menu__tab');
    for(const t of tabs ){
        t.addEventListener('click',() =>{
            if(!t.textContent.toLowerCase().includes('package'))
                initFilters();
        });
    }
    initFilters()

});