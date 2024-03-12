const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(".batteryDisChargingTime");
const batteryStatus = document.querySelector(".batterystatus");
const battonEl=document.querySelector('#dot');
const overall=()=>{
if('getBattery' in navigator){
  navigator.getBattery().then(battery=>{
    console.log(battery)
    function allupdates(){
      battery1();
      battery2();
      battery3();
      battery4();
      battery5();
    }
    allupdates();
    //battery level
    function battery1(){
    batteryLevel.innerHTML=Math.round(battery.level*100)+'%'}
    //battery charging
    function battery2(){
   batteryCharging.innerHTML=battery.charging? 'yes':'no';}
    //battery charging time
    function battery3(){
      const y=Math.round((battery.chargingTime/60)/60);
    batteryChargingTime.innerHTML=y+' hours';}
    // battery dis charging time 
    function battery4(){
     const x=battery.dischargingTime;
     const value=Math.round((x/60)/60);
    batteryDisChargingTime.innerHTML=value+' hours';
    }
    // battery status
    function battery5(){
    if(battery.level===1){
      batteryStatus.innerHTML="Unplug charger";
    }
    else if (battery.charging){
      batteryStatus.innerHTML="battery is in charging";

    }
    else if (battery.level>0.5 && battery.charging===false){
      batteryStatus.innerHTML="charging not needed";

    }
    else if (battery.level<0.5 && battery.charging===false){
      batteryStatus.innerHTML="charging needed";

    }
  }
})
}
}

battonEl.addEventListener('mouseover',()=>overall())