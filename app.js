const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const button=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".form select");
const toCurr=document.querySelector(".to select");

const msg =document.querySelector(".msg");

for (select of dropdowns){
  for(code in countryList){
    //console.log(code,countryList[code]);
    let newoptions=document.createElement("option");
    newoptions.innerText=code;
    newoptions.value=code;
    if(select.name=="from" && code=="USD" ){
           newoptions.selected="selected";
    }
    else if(select.name=="to" && code=="BDT" ){
           newoptions.selected="selected";
    }
    select.append(newoptions);
  }
  select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
  })
}
const updateflag=(element)=>{
      let currCode=element.value;
      let countryCode=countryList[currCode];
      let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
      let img=element.parentElement.querySelector("img");
      img.src=newSrc;
};

button.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amval=amount.value;
    if(amval==" " || amval<1){
        amval=1;
        amount.value="1";
    }
    const url=`${baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalamount=amval*rate;
    msg.innerText=`${amval} ${fromCurr.value} =${finalamount} ${toCurr.value}`;
    //console.log(data);

})