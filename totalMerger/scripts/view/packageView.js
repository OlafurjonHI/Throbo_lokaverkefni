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
                package = generatePackageCards()
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
                itemText = "No flights selected"
                break;
            case 2:
                itemText = "No hotel selected";
                break;
            case 3:
                itemText = "No Trip Selected";
                break;
        }

        let text =  el('h2','item__NoItem',document.createTextNode(itemText))
        let item = el('div','item',text);
        return item;
    }

    function generatePackageCards(info) {
        let item = el('div','item')


        return item;

    }



});
