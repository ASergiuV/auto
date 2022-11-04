const base_url_mobilpay="https://app.autodeal.ro",base_url="https://app.autodeal.ro/api/v1",token="113701|STygD85xaZB20zgdeOGtJXM5q2NX6bpwmIQ5JRxB";var cache=new Map,insuranceCompanies=[],discoutListElements=[],availabilityListElements=[];const errorColor="hsl(350 100% 13.5%)",errorBg="hsl(350 100% 66.5%)";let toastContainer;function generateToast({message:e,background:t="#00214d",color:a="#fffffe",length:r="3000ms"}){toastContainer.insertAdjacentHTML("beforeend",`<p class="toast" 
    style="background-color: ${t};
    color: ${a};
    animation-duration: ${r}">
    ${e}
  </p>`);let n=toastContainer.lastElementChild;n.addEventListener("animationend",()=>n.remove())}function initToast(){document.body.insertAdjacentHTML("afterbegin",`<div class="toast-container"></div>
  <style>
  
.toast-container {
  position: fixed;
  z-index: 10000;
  top: 8rem;
  right: 1.5rem;
  display: grid;
  justify-items: end;
  gap: 0.5rem;
  
}

.toast {
  line-height: 1;
  padding: 0.5em 1em;
  animation: toastIt 7000ms cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    background: hsl(0, 0%, 91.8%) !important;
}

@keyframes toastIt {
  0%,
  100% {
    transform: translateY(-150%);
    opacity: 0;
  }
  10%,
  90% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media screen and (max-width: 991px) {
	.toast-container {
  	justify-items: center;
    background: #fff;
	  width: 100%;
  }
  .toast-container .toast {
  	margin-top: 1em;
  }
}
  </style>
  `),toastContainer=document.querySelector(".toast-container")}function fetchOffer2(e,t,a,r){var n=new XMLHttpRequest;n.open("POST",`${base_url}${e}?${t}`,!0),n.setRequestHeader("Authorization",`Bearer ${token}`),n.setRequestHeader("Content-Type","application/json"),n.onload=function(){var e=JSON.parse(this.response);if(n.status>=200&&n.status<400){addOffersToCache(e,r,getInsuranceCompanyWithId(a));let t=localStorage.getItem("discount"),s=localStorage.getItem("availability");clearOffersTableExceptHead(),cache.get(s).forEach(e=>{addOfferToTable(e[t],e.insurance,s)})}else generateToast({message:"Eroare: "+e.error.pretty_message,background:errorBg,color:errorColor}),console.log("Error fetching offer data: "+e.error.pretty_message)},n.send()}function getInsuranceCompanies2(){var e=new XMLHttpRequest;e.open("GET",`${base_url}/rca-policies/insurance-companies`,!1),e.setRequestHeader("Authorization",`Bearer ${token}`),e.onload=function(){var t=JSON.parse(this.response);e.status>=200&&e.status<400?insuranceCompanies=t.data:generateToast({message:"A avut loc o eroare!",background:errorBg,color:errorColor})},e.send()}function clearOffersTableExceptHead(){let e=document.getElementById("oferte-table");e.querySelectorAll(".oferte-table-content").forEach(e=>{e.remove()})}function changeQueryAvailability(e,t){return e.replace(/(availability=)[^\&]+/,"$1"+t)}function hasClass(e,t){return RegExp("(\\s|^)"+t+"(\\s|$)").exec(e.className)}function addClass(e,t){hasClass(e,t)||(e.className+=" "+t)}function removeClass(e,t){if(hasClass(e,t)){var a=RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(a," ")}}function isInsuranceIdInCacheForGivenAvailability(e,t){return!!cache.has(t)&&!!cache.get(t).find(t=>t.insurance.id===e)}function getInsuranceCompanyWithId(e){for(var t of insuranceCompanies)if(t.id===e)return t}function addOffersToCache(e,t,a){if(cache.has(t)||cache.set(t,[]),isInsuranceIdInCacheForGivenAvailability(a.id,t))return;let r=e.data.offerWithDeductedPrice,n=e.data.offerWithoutDeductedPrice;cache.set(t,[...cache.get(t),{decontat:r,standard:n,insurance:a}])}function fetchOffersForAvailability(e){let t=changeQueryAvailability(localStorage.getItem("querystring"),e);insuranceCompanies.forEach(a=>{isInsuranceIdInCacheForGivenAvailability(a.id,e)||fetchOffer2("/rca-quotations-web",t+"&insurance_company_id="+a.id,a.id,e)})}function addOfferToTable(e,t,a){if(!0===e.error)return;let r=document.getElementById("oferte-table");var n=document.createElement("div");addClass(n,"oferte-table-content");var s=document.createElement("img");addClass(s,"oferte-fields-asigurator"),s.setAttribute("src",t.image),s.setAttribute("loading","lazy"),s.setAttribute("width","138"),s.setAttribute("alt",t.name),n.appendChild(s);var o=document.createElement("div");addClass(o,"oferte-fields-bonus-malus"),o.innerHTML="Clasa: "+e.class_bm,n.appendChild(o);var i=document.createElement("div");addClass(i,"oferte-fields-perioada"),i.innerHTML=a+" luni",n.appendChild(i);var l=document.createElement("div");addClass(l,"oferte-fields-pret"),l.innerHTML=e.prime+" lei",n.appendChild(l);var c=document.createElement("a");addClass(c,"button button-form"),c.innerHTML="Alege oferta",c.addEventListener("click",t=>{triggerActiveButton(t),fadeIn(document.getElementById("modal")),localStorage.setItem("selectedOfferId",e.id)}),n.appendChild(c),r.appendChild(n)}function toggleActive(e){var t=e.target||e.srcElement;document.querySelectorAll(".button").forEach(function(e){return e!==t||e.classList.contains("active")?e===t&&e.classList.contains("active")?void 0:e.classList.remove("active"):e.classList.add("active")})}function triggerActiveButton(e){var t=e.target||e.srcElement;t.classList.contains("active")||(t.classList.add("active"),setTimeout(function(){t.classList.remove("active")},200))}function postRcaPoliciesWeb(e,t){var a=new XMLHttpRequest;a.open("POST",`${base_url}/rca-policies-web?quotation_offer_id=${e}&voucher_id=`,!0),a.setRequestHeader("Authorization",`Bearer ${token}`),a.setRequestHeader("Content-Type","application/json"),a.onload=function(){var e=JSON.parse(this.response);a.status>=200&&a.status<400?("card"===t&&postMobilpay(e.data.order_id),"rate"===t&&postTbi(e.data.order_id)):(generateToast({message:e.error.pretty_message,background:errorBg,color:errorColor}),console.log("Error fetching offer data: "+e.error.pretty_message))},a.send()}function postMobilpay(e){var t=new XMLHttpRequest;t.open("POST",`${base_url}/payu/create?order_id=${e}`,!0),t.setRequestHeader("Authorization",`Bearer ${token}`),t.setRequestHeader("Content-Type","application/json"),t.onload=function(){var e=JSON.parse(this.response);t.status>=200&&t.status<400?getMobilpay(e.data.token):(generateToast({message:e.error.pretty_message,background:errorBg,color:errorColor}),console.log("Error fetching offer data: "+e.error.pretty_message))},t.send()}function postTbi(e,t=4){var a=new XMLHttpRequest;a.open("POST",`${base_url}/tbi/create?order_id=${e}&instalments=${t}`,!0),a.setRequestHeader("Authorization",`Bearer ${token}`),a.setRequestHeader("Content-Type","application/json"),a.onload=function(){var e=JSON.parse(this.response);a.status>=200&&a.status<400?getTbi(e.data.token):(generateToast({message:e.error.pretty_message,background:errorBg,color:errorColor}),console.log("Error fetching offer data: "+e.error.pretty_message))},a.send()}function getMobilpay(e){window.location.href=`${base_url_mobilpay}/payu?token=${e}`}function getTbi(e){window.location.href=`${base_url_mobilpay}/tbi?token=${e}`}function displayLoading(){generateToast({message:"Se proceseaza cererea..",background:"hsl(198, 99%, 58%);",color:"hsl(171 100% 13.1%)",length:"35000ms"})}function loadOffers(){let e=localStorage.getItem("availability"),t=localStorage.getItem("discount");cache.has(e)||(displayLoading(),document.body.scrollTop=document.documentElement.scrollTop=0,fetchOffersForAvailability(e)),clearOffersTableExceptHead(),e=localStorage.getItem("availability"),t=localStorage.getItem("discount"),cache.get(e)?.forEach(a=>{addOfferToTable(a[t],a.insurance,e)})}function addClassAndRemoveForOtherElements(e,t,a="active"){e.forEach(e=>{removeClass(e,a)}),addClass(t,a)}function fadeIn(e){e.style.display="block",e.style.opacity=1}function fadeOut(e){e.style.opacity=1,setTimeout(()=>{e.style.opacity=0},520)}window.onload=function(){initToast(),getInsuranceCompanies2();let e=localStorage.getItem("discount"),t=localStorage.getItem("availability");availabilityListElements=[document.getElementById("1"),document.getElementById("3"),document.getElementById("6"),document.getElementById("12")],discoutListElements=[document.getElementById("standard"),document.getElementById("decontat")],availabilityListElements.forEach(function(e){e.addEventListener("click",function(){addClassAndRemoveForOtherElements(availabilityListElements,e),localStorage.setItem("availability",e.id),loadOffers()})}),discoutListElements.forEach(function(e){e.addEventListener("click",function(){addClassAndRemoveForOtherElements(discoutListElements,e),localStorage.setItem("discount",e.id),loadOffers()})}),addClassAndRemoveForOtherElements(availabilityListElements,document.getElementById(t)),addClassAndRemoveForOtherElements(discoutListElements,document.getElementById(e)),loadOffers(),document.getElementById("close-modal").addEventListener("click",function(e){fadeOut(document.getElementById("modal"))}),document.getElementById("modal").style.transition="opacity 0.5s ease-in-out;",document.getElementById("paymentButton").addEventListener("click",function(e){hasClass(document.getElementById("tbiSelect"),"w--current")?postRcaPoliciesWeb(localStorage.getItem("selectedOfferId"),"rate"):postRcaPoliciesWeb(localStorage.getItem("selectedOfferId"),"card")}),document.getElementById("paymentButtonCard").addEventListener("click",function(e){hasClass(document.getElementById("tbiSelect"),"w--current")?postRcaPoliciesWeb(localStorage.getItem("selectedOfferId"),"rate"):postRcaPoliciesWeb(localStorage.getItem("selectedOfferId"),"card")})};
