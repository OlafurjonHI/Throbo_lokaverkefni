new TinyPicker({
    firstBox:document.getElementById(''),
    startDate: new Date('03/20/2020'),
    months: 2,
    days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    local: 'en-US',
    allowPast: true,
    success: function(s, e){ alert(s + ' ' + e); }
}).init();
new TinyPicker({
    firstBox:document.getElementById('checkIn'),
    startDate: new Date('06/16/2020'),
    endDate: new Date('07/04/2020'),
    lastBox: document.getElementById('checkOut'),
    months: 3,
    days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    local: 'en-US',
    success: function(s, e){ alert(s + ' ' + e); },
    err: function(){alert('err');}
}).init();