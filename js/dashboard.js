const user=JSON.parse(localStorage.getItem('user'));
if(!user) location.href='index.html';


title.innerText=user.r.toUpperCase()+" DASHBOARD";


const admin=[['Rooms','rooms.html'],['Rent','rent.html'],['Complaints','complaints.html'],['Notices','notices.html']];
const tenant=[['Rent','rent.html'],['Complaints','complaints.html'],['Notices','notices.html']];


(user.r==='admin'?admin:tenant).forEach(i=>{
const a=document.createElement('a');
a.className='box';a.href=i[1];a.innerText=i[0];
menu.appendChild(a);
});