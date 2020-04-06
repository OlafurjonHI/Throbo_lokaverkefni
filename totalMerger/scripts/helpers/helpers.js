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

