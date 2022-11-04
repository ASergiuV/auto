const base_url="https://app.autodeal.ro/api/v1",token="113701|STygD85xaZB20zgdeOGtJXM5q2NX6bpwmIQ5JRxB";var citites=[],areas=[];const errorColor="hsl(350 100% 13.5%)",errorBg="hsl(350 100% 66.5%)";function prepare_request(e){var t=new XMLHttpRequest;return t.open("GET",`https://app.autodeal.ro/api/v1${e}`,!0),t.setRequestHeader("Authorization","Bearer 113701|STygD85xaZB20zgdeOGtJXM5q2NX6bpwmIQ5JRxB"),t}function set_data_to_dropdown(e,t,a){let s=document.getElementById(t);e.forEach(e=>{let t=document.createElement("option");t.setAttribute("value",e[a]),t.textContent=e.name,s.appendChild(t)})}setDisabledAlege();let toastContainer;function generateToast({message:e,background:t="#00214d",color:a="#fffffe",length:s="3000ms"}){toastContainer.insertAdjacentHTML("beforeend",`<p class="toast" 
    style="background-color: ${t};
    color: ${a};
    animation-duration: ${s}">
    ${e}
  </p>`);let r=toastContainer.lastElementChild;r.addEventListener("animationend",()=>r.remove())}function initToast(){document.body.insertAdjacentHTML("afterbegin",`<div class="toast-container"></div>
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
  `),toastContainer=document.querySelector(".toast-container")}function setDisabledAlege(){removeSelectOptionsExceptAlege("city_id"),removeSelectOptionsExceptAlege("make"),removeSelectOptionsExceptAlege("model"),removeSelectOptionsExceptAlege("year"),removeSelectOptionsExceptAlege("category")}function validateCNP(e){t="string"==typeof e?e:String(e);var t,a=0,s=0,r=0,n=[],o=[2,7,9,1,4,6,3,5,8,2,7,9];if(13!==t.length)return!1;for(a=0;a<13;a++){if(n[a]=parseInt(t.charAt(a),10),isNaN(n[a]))return!1;a<12&&(r+=n[a]*o[a])}switch(10==(r%=11)&&(r=1),s=10*n[1]+n[2],n[0]){case 1:case 2:s+=1900;break;case 3:case 4:s+=1800;break;case 5:case 6:s+=2e3;break;case 7:case 8:case 9:(s+=2e3)>parseInt(new Date().getYear(),10)-14&&(s-=100);break;default:return!1}return!(s<1800)&&!(s>2099)&&n[12]===r}function validateStep(e){var t=document.getElementsByClassName(e),a=!0,s=!0;for(let r in t){a=!0,""===t[r].value?.trim()&&(a=!1),"identity"!=t[r].id||validateCNP(t[r].value)||(a=!1),"Alege"===t[r].value?.trim()&&(a=!1),console.log(t[r]);let n=t[r].selectedOptions;if(n&&"Alege"===n[n.length-1]?.outerText?.trim()&&(a=!1),!a)return s=!1,$(t[r]).focus(),!1}return s}function emptyError(){generateToast({message:"Toate campurile trebuie completate corect",background:errorBg,color:errorColor})}function removeSuccess(e=0){setTimeout(function(){null!=(container=document.getElementById("successMessageSubmit"))&&(container.style.display="none",(form=document.getElementById("form-details")).style.display="block")},1e3*e)}function handleSubmit(e){if(!validateStep("step2"))return e.preventDefault(),emptyError(),removeSuccess(),removeSuccess(1),removeSuccess(5),$(window).scrollTop(0),!1;let t=new FormData(e.target);t.append("type","fizica");let a=new URLSearchParams(t);a.delete("_redirect"),a.delete("owner");var s=a.get("availability");s.includes("2"),3==s.length&&(a.delete("availability"),a.set("availability",s.slice(0,-1))),localStorage.setItem("discount",a.get("decontare")),localStorage.setItem("availability",a.get("availability")),localStorage.setItem("querystring",a.toString()),removeSuccess(),removeSuccess(1),window.location.href="/asigurare-rca-oferte-disponibile"}function loadCarMakesBasedOnCategory2(e){(request_vehicles_makes=prepare_request("/vehicles/makes?app_mapped_category_id="+e.selectedOptions[0].value)).onload=function(){var e=JSON.parse(this.response);request_vehicles_makes.status>=200&&request_vehicles_makes.status<400?(removeSelectOptionsExceptAlege("make"),set_data_to_dropdown(e.data,"make","id"),loadCarModelsBasedOnMake2(document.getElementById("make"))):console.log("error")},request_vehicles_makes.send()}function loadCarModelsBasedOnMake2(e){(request_vehicles_models=prepare_request("/vehicles/models?vehicle_make_id="+e.selectedOptions[0].value)).onload=function(){var e=JSON.parse(this.response);request_vehicles_models.status>=200&&request_vehicles_models.status<400?(removeSelectOptionsExceptAlege("model"),set_data_to_dropdown(e.data,"model","id")):console.log("error")},request_vehicles_models.send()}function loadCarMakesBasedOnCategory(e){(request_vehicles_makes=prepare_request("/vehicles/makes?app_mapped_category_id="+e.target.value)).onload=function(){var e=JSON.parse(this.response);request_vehicles_makes.status>=200&&request_vehicles_makes.status<400?(removeSelectOptionsExceptAlege("make"),set_data_to_dropdown(e.data,"make","id"),loadCarModelsBasedOnMake2(document.getElementById("make"))):console.log("error")},request_vehicles_makes.send()}function loadCarModelsBasedOnMake(e){(request_vehicles_models=prepare_request("/vehicles/models?vehicle_make_id="+e.target.value)).onload=function(){var e=JSON.parse(this.response);request_vehicles_models.status>=200&&request_vehicles_models.status<400?(removeSelectOptionsExceptAlege("model"),set_data_to_dropdown(e.data,"model","id")):console.log("error")},request_vehicles_models.send()}function populateYears(){var e=new Date().getFullYear(),t=[];for(startYear=1930;startYear<=e;)t.push(startYear++);let a=document.getElementById("year");t.reverse(),t.forEach(e=>{let t=document.createElement("option");t.setAttribute("value",e),t.textContent=e,a.appendChild(t)});let s=document.getElementById("driving_license_year");t.forEach(e=>{let t=document.createElement("option");t.setAttribute("value",e),t.textContent=e,s.appendChild(t)})}function removeSelectOptionsExceptAlege(e){for(var t=document.getElementById(e);t.options.length>0;)t.remove(0);let a=document.createElement("option");a.setAttribute("value","Alege"),a.disabled=!0,a.textContent="Alege",t.appendChild(a)}function formatDateToStandard(e){return e.getUTCFullYear()+"-"+(e.getUTCMonth()+1)+"-"+e.getUTCDate()}function loadCitiesBasedOnArea(e){var t=[];let a=areas.filter(function(t){return t.id==e.target.value});t=cities.filter(function(e){return e.area_code===a[0].code}),removeSelectOptionsExceptAlege("city_id"),set_data_to_dropdown(t,"city_id","id")}function hasClass(e,t){return RegExp("(\\s|^)"+t+"(\\s|$)").exec(e.className)}function addClass(e,t){hasClass(e,t)||(e.className+=" "+t)}function removeClass(e,t){if(hasClass(e,t)){var a=RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(a," ")}}function goToSecondPage(e){if(!validateStep("step1"))return e.preventDefault(),generateToast({message:"Toate campurile trebuie completate",background:"hsl(350 100% 66.5%)",color:"hsl(350 100% 13.5%)"}),document.getElementById("prevButton").click(),!1;let t="step-active",a=document.getElementById("pasText"),s=document.getElementById("pasTextAlt"),r=document.getElementById("step1"),n=document.getElementById("step2");removeClass(r,t),addClass(n,t);let o=document.getElementById("step1alt"),l=document.getElementById("step2alt");removeClass(o,t),addClass(l,t),a.innerHTML="Pasul 2",s.innerHTML="Pasul 2",$(window).scrollTop(0)}function goBackToFirstPage(e){let t="step-active",a=document.getElementById("pasText"),s=document.getElementById("pasTextAlt"),r=document.getElementById("step1"),n=document.getElementById("step2");removeClass(n,t),addClass(r,t);let o=document.getElementById("step1alt"),l=document.getElementById("step2alt");removeClass(l,t),addClass(o,t),a.innerHTML="Pasul 1",s.innerHTML="Pasul 1",$(window).scrollTop(0)}request_areas=prepare_request("/areas"),request_cities=prepare_request("/cities"),request_vehicles_registration_type=prepare_request("/vehicles/registration-types"),request_vehicles_using_type=prepare_request("/vehicles/using_types"),request_vehicles_categs=prepare_request("/vehicles/categories"),request_vehicles_fuel_type=prepare_request("/rca-policies/fuel-types"),request_areas.onload=function(){var e=JSON.parse(this.response);request_areas.status>=200&&request_areas.status<400?(areas=e.data,set_data_to_dropdown(e.data,"area_id","id")):console.log("error")},request_cities.onload=function(){var e=JSON.parse(this.response);request_cities.status>=200&&request_cities.status<400?(cities=e.data,removeSelectOptionsExceptAlege("city_id"),set_data_to_dropdown(cities.filter(function(e){return"AB"===e.area_code}),"city_id","id")):console.log("error")},request_vehicles_registration_type.onload=function(){var e=JSON.parse(this.response),t=[];request_vehicles_registration_type.status>=200&&request_vehicles_registration_type.status<400?(e.data.forEach(e=>{"inmatriculat"===e.name&&t.push(e)}),set_data_to_dropdown(t,"vehicle_registration","name")):console.log("error")},request_vehicles_fuel_type.onload=function(){var e=JSON.parse(this.response);request_vehicles_fuel_type.status>=200&&request_vehicles_fuel_type.status<400?set_data_to_dropdown(e.data,"fuel","code"):console.log("error")},request_vehicles_using_type.onload=function(){var e=JSON.parse(this.response);request_vehicles_using_type.status>=200&&request_vehicles_using_type.status<400?set_data_to_dropdown(e.data,"using_type","name"):console.log("error")},request_vehicles_categs.onload=function(){var e=JSON.parse(this.response);request_vehicles_categs.status>=200&&request_vehicles_categs.status<400?(set_data_to_dropdown(e.data,"category","id"),loadCarMakesBasedOnCategory2(document.getElementById("category"))):console.log("error")},request_areas.send(),request_cities.send(),request_vehicles_registration_type.send(),request_vehicles_fuel_type.send(),request_vehicles_using_type.send(),request_vehicles_categs.send(),window.onload=function(){initToast();let e=document.getElementById("form-details");e.addEventListener("submit",handleSubmit);let t=document.getElementById("category");t.addEventListener("change",loadCarMakesBasedOnCategory);let a=document.getElementById("make");a.addEventListener("change",loadCarModelsBasedOnMake);let s=document.getElementById("area_id");s.addEventListener("change",loadCitiesBasedOnArea);let r=localStorage.getItem("serie-sasiu");r&&(document.getElementById("vin").value=r),populateYears();let n=document.getElementById("start_date");n.flatpickr({altInput:!0,defaultDate:new Date().setDate(new Date().getDate()+1),minDate:new Date,allowInput:!0,maxDate:new Date().setMonth(new Date().getMonth()+1),altFormat:"d.m.Y",dateFormat:"d.m.Y"});let o=document.getElementById("nextButton");o.addEventListener("click",goToSecondPage);let l=document.getElementById("prevButton");l.addEventListener("click",goBackToFirstPage);let i=document.getElementById("identity");i.addEventListener("focusout",e=>{validateCNP(e.target.value)||generateToast({message:"CNP-ul nu este valid.",background:errorBg,color:errorColor})}),document.addEventListener("DOMContentLoaded",function(){for(var e=document.getElementsByClassName("step1"),t=0;t<e.length;t++)e[t].oninvalid=function(e){e.target.setCustomValidity(""),e.target.validity.valid||e.target.setCustomValidity("Invalid")},e[t].oninput=function(e){e.target.setCustomValidity(""==e.target.value?.trim()?"Invalid":""),"identity"==e.target.id&&e.target.setCustomValidity(validateCNP(e.target.value)?"":"CNP invalid")},e[t].onchange=function(e){"Alege"==e.target.value&&e.target.setCustomValidity("Selectati o optiune")},e[t].onvalid=function(e){e.target.setCustomValidity("")}})};
