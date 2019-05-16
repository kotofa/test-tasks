function timer() {
    let nowDate = new Date();
    let achiveDate = new Date(2019,04,19); //Задаем дату, к которой будет осуществляться обратный отсчет
    let result = (achiveDate - nowDate)+1000;
    
    let seconds = Math.floor((result/1000)%60);
    let minutes = Math.floor((result/1000/60)%60);
    let hours = Math.floor((result/1000/60/60));
    let days = Math.floor(result/1000/60/60/24);
    if (result < 0) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        days = 0;
    };
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;
    console.log("123")
    return [seconds, minutes, hours, days];
}
window.onload = function() {
    function update(){

    let numb = timer();

    let myHours = document.querySelector("#myHours");
    let myHoursTxt = document.querySelector("#myHoursTxt");
    myHours.textContent = numb[2];
    myHoursTxt.textContent = declOfNum(numb[2],['час','часа','часов']);

    let myMinutes = document.querySelector("#myMinutes");
    let myMinutesTxt = document.querySelector("#myMinutesTxt");
    myMinutes.textContent = numb[1];
    myMinutesTxt.textContent = declOfNum(numb[1],['минута','минуты','минут']);

    let mySeconds = document.querySelector("#mySeconds");
    let mySecondsTxt = document.querySelector("#mySecondsTxt");
    mySeconds.textContent = numb[0];
    mySecondsTxt.textContent = declOfNum(numb[0],['секунда','секунды','секунд']);
    };

    setInterval(update, 1000);
}

    function declOfNum(number, titles)
{
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}