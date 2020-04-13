document.addEventListener('DOMContentLoaded', () => {
    let tab1 = document.querySelector('#tab1');
    let tab2 = document.querySelector('#tab2');
    let tab3 = document.querySelector('#tab3');
    let tab4 = document.querySelector('#tab4');
    let data = mMan.getPackageInfo();

    /**
     * criteria[0] = Title - Nóg að hafa hluttstreng
     * criteria[1] = Date - dagsetning á strengjaformi
     * criteria[2] = TimeStart -  Tímasetning á strengjaformi
     * criteria[3] = Duration -  skilar <= x
     * criteria[4] = location - Nót að hafa hlutsstreng
     * criteria[5] = slots - laus pláss skilar >= x 
     * criteria[6] = taken - pláss sem búið er að taka skilar <=x
     * criteria[7] = price  - skilar <= x
     * criteria[8] = meta/keywords - nóg að 1 af metanu passi við eitthvað í keywords
     */




    tab4.addEventListener('click', () => {
        hideCheckBoxes()
        destroyPopUps();
        showPackage();
    });

    function hideCheckBoxes(){
        const filter = document.querySelector('.filter')
        filter.classList.add('filter--hidden')
    }

    function showPackage() {
        let content = document.querySelector("#content");
        empty(content)
        const package__list = el('section', 'package__list');
        const package__row = el('div', 'package__row', package__list);
        const packages = el('div', 'packages', package__row)
        content.appendChild(packages)
        let items = mMan.getPackageInfo();
        for(let i = 0; i < items.length; i++){
            let package = null;
            let item = items[i];
            if(!item){
                console.log("NO ITEM")
                package = generateNoItem(i);
                if(i === 0)
                    i++;
            }
            else{
                package = generatePackageCards(item.getInfoAsObject(),i)
                /* if(i === 1)
                    package = generateFlightBack(items[i].getInfoAsObject());
                if(i === 2)
                    package = generateHotel(items[i].getInfoAsObject());
                if(i === 3)
                    package = generateTrip(items[i].getInfoAsObject());*/
                }
            package__list.appendChild(package)
        }
    }
    function generateNoItem(itemno){
        let itemText = "";
        switch(itemno){
            case 0:
                itemText = "No flights selected";
                break;
            case 0:
                itemText = "No flight back selected";
            case 2:
                itemText = "No hotel selected";
                break;
            case 3:
                itemText = "No Trip Selected";
                break;
        }

        let text =  el('h2','item__noItem',document.createTextNode(itemText))
        let item = el('div','item',text);
        return item;
    }

    function generatePackageCards(info,itemNo) {
        let item__contents = el('div','item__info')
        let item = el('div','item',item__contents)
        //Ef þetta eru flights
        if(itemNo === 0 || itemNo === 1){
            let item__subtext = el('span','item__subtext',document.createTextNode('Flightnumber: '))
            let item__name = el('h2','item__name',document.createTextNode(info.flightNo))
            let item__info = el('div','item__info',item__subtext,item__name)
            let item__headline =  (itemNo === 0) ? el('h1','item__headline',document.createTextNode('Flight Out')) : el('h1','item__headline',document.createTextNode('Flight Back:'));
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
        }

        if(itemNo === 2){
            let item__subtext = el('span','item__subtext',document.createTextNode('Hotelname:'))
            let item__name = el('h2','item__name',document.createTextNode(info.name))
            let item__info = el('div','item__info',item__subtext,item__name)
            let item__headline = el('h1','item__headline',document.createTextNode('Hotel:'));
            item__contents.appendChild(item__info);
        }
        if(itemNo === 3){
            let item__subtext = el('span','item__subtext',document.createTextNode('Trip:'))
            let item__name = el('h2','item__name',document.createTextNode(info.title))
            let item__info = el('div','item__info',item__subtext,item__name)
            item__contents.appendChild(item__info);
        }
        



        return item;

    }



});
