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
  if(!menu){
    return;
  }
  for(const tab of menu_tabs) {
    tab.addEventListener('click', (e) => {
      for(const t of menu_tabs){
        t.classList.remove('tab__active');
      }
      if(e.target === tab){
        tab.classList.add('tab__active')
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

function initParams(){
  let params = []
  let url_string = window.location.href
  const urlParams = new URLSearchParams(url_string)
  let urlgets = url_string.split('?');
  if(urlgets.length === 0)
      return []
  let gets = decodeURIComponent(urlgets[1]).replace('place=','')
  let sDate = urlgets[2].replace('startDate=','')
  let eDate = urlgets[3].replace('endDate=','')
  let acr = urlgets[4].replace('acr=','')

  params.push(gets);
  params.push(sDate);
  params.push(eDate);
  params.push(acr);
  return params;

}

function createPopUp(elementToClick,t){
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
function destroyPopUps(){
  let popups = document.querySelectorAll('.popup');
  if(popups.length === 0)
    return;
  for(const p of popups){
    p.parentNode.removeChild(p)
  }
}