window.onload = function init(){
    console.log("hallo");
    // var parent = document.getElementsByClassName('popUpGuests');
    // var minus = document.getElementsByClassName('minus')
    // var id = document.querySelector('.minus').id;
    // var plus = document.getElementsByClassName("plus");
 
   // // var adultsSize = minus.nextSibling.innerHTML;
    const items = document.querySelector('.popUpGuests');
    var displaySize = document.getElementById("display");
    var toggle = document.getElementById("toggle");
    var hide = document.getElementById("hidden");


    for(let item of items.querySelectorAll('.choseGuest')){
        const minus = item.querySelector('.minus');
        minus.addEventListener('click', minusSize);

        const plus = item.querySelector('.plus');
        plus.addEventListener('click', addSize);;
    }

    toggle.addEventListener("mousedown", function(e){  
        hidden.classList.toggle('hide');
    });

    // parent[0].addEventListener('mousedown', function(e){
    //     var minus = document.getElementsByClassName('minus')
    //     var id = document.querySelector('.minus').id;

    //     minus[id].addEventListener("mousedown", function(e){
    //         console.log("hello?");
    //         console.log(id);
    //         console.log(minus[id].nextElementSibling.innerHTML);
    //         minus[id].nextElementSibling.innerHTML = parseInt(minus[id].nextElementSibling.innerHTML) - 1;
    //     });
    // });
}

function minusSize(e){
    if(e.target.nextElementSibling.innerHTML > 0)
    e.target.nextElementSibling.innerHTML = parseInt(e.target.nextElementSibling.innerHTML) - 1;
    var display = document.getElementsByClassName('display')[e.target.id];
    switch(e.target.id){
        case '0': if(e.target.nextElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.nextElementSibling.innerHTML + " adults";
                  } else display.innerHTML = e.target.nextElementSibling.innerHTML + " adult";
                break;
        case '1': if(e.target.nextElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.nextElementSibling.innerHTML + " children";
                  } else display.innerHTML = e.target.nextElementSibling.innerHTML + " child";
                break;
        case '2': if(e.target.nextElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.nextElementSibling.innerHTML + " rooms";
                  } else display.innerHTML = e.target.nextElementSibling.innerHTML + " room";
                break;
    }
}

function addSize(e){
    e.target.previousElementSibling.innerHTML = parseInt(e.target.previousElementSibling.innerHTML) + 1;
    var display = document.getElementsByClassName('display')[e.target.id];
    display.innerHTML = e.target.previousElementSibling.innerHTML + " adults";
    switch(e.target.id){
        case '0':   if(e.target.previousElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.previousElementSibling.innerHTML + " adults";
                    } else display.innerHTML = e.target.previousElementSibling.innerHTML + " adult";
                    break;
        case '1':   if(e.target.previousElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.previousElementSibling.innerHTML + " children";
                    } else display.innerHTML = e.target.previousElementSibling.innerHTML + " child";
                    break;
        case '2':   if(e.target.previousElementSibling.innerHTML != '1'){
                        display.innerHTML = e.target.previousElementSibling.innerHTML + " rooms";
                    } else display.innerHTML = e.target.previousElementSibling.innerHTML + " room";
                    break;
    }
}