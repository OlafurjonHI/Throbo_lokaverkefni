function nextInt(x){
    return (Math.round(Math.random() * x))
}
function nextDouble(x,offset = 0){
    return ((Math.random() * x)+offset).toFixed(2)
}
function getRandomDate(min, max) {
    return new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));
}