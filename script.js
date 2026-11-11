// ====== عدّل هنا ======
var CFG = {
  name: "AUTO QUIR",
  phone: "212722387305",            // رقم واتساب بدون + وبدون 0 فالأول
  address: "El Mers Achenad",
  hours: "من الاثنين إلى السبت: 09:00 – 18:00",
  social: [
    {t:"واتساب", u:"https://wa.me/212722387305"},
    {t:"📍 الموقع على الخريطة", u:"https://maps.app.goo.gl/9rtn7sRYdWmrC3157?g_st=ic"}
  ],
  closedWeekdays: [0],               // 0 = الأحد
  daysAhead: 14,
  busy: ["2026-11-15","2026-11-22"],  // نهارات معمرة (سنة-شهر-نهار)
};
// =======================
var sel = {d:null,t:null};
var AR_D = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function $(i){return document.getElementById(i)}
$("name").textContent = CFG.name;
$("addr").innerHTML = '📍 <a href="https://maps.app.goo.gl/9rtn7sRYdWmrC3157?g_st=ic" target="_blank" rel="noopener" style="color:inherit">' + CFG.address + '</a>';
$("hrs").textContent = "🕘 " + CFG.hours;
$("yr").textContent = new Date().getFullYear() + " " + CFG.name;
CFG.social.forEach(function(s){var a=document.createElement("a");a.href=s.u;a.target="_blank";a.rel="noopener";a.textContent=s.t;$("soc").appendChild(a)});

function isBusy(k){return CFG.busy.indexOf(k)>-1}
function renderDays(){
  var box=$("days"), now=new Date();
  for(var i=0;i<CFG.daysAhead;i++){
    var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i), k=iso(d);
    if(CFG.closedWeekdays.indexOf(d.getDay())>-1||isBusy(k))continue;
    var b=document.createElement("button");b.className="chip";b.type="button";
    b.textContent=AR_D[d.getDay()]+" "+d.getDate()+"/"+(d.getMonth()+1);
    b.onclick=(function(k,b){return function(){sel.d=k;sel.label=b.textContent;[].forEach.call(box.children,function(c){c.classList.remove("on")});b.classList.add("on");check()}})(k,b);
    box.appendChild(b);
  }
}
function check(){$("go").disabled=!(sel.d&&$("cn").value.trim()&&$("cp").value.trim())}
["cn","cp"].forEach(function(i){$(i).addEventListener("input",check)});
$("go").onclick=function(){
  var m="سلام، بغيت نحجز موعد.\nالاسم: "+$("cn").value.trim()+"\nالهاتف: "+$("cp").value.trim()+"\nالسيارة: "+$("cc").value.trim()+"\nالخدمة: "+$("cs").value+"\nالنهار: "+sel.label+" ("+sel.d+")";
  window.open("https://wa.me/"+CFG.phone+"?text="+encodeURIComponent(m),"_blank");
};
renderDays();
