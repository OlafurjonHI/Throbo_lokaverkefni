document.addEventListener('DOMContentLoaded', () => {
    let tab1 = document.querySelector('#tab1');
    let tab2 = document.querySelector('#tab2');
    let tab3 = document.querySelector('#tab3');
    let tab4 = document.querySelector('#tab4');
    let items = mMan.getPackageInfo();
    let params = initParams();
    let adults = parseInt(params[4][0]);
    let children = parseInt(params[4][1]);
    let personCount = adults + children 
    let roomCount = parseInt(params[4][2])
    let slideIndex = 1;
    let cardcount = 0;
    let nights = parseInt(DaysBetweenDates(params[2],params[3]))
    if(parseInt(nights) === 0)
        nights = 1


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
        items = mMan.getPackageInfo();
        for(let i = 0; i < items.length; i++){
            let package = null;
            let item = items[i];
            console.log(item)
            if(!item){
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
                    cardcount = 0;
                    for(const p of item){
                        console.log(p.getInfoAsObject())
                        package = generatePackageCards(p.getInfoAsObject(),i)
                        package__list.appendChild(package)
                        cardcount++;
                    }
                }
            }
            else{
                package = generatePackageCards(item.getInfoAsObject(),i)
                package__list.appendChild(package)
            }
        }
        initSlides();
       
        content.appendChild(generateTotal())
    }
    function generateTotal(){
        let total = el('span','item__totalPrice', document.createTextNode(`Total Price: ${parseInt(mMan.getTotalPackagePrice(adults,children,roomCount)).toLocaleString()} kr.`))

 
        let cont = el('div','item__totalPackagePrice',total)

        let book = el('span','bookButton',document.createTextNode('Confirm'))
            book.addEventListener('click', ()=> {
                console.log("popup kemur !!!")
                   let popup = createPopUpBook(tab4,`Hello my friend`);
                    let body = document.querySelector('body')
                    body.appendChild(popup)
            })
        let item__book = el('div','item__book',book);
        cont.appendChild(item__book)
        return cont
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
            case 1:
                return document.createTextNode("")
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
        if(!info)
            return;
        let item__contents = el('div','item__content')
        let item = el('div','item', item__contents)
        //Ef þetta eru flights
        if(itemNo === 0 || itemNo === 1){

            let cancel = el('span','item__cancel',document.createTextNode('X'))
            cancel.addEventListener('click', ()=> {
                if(itemNo === 0){
                    mMan.addFlightToPackage(null)
                    showPackage()
                }
                if(itemNo === 1){
                    mMan.addFlightBackToPackage(null)
                    showPackage();
                }
            })
            item__contents.appendChild(cancel)
            //Departure Time
            let item__subtext__date = el('span','item__subtext',document.createTextNode('Date'));
            let item__depTime__date = el('h3','item__text',document.createTextNode(info.departureTime.toLocaleDateString()))
            let item__Bla11 = el('div','item__cont',item__subtext__date, item__depTime__date);
            let item__subtext__time = el('span','item__subtext',document.createTextNode('Departure:'));
            let item__depTime__time = el('h3','item__text',document.createTextNode(info.departureTime.toLocaleTimeString()))
            let item__Bla22 = el('div','item__cont',item__subtext__time, item__depTime__time);
           // let item__category3 = el('div','item__category',item__subtext__date,item__depTime__date,item__subtext__time,item__depTime__time)
           let item__category3 = el('div','item__category',item__Bla11, item__Bla22) 
           item__category3.classList.add('item__datetime')

            //Flight To/From
            let item__subtextFrom_To = el('span','item__subtext',document.createTextNode('Flight Origin:'))
            let item__From_To = el('h3','item__text',document.createTextNode((info.from).split(' ')[1].substring(1,4)))
            let item__Bla1 = el('div','item__cont',item__subtextFrom_To, item__From_To);
            let item__subtextTo_From = el('span','item__subtext',document.createTextNode('Flight Destination:'))
            let item__To_From = el('h3','item__text',document.createTextNode((info.to).split(' ')[1].substring(1,4)))
            let item__Bla2 = el('div','item__cont',item__subtextTo_From, item__To_From);
            let item__category2 = el('div','item__category',item__Bla1, item__Bla2)

            //Flight number
            let item__subtext__caption = el('span','item__subtext',document.createTextNode('Airline:'))
            let img = returnImgUrl(info.airline);
            let item__picture = el('img','item__picture')
            item__picture.setAttribute('src',img);
            item__picture.setAttribute('alt',`Image of the ${info.airline} logo`)
            let item__subtext = el('span','item__subtext',document.createTextNode('Flight Number: '))
            let item__text = el('h3','item__text',document.createTextNode(info.flightNo))
            
            let item__Bla10 = el('div','item__cont',item__subtext,item__text );
            let item__Bla20 = el('div','item__cont',item__subtext__caption,item__picture );
            let item__category = el('div','item__category', item__Bla10, item__Bla20)

            let item__info = el('div','item__info',item__category,item__category2,item__category3)
            let item__headline =  (itemNo === 0) ? el('h1','item__headline',document.createTextNode('Outbound Flight')) : el('h1','item__headline',document.createTextNode('Return Flight'));
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
            let quantity = el('span','item__quantity',document.createTextNode(`Flight Tickets x ${personCount}`))
            let priceper = el('span','item__perprice',document.createTextNode(`Price per ticket: ${info.price.toLocaleString()} kr`))
            let total = el('span',`item__total`,document.createTextNode(`Total: ${(personCount * parseInt(info.price)).toLocaleString()} kr`))
            let summary = el('div','item__summary',quantity,priceper,total);
            item.appendChild(summary)
            
        }

        if(itemNo === 2){
            let cancel = el('span','item__cancel',document.createTextNode('X'))
            cancel.addEventListener('click', ()=> {
                    mMan.addHotelToPackage(null)
                    showPackage()
            })
            item__contents.appendChild(cancel)
            //Hotel Name
            // let item__subtext = el('span','item__subtext',document.createTextNode('Hotelname: '))
            // let use_img = returnImgUrlHote(info.stars);
            let use_img = './img/hotelimage/5-star/hotel15.jpg'
            let hotel_img = el('img', 'item__hotelPicture');
            hotel_img.setAttribute('src', use_img);
            hotel_img.setAttribute('alt', `The image og ${info.name}`);
            let hotel_image_parent = el('div', 'item__category', hotel_img);
            
            let item__text = el('h2','item__text',document.createTextNode(info.name))
            let item__category = el('div','item__category', item__text)
            
            let roomDescript = el('span','item__subtext',document.createTextNode('Rooms: '))
            let roomAmount = el('h3','item__text',document.createTextNode(roomCount))
            let room__info = el('div','item__cont',roomDescript, roomAmount );
            let hotelRooms = el('div','item__category', room__info);

            let item__info = el('div','item__info',item__category);
            let item__headline = el('h1','item__headline',document.createTextNode('Hotel'));
            item__contents.appendChild(item__headline);
            item__contents.appendChild(hotel_image_parent);
            item__contents.appendChild(item__info);
            item__contents.appendChild(hotelRooms);


            let quantity = el('span','item__quantity',document.createTextNode(`Rooms x${roomCount},Nights x${nights}`))
            let priceper = el('span','item__perprice',document.createTextNode(`Price per room: ${info.price.toLocaleString()} kr`))
            let total = el('span',`item__total`,document.createTextNode(`Total: ${(nights * roomCount * parseInt(info.price)).toLocaleString()} kr`))
            let summary = el('div','item__summary',quantity,priceper,total);
            // item__contents.appendChild(summary)

            let hotelContainer = el('div', 'item__container', item__contents, summary);
            item.appendChild(hotelContainer);
        }
        if(itemNo === 3){
            let cancel = el('span','item__cancel',document.createTextNode('X'))
            cancel.addEventListener('click', ()=> {
                if(itemNo === 3){
                    mMan.removeTripFromPackage(info.id)
                    console.log(mMan.getPackageInfo())
                    showPackage()
                }
            })
            //Trip name
            // let item__subtext = el('span','item__subtext',document.createTextNode('Trip Title: '))
            let item__text = el('h2','item__text',document.createTextNode(info.title))
            let item__category = el('div','item__category', item__text)

            let item__info = el('div','item__info',item__category)
            let item__headline = el('h1','item__headline',document.createTextNode('Trip'));

            let tripDate = el('span','item__subtext',document.createTextNode('Date:'));
            let getTripDate = el('h3','item__text',document.createTextNode(info.date.toLocaleDateString()));
            let tripItemDate = el('div','item__cont',tripDate, getTripDate);
            let tripTime = el('span','item__subtext',document.createTextNode('Time:'));
            let getTripTime = el('h3','item__text',document.createTextNode(info.timeStart));
            let tripItemTime = el('div','item__cont',tripTime, getTripTime);
            let tripDur = el('span','item__subtext',document.createTextNode('Duration:'));
            let getTripDur = el('h3','item__text',document.createTextNode(`${info.duration} hours`));
            let tripItemDur = el('div','item__cont',tripDur, getTripDur);
            let trip = el('div','item__cont',tripItemDate, tripItemTime, tripItemDur);


            let right = el('i','control__right',document.createTextNode(' '));
            right.classList.add('fas')
            right.classList.add('fa-arrow-circle-right')
            
            let middle = el('span','control__midle',document.createTextNode(`${cardcount+1}/${mMan.getPackageInfo()[3].length}`))
            let left = el('span','control__left',document.createTextNode(' '))
            left.classList.add('fas')
            left.classList.add('fa-arrow-circle-left')
            
            let controls = el('div','item__controls',left,middle,right)
            let slide = el('div','item__slide',controls, cancel)
            slide.classList.add('trip__item')
            item__contents.appendChild(slide)
            item__contents.appendChild(item__headline)
            item__contents.appendChild(item__info);
            item__contents.appendChild(trip);
            let quantity = el('span','item__quantity',document.createTextNode(`Tickets x ${personCount}`))
            let priceper = el('span','item__perprice',document.createTextNode(`Price per ticket: ${info.price.toLocaleString()} kr`))
            let total = el('span',`item__total`,document.createTextNode(`Total: ${(personCount * parseInt(info.price)).toLocaleString()} kr`))
            let summary = el('div','item__summary',quantity,priceper,total);

            let container = el('div', 'item__container', item__contents, summary);
            item.appendChild(container);
        }
        
        return item;
    }

    function initSlides(){
        let n = mMan.getPackageInfo()[3].length;
        let slides = document.querySelectorAll('.trip__item');
        let parents = []
        for(let s of slides){
            parents.push(s.parentNode.parentNode.parentNode)
        }
        for(let p of parents){
            p.classList.add('item__hidden')
        }
        let rights = document.querySelectorAll('.control__right');
        let lefts = document.querySelectorAll('.control__left');
        for(let i = 0; i < rights.length; i++){
            rights[i].addEventListener('click',()=>{
                slideTrips(1,parents)
            });
            lefts[i].addEventListener('click',()=>{
                slideTrips(-1,parents)
            });
        }
        if(parents[0])
            parents[0].classList.remove('item__hidden')
    }       

    function slideTrips(dir,slides){
        let n = mMan.getPackageInfo()[3].length;
        for(let p of slides){
            p.classList.add('item__hidden')
        }
        if(dir < 0)
            slideIndex--;
        if(dir > 0)
            slideIndex++;
        if(slideIndex < 1)
            slideIndex = n
        if(slideIndex > n)
            slideIndex = 1;    
        slides[slideIndex-1].classList.remove('item__hidden')

    }
    

});
