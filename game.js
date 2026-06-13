let level = localStorage.getItem("level")
? Number(localStorage.getItem("level"))
: 1;

let exp =
parseInt(localStorage.getItem("exp")) || 0;

let love = localStorage.getItem("love")
? Number(localStorage.getItem("love"))
: 50;

let mood = localStorage.getItem("mood")
? Number(localStorage.getItem("mood"))
: 50;

let hunger = localStorage.getItem("hunger")
? Number(localStorage.getItem("hunger"))
: 50;

let coin = localStorage.getItem("coin")
? Number(localStorage.getItem("coin"))
: 0;
let memories =
JSON.parse(localStorage.getItem("memories"))
|| [];

let lastSleep =
localStorage.getItem("lastSleep")
? Number(localStorage.getItem("lastSleep"))
: 0;

function updateStats(){

    document.getElementById("love").innerText = love;
    document.getElementById("mood").innerText = mood;
    document.getElementById("hunger").innerText = hunger;
    document.getElementById("coin").innerText = coin;
    document.getElementById("level").innerText = level;
    document.getElementById("exp").innerText = exp;

    localStorage.setItem("love", love);
    localStorage.setItem("mood", mood);
    localStorage.setItem("hunger", hunger);
    localStorage.setItem("coin", coin);
    localStorage.setItem("level", level);
    localStorage.setItem("exp", exp);

}
  function updateAlbum(){

   let album =
document.getElementById("album");



album.innerHTML = "";

    memories.forEach(memory => {

        let li =
        document.createElement("li");

        li.innerText = memory;

        album.appendChild(li);

    });

    localStorage.setItem(
        "memories",
        JSON.stringify(memories)
    );
}
let face = "😊";

    const character =
document.getElementById("character");

    const item =
localStorage.getItem("item");

console.log(item);

document.getElementById("equip")
.innerText = item ? item : "";

if(level < 15){
    character.src = "baby.png";
}
else if(level < 30){
    character.src = "grow.png";
}
else if(level < 60){
    character.src = "love.png";
}
else{
    character.src = "goddess.png";
}
    if(hunger < 20){
        face = "😵";
    }
    else if(mood < 20){
        face = "😕";
    }
    else if(love > 100){
        face = "🥰";
    }

  function talk(){

    let lines = [];

if(hunger < 20){

    lines = [
        "배고파... 😭",
        "간식 사줘 🍰",
        "꼬르륵..."
    ];

}
else if(mood < 20){

    lines = [
        "심심해 😒",
        "놀아줘 😢",
        "삐졌어..."
    ];

}
else{

    if(love > 2000){

        lines = [
            "주성이 보고싶었어 ❤️",
            "오늘도 와줘서 고마워 💕",
            "주성이 최고야 🥰",
            "우리 평생 같이 있자 💖"
        ];

    }

    else if(love > 1000){

        lines = [
            "보고싶었어 ❤️",
            "같이 놀자 😊",
            "데이트 가고 싶어 ☕",
            "오늘 기분 좋아 💕"
        ];

    }

    else{

        lines = [
            "안녕 😊",
            "뭐하고 있었어?",
            "오늘도 반가워 🌸",
            "같이 놀자!"
        ];

    }

}

    document.getElementById("speech").innerText =
    lines[Math.floor(Math.random()*lines.length)];

    love += 2;
    while(love >= level * 100){
    level++;
    document.getElementById("speech").innerText =
    "🎉 지꿍이가 레벨업 했어!";
}
    mood += 3;
    coin += 10;


    updateStats();
}

function feed(){

    document.getElementById("speech").innerText =
    "냠냠~ 맛있어 😋";

    hunger += 10;
    mood += 5;
    gainExp(5);

    updateStats();
}

function gift(){

    if(coin < 20){

        document.getElementById("speech").innerText =
        "💎 코인이 부족해!";
        return;
    }

    const gifts = [
        "🌹 꽃다발",
        "🍫 초콜릿",
        "🧸 곰인형",
        "💍 반지"
    ];

    const gift =
    gifts[Math.floor(Math.random()*gifts.length)];

    coin -= 20;
    love += 30;

    document.getElementById("speech").innerText =
    gift + " 고마워! 💖";

    gainExp(10);

    updateStats();
}
function date(){

    const places = [
        "☕ 카페",
        "🎬 영화관",
        "🌸 공원",
        "🌊 바다",
        "🍝 맛집"
    ];

    const place =
    places[Math.floor(Math.random()*places.length)];

    document.getElementById("speech").innerText =
    place + " 데이트 너무 좋았어 ❤️";

    const memory = place + " 데이트 ❤️";

memories.push(memory);

localStorage.setItem(
    "memories",
    JSON.stringify(memories)
);

updateAlbum();

    love += 15;
    mood += 20;
    hunger -= 10;

    memories.push(place + " 데이트");
updateAlbum();

gainExp(20);

    updateStats();

}

function gainExp(amount){

    exp += amount;

    while(exp >= 100){
        exp -= 100;
        level++;

        alert("레벨업! ⭐ Lv." + level);
    }

    updateStats();
}

updateStats();

setInterval(() => {



    hunger -= 1;

    if(hunger < 0){
        hunger = 0;
    }

    if(hunger < 20){
        mood -= 1;
    }

    if(mood < 0){
        mood = 0;
    }

    updateStats();
    updateAlbum();

}, 3000);
function shop(){

    const item = prompt(
        "구매할 아이템\n\n1. 리본 (50코인)\n2. 왕관 (100코인)"
    );

    if(item == "1"){

        if(coin >= 50){

            coin -= 50;

            localStorage.setItem(
                "item",
                "🎀"
            );

            alert("리본 구매 완료!");

        }else{

            alert("코인이 부족해!");

        }

    }

    else if(item == "2"){

        if(coin >= 100){

            coin -= 100;

            localStorage.setItem(
                "item",
                "👑"
            );

            alert("왕관 구매 완료!");

        }else{

            alert("코인이 부족해!");

        }

    }

    updateStats();

}
function sleep(){

    const now = Date.now();

    if(now - lastSleep < 3600000){

        document.getElementById("speech").innerText =
        "😴 아직 안 졸려!";

        return;
    }

    lastSleep = now;

    localStorage.setItem(
        "lastSleep",
        lastSleep
    );

    mood += 30;
    hunger += 10;

    gainExp(10);

    document.getElementById("speech").innerText =
    "😴 푹 자고 일어났어!";

    updateStats();
}
setInterval(() => {

    hunger -= 1;

    if(hunger < 0){
        hunger = 0;
    }

    updateStats();

}, 30000);