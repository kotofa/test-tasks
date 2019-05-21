let realJsonData; /// массив из ajax-запроса в глобальной области в-ти
function getAjaxJson(){
	let req = new XMLHttpRequest();
	req.onload = function(){
		let jsonResp = req.response;
		realJsonData = JSON.parse(jsonResp);
        getContent(realJsonData.apartments,0,12);		
	};
	req.open("GET", "js/data.json", true); 
    req.send();
};

let numbOfCards = null;///число карточек на странице в глобальной обл. в-ти
let numbOfCards2 = null;

function getContent(arr,numb1,numb2){
    document.querySelector(".content__cards-wrapper").innerHTML = "";
    let numbOfAprtm = document.querySelector("#numbOfAprtm");
    numbOfAprtm.textContent = arr.length
    let arrCopy = arr.slice(0,numb2);
    arrCopy.forEach((item) => {
        let myClass;
        if(item.status=="Свободно"){
            myClass = "card--available";
        }; 
        if (item.status=="Забронировано"){
            myClass = "card--reserve"
        }; 
        if (item.status=="Продано"){
            myClass = "card--sold"
        };
        let redClass ="card__head-item";
        let shockClass = "";
        if(item.discount != ""){
            redClass = "card__head-item--red"
            if(item.discount<7&&item.discount!=""){
                shockClass = "shock";
            };
        }
        
        let t = document.querySelector('#extDiv');
        t.content.querySelector('.card__info-name').textContent = item.name;
        t.content.querySelector('.content__card').className = `content__card card ${myClass}`;
        t.content.querySelector('.discount').className = `discount ${redClass}`;
        t.content.querySelector('.discount').textContent = `${item.discount}%`;
        t.content.querySelector('#shock-price').className = `${shockClass} ${redClass}`;
        t.content.querySelector('img').src = `img/blueprints/${item.img}`;
        t.content.querySelector('.card__info-name').textContent = item.name;
        t.content.querySelector('.facing').textContent = item.facing;
        t.content.querySelector('#area').textContent = item.area;
        t.content.querySelector('#floor').textContent = `${item.floor}/${item.floorMax}`;
        t.content.querySelector('.card__info-price').textContent = `${item.price} руб.`;
        t.content.querySelector('.card__info-panel').textContent = item.status;
        document.querySelector(".content__cards-wrapper").appendChild(t.content.cloneNode(true)); 
    });

    //// обработчик события для клика по звезде
    let starBtn = document.querySelectorAll(".card__star");
    starBtn.forEach(item => {
        item.onclick = function(){
            if(item.classList.contains("far")){
                item.classList.remove("far");
                item.classList.add('fas');
            }else{
                item.classList.remove("fas");
                item.classList.add('far');
            }
        };
    });
    //// обработчик события для клика по звезде

    /// кол-во оставщихся карточек
    let arrlength = arr.length - numb2;
    if(arrlength<20){
        document.querySelector(".content__button").textContent = `Показать еще ${arrlength}`;
    }else{
        document.querySelector(".content__button").textContent = `Показать еще 20`;
    };
    if(arrlength<=0){
        document.querySelector(".content__button").classList.add("content__button--none")
    }else{
        document.querySelector(".content__button").classList.remove("content__button--none");
    };/// убирает кнопку, если больше нет результатов

    let next20 = document.querySelector(".content__button");
    next20.onclick = function(){
    numb2 = numb2 + 20;
    getContent(realJsonData.apartments,0,numb2);
    };
};

getAjaxJson();///запуск Ajax-запроса


document.querySelector(".filter__price").onclick = function(){
    let arrowPrice = document.querySelector(".arrow__price");
    if(arrowPrice.classList.contains("fa-chevron-down")){
    arrowPrice.classList.remove("fa-chevron-down");
    arrowPrice.classList.add('fa-chevron-up');
    filterPrice("up");
    }else{
        arrowPrice.classList.remove("fa-chevron-up");
        arrowPrice.classList.add('fa-chevron-down');
        filterPrice("down");
    }
};


function filterPrice(x){
    if(x == "up"){
    realJsonData.apartments.sort(function(x1,x2){
        if (+x1.price.replace(/\s+/g, '') < +x2.price.replace(/\s+/g, '')) return -1;
        if (+x1.price.replace(/\s+/g, '') > +x2.price.replace(/\s+/g, '')) return 1;
        return 0;
    });    
    };
    if(x == "down"){
    realJsonData.apartments.sort(function(x1,x2){
        if (+x1.price.replace(/\s+/g, '') < +x2.price.replace(/\s+/g, '')) return 1;
        if (+x1.price.replace(/\s+/g, '') > +x2.price.replace(/\s+/g, '')) return -1;
        return 0;
    });     
    };
    getContent(realJsonData.apartments,0,12);
};

////фильтр по цене


document.querySelector(".fitler__rooms").onclick = function(){
    let arrowRooms = document.querySelector(".arrow__rooms");
    if(arrowRooms.classList.contains("fa-chevron-down")){
    arrowRooms.classList.remove("fa-chevron-down");
    arrowRooms.classList.add('fa-chevron-up');
    filterRooms("up");
    }else{
        arrowRooms.classList.remove("fa-chevron-up");
        arrowRooms.classList.add('fa-chevron-down');
        filterRooms("down");
    }
};

function filterRooms(x){
    if(x == "up"){
    realJsonData.apartments.sort(function(x1,x2){
        if (+x1.price.replace(/\s+/g, '') < +x2.price.replace(/\s+/g, '')) return -1;
        if (+x1.price.replace(/\s+/g, '') > +x2.price.replace(/\s+/g, '')) return 1;
        return 0;
    });    
    };
    if(x == "down"){
    realJsonData.apartments.sort(function(x1,x2){
        if (+x1.price.replace(/\s+/g, '') < +x2.price.replace(/\s+/g, '')) return 1;
        if (+x1.price.replace(/\s+/g, '') > +x2.price.replace(/\s+/g, '')) return -1;
        return 0;
    });     
    };
    getContent(realJsonData.apartments,0,12);
};
///// фильтр по комнатам


document.querySelector("#email").onkeyup = function(){
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = document.querySelector("#email").value;
    if(reg.test(address) == false){
        document.querySelector("#email").classList.add("alert-input");
        document.querySelector(".input__btn").disabled = true;
    }else{
        document.querySelector("#email").classList.remove("alert-input");
        document.querySelector(".input__btn").disabled = false;
    };
};

document.querySelector(".menu-icon").onclick = function(){
    let x = document.querySelector("#my-top-menu");
    if(x.className === "nav-menu"){
        x.className += " menu-active";
    }else{
        x.className = "nav-menu";
    };
};    