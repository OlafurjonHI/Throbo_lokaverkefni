window.onload = function init(){
    console.log("hallo");
    var toggle = document.getElementById("toggle");
    var hide = document.getElementById("hidden");

    toggle.addEventListener("mousedown", function(e){  
        console.log("in");
        hidden.classList.toggle('hide');
    });
}
