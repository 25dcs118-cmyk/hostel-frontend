function get(key){return JSON.parse(localStorage.getItem(key)||'[]')}
function set(key,data){localStorage.setItem(key,JSON.stringify(data))}


function addRoom(){const d=get('rooms');d.push({room:room.value,cap:capacity.value});set('rooms',d);render('rooms')}
function addRent(){const d=get('rents');d.push({tenant:tenant.value,amount:amount.value});set('rents',d);render('rents')}
function addComplaint(){const d=get('complaints');d.push(complaint.value);set('complaints',d);render('complaints')}
function addNotice(){const d=get('notices');d.push(notice.value);set('notices',d);render('notices')}


function render(key){
const l=document.getElementById('list');
if(!l) return;
l.innerHTML='';
get(key).forEach(i=>{
const li=document.createElement('li');
li.innerText=typeof i==='object'?JSON.stringify(i):i;
l.appendChild(li);
});
}


window.onload=()=>{
if(room) render('rooms');
if(tenant) render('rents');
if(complaint) render('complaints');
if(notice) render('notices');
}