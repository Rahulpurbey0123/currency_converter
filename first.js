const Base_Url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(curCode in countryList){
        let newOPt = document.createElement("option");
        newOPt.innerText = curCode;
        if (select.name === "form" && curCode === "USD"){
            newOPt.selected = "selected";
        }else if(select.name === "to" && curCode ==="NPR"){
            newOPt.selected = "selected";
        }
        select.append(newOPt);
    }   
    select.addEventListener("change",(evt)=>{
        UpdFlag(evt.target);
    }) 
}

const UpdFlag = (element) =>{
    let curVal = element.value;
    let countryCode = countryList[curVal];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click" , async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amount.value = 1;
        amtVal = 1;
    }
    // console.log(fromCurr.value , toCurr.value)
    let URl = `${Base_Url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URl);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let final = rate * amtVal;
    msg.innerText = `${amtval} ${fromCurr} = ${final} ${toCurr}`;
});