function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function el(type, className, ...children) {
  const element = document.createElement(type);
  if(className) element.classList.add(className);
  // eslint-disable-next-line no-restricted-syntax
  for (let child of children) {
    if (typeof(child) === 'string') {
      element.appendChild(document.createTextNode(child))
    } else if (child) {
      element.appendChild(child)
    }
  }
  return element;
}

function intersection(a,b) { 
  let out = [];
  for(let t of a){
    if(b.includes(t))
      out.push(t);
  }
  return out;
}
async function getTextFromFetch(url) {
  fetch(`${url}`).then((res) => {
    if (!res.ok) {
      throw new Error('Non 200 status');
    }
    return res.text;
  })
}

function tabManager() {
  const menu = document.querySelector('.menu');
  const menu_tabs= document.querySelectorAll('.menu__tab')
  const content = document.getElementById('content')
  if(!menu){
    return;
  }
  for(const tab of menu_tabs) {
    tab.addEventListener('click', (e) => {
      for(const t of menu_tabs){
        t.classList.remove('tab__active');
        content.classList.remove('content__package')
      }
      if(e.target === tab){
        tab.classList.add('tab__active')
        if(tab.getAttribute('id') === "tab4"){
          content.classList.add('content__package')

        }
      }
    });

  }
}
tabManager()

function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return `${hours}H ${minutes}M`
}

function DaysBetweenDates(date1,date2) {
  let duration = Date.parse(date2) - Date.parse(date1);
  hours = Math.floor((duration / (1000 * 60 * 60)));

  return `${hours/24 }`
}
function initParams(){
  let params = []
  let url_string = window.location.href
  const urlParams = new URLSearchParams(url_string)
  let urlgets = url_string.split('?');
  if(urlgets.length === 0)
      return []
  let getsorigin = decodeURIComponent(urlgets[1]).replace('origin=','')
  let getsdest = decodeURIComponent(urlgets[2]).replace('dest=','')
  let sDate = urlgets[3].replace('startDate=','')
  let eDate = urlgets[4].replace('endDate=','')
  let acr = urlgets[5].replace('acr=','')

  params.push(getsorigin);
  params.push(getsdest);
  params.push(sDate);
  params.push(eDate);
  params.push(acr);
  return params;

}

function createPopUp(elementToClick,t){
  destroyPopUps();
  let btn = el('button','popup__button',document.createTextNode('Continue'))
  btn.addEventListener('click',(e) => {
    elementToClick.click();
    destroyPopUps();
  })

  //let text = el('span','popup__text',document.createTextNode(`${t}`))
  let headline = el('h2','popup__headline',document.createTextNode(`Added ${t} to package`)) 
  let content = el('div','popup__content',headline,btn)
  let container = el('div','popup',content)
  return container;
}

function createPopUpBook(elementToClick,t){
  destroyPopUps();
  let btn = el('button','popup__button',document.createTextNode('Continue'))
  btn.addEventListener('click',(e) => {
    elementToClick.click();
    destroyPopUps();
    window.location.href = "./index.html"
  })

  //let text = el('span','popup__text',document.createTextNode(`${t}`))
  let headline = el('h2','popup__headline',document.createTextNode(`Congratulation`)) 
  let content = el('div','popup__content',headline,btn)
  let container = el('div','popup',content)
  return container;
}
function createPopUp2(elementToClick,t){
  destroyPopUps();
  let btn = el('button','popup__button',document.createTextNode('Complete Package'))
  btn.addEventListener('click',(e) => {
    elementToClick.click();
    destroyPopUps();
  })
  let btn2 = el('button','popup__button',document.createTextNode('Add More Trips'))
  btn2.addEventListener('click',(e) => {
    
    destroyPopUps();
  })

  //let text = el('span','popup__text',document.createTextNode(`${t}`))
  let headline = el('h2','popup__headline',document.createTextNode(`${t} package`)) 
  let content = el('div','popup__content',headline,btn2,btn)
  let container = el('div','popup',content)
  document.querySelector('body').appendChild(container)
}


function createPopUpWarning(elementToClick,text){
  destroyPopUps();
  let btn = el('button','popup__button',document.createTextNode('Continue'))
  btn.addEventListener('click',(e) => {
    elementToClick.click();
    destroyPopUps();
  })

  //let text = el('span','popup__text',document.createTextNode(`${t}`))
  let headline = el('h2','popup__headline',document.createTextNode(`${text}`)) 
  let content = el('div','popup__content',headline,btn)
  let container = el('div','popup',content)
  return container;
}
function initMetaData() {
  let filters = document.querySelectorAll('.filter__label');
  let meta = []
  for (let m of filters) {
      if (m.children[0].checked) {
          meta.push(m.textContent)
      }
  }
  return meta;
}
function destroyPopUps(){
  let popups = document.querySelectorAll('.popup');
  if(popups.length === 0)
    return;
  for(const p of popups){
    p.parentNode.removeChild(p)
  }
}
function returnImgUrl(airline) {
  const airlines = ["Isavia", "Air Connect", "Ernir", "Play-Air"]
  let img_playair = './img/airlinelogo/playair.png';
  let img_ernir = './img/airlinelogo/ernir.png';
  let img_isavia = './img/airlinelogo/isavia.png'
  let img_airconnect = './img/airlinelogo/airconnect.png'

  let use_img = null;

  if (airline == airlines[0])
      use_img = img_isavia;
  if (airline == airlines[1])
      use_img = img_airconnect;
  if (airline == airlines[2])
      use_img = img_ernir;
  if (airline == airlines[3])
      use_img = img_playair;

  return use_img;
}
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
  if(!window.location.href.toLowerCase().includes('flight.html'))
    window.location.href = `./flight.html?origin=${origin}?dest=${dest}?startDate=${startDate}?endDate=${endDate}?acr=${acr}`
  else
    return [origin,dest,startDate,endDate,acr];
 
}

function sortArrByPriceLowestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).price)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).price)
          if(o < o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByPriceHighestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).price)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).price)
          if(o > o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByStarsLowestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).stars)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).stars)
          if(o < o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByStarsHighestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).stars)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).stars)
          if(o > o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByRatingLowestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseFloat((arr[i].getInfoAsObject()).stars)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseFloat((arr[j].getInfoAsObject()).stars)
          if(o < o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByRatingHighestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseFloat((arr[i].getInfoAsObject()).stars)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseFloat((arr[j].getInfoAsObject()).stars)
          if(o > o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByDurationLowestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).duration)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).duration)
          if(o < o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}
function sortArrByDurationHighestFirst(arr){
  for(let i = 0; i < arr.length; i++){
      let o = parseInt((arr[i].getInfoAsObject()).duration)
      for(let j = 0; j < arr.length; j++){
          let o2 = parseInt((arr[j].getInfoAsObject()).duration)
          if(o > o2){
              let temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              continue
          }
      }
  }
}

function initTinyPicker(params){
  let or = params[0]
  console.log(or)
  let de = params[1]
  let sd = params[2]
  let ed = params[3]
  let a = params[4][0]
  let c = params[4][1]
  let r = params[4][2]

  let origin = document.querySelector('#origin');
  let children = origin.childNodes;
  let dest = document.querySelector('#dest');
  let children2 = dest.childNodes;
  let startDate = document.querySelector('#startDate')
  let endDate = document.querySelector('#endDate')
  let displays = document.querySelectorAll('.display')
  console.log(children)
  for(let i = 1; i < children.length; i++){
    console.log(children[i].value)
    if(children[i].value == or){
      console.log("SUP!")
      origin.selectedIndex = i-1
    }
  }
  for(let i = 1; i < children2.length; i++){
    console.log(children2[i].value)
    if(children[i].value == de){
      console.log("SUP!")
      dest.selectedIndex = i-1
    }
  }
  


  startDate.value = sd
  startDate.setAttribute('date',Date.parse(sd))
  endDate.value = ed
  endDate.setAttribute('date',Date.parse(ed))
  displays[0].textContent = (parseInt(a) > 1) ?`${a} adults` :`${a} adult`;
  displays[1].textContent = (parseInt(c) > 1) ?`${c} children` :`${c} child`;
  displays[2].textContent = (parseInt(r) > 1) ?`${r} rooms` :`${c} room`;
}

