const API_ROOT = 'http://localhost:4000/api';

async function apiFetch(path, options){
	try{
		const res = await fetch(API_ROOT + path, options);
		if(!res.ok) throw new Error('Network response was not ok');
		return await res.json();
	}catch(e){
		// fallback to localStorage based behaviour
		return null;
	}
}

async function getAll(key){
	const map = {
		rooms: '/rooms',
		bookings: '/bookings',
		complaints: '/complaints',
		rents: '/rents',
		notices: '/notices'
	};
	const data = await apiFetch(map[key]);
	if(data!==null) return data;
	return JSON.parse(localStorage.getItem(key)||'[]');
}

async function addRoom(){
	const payload = {room: room.value, cap: capacity.value};
	const res = await apiFetch('/rooms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
	if(res) render('rooms');
	else{
		const arr=JSON.parse(localStorage.getItem('rooms')||'[]'); arr.push(payload); localStorage.setItem('rooms',JSON.stringify(arr)); render('rooms');
	}
}

async function addRent(){
	const payload = {tenant: tenant.value, amount: amount.value};
	const res = await apiFetch('/rents',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
	if(res) render('rents');
	else{
		const arr=JSON.parse(localStorage.getItem('rents')||'[]'); arr.push(payload); localStorage.setItem('rents',JSON.stringify(arr)); render('rents');
	}
}

async function addComplaint(){
	const payload = {tenant: (document.getElementById('tenantName')?document.getElementById('tenantName').value:'Guest'), text: complaint.value};
	const res = await apiFetch('/complaints',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
	if(res) render('complaints');
	else{
		const arr=JSON.parse(localStorage.getItem('complaints')||'[]'); arr.push(payload); localStorage.setItem('complaints',JSON.stringify(arr)); render('complaints');
	}
}

async function addNotice(){
	const payload = {text: notice.value};
	const res = await apiFetch('/notices',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
	if(res) render('notices');
	else{
		const arr=JSON.parse(localStorage.getItem('notices')||'[]'); arr.push(payload); localStorage.setItem('notices',JSON.stringify(arr)); render('notices');
	}
}

async function bookRoom(){
	const roomId = document.getElementById('selectRoom').value;
	const tenantName = document.getElementById('bookTenant').value;
	const payload = {roomId, tenant: tenantName, from: new Date().toISOString(), to: ''};
	const res = await apiFetch('/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
	if(res) alert('Room booked successfully');
	else{
		// local fallback mark room booked
		const rooms = JSON.parse(localStorage.getItem('rooms')||'[]');
		const r = rooms.find(r=>r.id==roomId||r.room==roomId);
		if(r) r.booked = true;
		localStorage.setItem('rooms',JSON.stringify(rooms));
		alert('Room booked (local fallback)');
	}
	render('rooms');
}

async function render(key){
	const l=document.getElementById('list');
	if(!l) return;
	l.innerHTML='';
	const items = await getAll(key);
	items.forEach(i=>{
		const li=document.createElement('li');
		li.innerText=typeof i==='object'?JSON.stringify(i):i;
		l.appendChild(li);
	});
}

window.onload=()=>{
	if(document.getElementById('room')) render('rooms');
	if(document.getElementById('tenant')) render('rents');
	if(document.getElementById('complaint')) render('complaints');
	if(document.getElementById('notice')) render('notices');
}