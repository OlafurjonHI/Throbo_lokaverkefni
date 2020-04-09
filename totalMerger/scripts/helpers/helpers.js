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
  console.log(menu_tabs)
  for(const tab of menu_tabs) {
    tab.addEventListener('click', (e) => {

    });
  }

}
function selectTab(tabIndex) {
  //Hide All Tabs

  // document.getElementById('tab4Content').style.display="none";
  document.getElementById('tab1').setAttribute("style", "background-color: white;");
  document.getElementById('tab2').setAttribute("style", "background-color: white;");
  document.getElementById('tab3').setAttribute("style", "background-color: white;");
  // document.getElementById('tab4').setAttribute("style", "background-color: white;");
  
  //Show the Selected Tab
  document.getElementById('tab' + tabIndex + 'Content').style.display="flex";  
  document.getElementById('tab' + tabIndex).setAttribute("style", "background-color: #F4976C;");
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
