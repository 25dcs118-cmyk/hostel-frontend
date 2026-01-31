function login(){
const u=username.value;
const p=password.value;
const r=role.value;


const users={
admin:'admin123',
tenant:'tenant123'
};


if(users[u]===p && u===r){
localStorage.setItem('user',JSON.stringify({u,r}));
location.href='dashboard.html';
}else alert('Invalid credentials');
}


function logout(){
localStorage.clear();
location.href='index.html';
}