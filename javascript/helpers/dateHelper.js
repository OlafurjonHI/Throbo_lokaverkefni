Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

function getTodayDateNoClock(){
    let today = new Date()

    return new Date(today.getFullYear(),today.getMonth(),today.getUTCDay(),0,0,0,0);
    
}