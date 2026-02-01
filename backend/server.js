const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

function loadData(){
  if(!fs.existsSync(DATA_FILE)) return {rooms:[],bookings:[],complaints:[],rents:[],notices:[]};
  return JSON.parse(fs.readFileSync(DATA_FILE,'utf8'));
}
function saveData(d){
  fs.writeFileSync(DATA_FILE, JSON.stringify(d,null,2),'utf8');
}

// GET lists
app.get('/api/rooms',(req,res)=>{
  const d=loadData();
  res.json(d.rooms);
});
app.get('/api/bookings',(req,res)=>{
  const d=loadData();
  res.json(d.bookings);
});
app.get('/api/complaints',(req,res)=>{
  const d=loadData();
  res.json(d.complaints);
});
app.get('/api/rents',(req,res)=>{
  const d=loadData();
  res.json(d.rents);
});
app.get('/api/notices',(req,res)=>{
  const d=loadData();
  res.json(d.notices);
});

// POST
app.post('/api/rooms',(req,res)=>{
  const d=loadData();
  const item = req.body;
  item.id = d.rooms.length? d.rooms[d.rooms.length-1].id+1 : 1;
  item.booked = false;
  d.rooms.push(item);
  saveData(d);
  res.json(item);
});

app.post('/api/bookings',(req,res)=>{
  const d=loadData();
  const {roomId,tenant,from,to} = req.body;
  const room = d.rooms.find(r=>r.id===Number(roomId));
  if(!room) return res.status(400).json({error:'Room not found'});
  if(room.booked) return res.status(400).json({error:'Room already booked'});
  const booking = {id: d.bookings.length? d.bookings[d.bookings.length-1].id+1:1, roomId:room.id, room:room.room, tenant, from, to, createdAt: new Date()};
  room.booked = true;
  d.bookings.push(booking);
  saveData(d);
  res.json(booking);
});

app.post('/api/complaints',(req,res)=>{
  const d=loadData();
  const item=req.body;
  item.id = d.complaints.length? d.complaints[d.complaints.length-1].id+1:1;
  item.createdAt = new Date();
  d.complaints.push(item);
  saveData(d);
  res.json(item);
});

app.post('/api/rents',(req,res)=>{
  const d=loadData();
  const item=req.body;
  item.id = d.rents.length? d.rents[d.rents.length-1].id+1:1;
  item.createdAt = new Date();
  d.rents.push(item);
  saveData(d);
  res.json(item);
});

app.post('/api/notices',(req,res)=>{
  const d=loadData();
  const item=req.body;
  item.id = d.notices.length? d.notices[d.notices.length-1].id+1:1;
  item.createdAt = new Date();
  d.notices.push(item);
  saveData(d);
  res.json(item);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log('Server started on',PORT));
