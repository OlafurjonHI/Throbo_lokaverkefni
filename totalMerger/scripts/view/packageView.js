document.addEventListener('DOMContentLoaded', () => {
    let tab1 = document.querySelector('#tab1');
    let tab2 = document.querySelector('#tab2');
    let tab3 = document.querySelector('#tab3');
    let tab4 = document.querySelector('#tab4');
    let data = mMan.getPackageInfo();
    let params = initParams();
    let personCount = parseInt(params[4][0]) + parseInt(params[4][1]);
    let roomCount = parseInt(params[4][2])
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
            console.log(item)
            if(!item){
                console.log("NO ITEM")
                package = generateNoItem(i);
                if(i === 0)
                    i++;
                package__list.appendChild(package)
                continue;
            }
            if(Array.isArray(item)){
                if(!item[0]){
                    package = generateNoItem(i);
                    package__list.appendChild(package)
                }
                else {
                    for(const p of item){
                        console.log(p.getInfoAsObject())
                        package = generatePackageCards(p.getInfoAsObject(),i)
                        package__list.appendChild(package)
                    }
                }
            }
            else{
                package = generatePackageCards(item.getInfoAsObject(),i)
                package__list.appendChild(package)
            }

        
        }
    }
    function generateNoItem(itemno){
        let itemText = "";
        let btnText = "";
        let button = el('button','item__button')
        switch(itemno){
            case 0:
                itemText = "No flights selected";
                btnText = "Select Flight"
                button.addEventListener('click',()=>{
                    tab1.click()
                });
                break;
            case 2:
                itemText = "No hotel selected";
                btnText = "Select Hotel"
                button.addEventListener('click',()=>{
                    tab2.click()
                });
                break;
            case 3:
                itemText = "No Trips Selected";
                btnText = "Select Trips"
                button.addEventListener('click',()=>{
                    tab3.click()
                });
                break;
        }

        button.appendChild(document.createTextNode(btnText))
        let text =  el('h2','item__noItem',document.createTextNode(itemText))
        let item = el('div','item',text,button);
        return item;
    }

    function generatePackageCards(info,itemNo) {
        let item__contents = el('div','item__content')
        let item = el('div','item',item__contents)
        //Ef þetta eru flights
        if(itemNo === 0 || itemNo === 1){
            
            //Departure Time
            let item__subtext__date = el('span','item__subtext',document.createTextNode('Date'));
            let item__depTime__date = el('h3','item__text',document.createTextNode(info.departureTime.toLocaleDateString()))
            let item__subtext__time = el('span','item__subtext',document.createTextNode('Time:'));
            let item__depTime__time = el('h3','item__text',document.createTextNode(info.departureTime.toLocaleTimeString()))
            let item__category3 = el('div','item__category',item__subtext__date,item__depTime__date,item__subtext__time,item__depTime__time)
            item__category3.classList.add('item__datetime')

            //Flight To/From
            let item__subtextFrom_To = el('span','item__subtext',document.createTextNode('Flight Origin:'))
            let item__From_To = el('h3','item__text',document.createTextNode((info.from).split(' ')[1].substring(1,4)))
            let item__subtextTo_From = el('span','item__subtext',document.createTextNode('Flight Destination:'))
            let item__To_From = el('h3','item__text',document.createTextNode((info.to).split(' ')[1].substring(1,4)))
            let item__category2 = el('div','item__category',item__subtextFrom_To,item__From_To, item__subtextTo_From,item__To_From)

            //Flight number
            let item__subtext__caption = el('span','item__subtext',document.createTextNode('Airline:'))
            let img = returnImgUrl(info.airline);
            let item__picture = el('img','item__picture')
            item__picture.setAttribute('src',img);
            item__picture.setAttribute('alt',`Image of the ${info.airline} logo`)
            let item__subtext = el('span','item__subtext',document.createTextNode('Flightnumber: '))
            let item__text = el('h3','item__text',document.createTextNode(info.flightNo))
            let item__category = el('div','item__category', item__subtext,item__text,item__subtext__caption,item__picture)

            let item__info = el('div','item__info',item__category,item__category2,item__category3)
            let item__headline =  (itemNo === 0) ? el('h1','item__headline',document.createTextNode('Flight Out')) : el('h1','item__headline',document.createTextNode('Flight Back:'));
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
            let quantity = el('span','item__quantity',document.createTextNode(`Flight Tickets x ${personCount}`))
            let priceper = el('span','item__perprice',document.createTextNode(`Price per ticket: ${info.price.toLocaleString()} kr`))
            let total = el('span',`item__total`,document.createTextNode(`Total: ${(personCount * parseInt(info.price)).toLocaleString()} kr`))
            let summary = el('div','item__summary',quantity,priceper,total);
            item.appendChild(summary)
        }

        if(itemNo === 2){
            
            //Hotel Name
            let item__subtext = el('span','item__subtext',document.createTextNode('Hotelname: '))
            let item__text = el('h2','item__text',document.createTextNode(info.name))
            let item__category = el('div','item__category', item__subtext,item__text)
            
            let item__info = el('div','item__info',item__category)
            let item__headline = el('h1','item__headline',document.createTextNode('Hotel:'));
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
        }
        if(itemNo === 3){

            //Trip name
            let item__subtext = el('span','item__subtext',document.createTextNode('Trip Title: '))
            let item__text = el('h2','item__text',document.createTextNode(info.title))
            let item__category = el('div','item__category', item__subtext,item__text)

            let item__info = el('div','item__info',item__category)
            let item__headline = el('h1','item__headline',document.createTextNode('Trip:'));
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
        }
        return item;

    }
    



});
