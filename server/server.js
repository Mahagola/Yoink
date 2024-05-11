const express = require('express');
const app = express();
const userRoutes= require('./routes/userRoutes')
const rooms=['gaming','general','tech','finance'];
const cors=require('cors');
const { METHODS } = require('http');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/users/',userRoutes);
require('./connection')
const server = require('http').createServer(app);
const PORT = 5000;
const io =  require('socket.io')(server, {
    cors : {
        origin : 'http://localhost:3000',
        METHODS : ['GET','POST']
    }
})

server.listen(PORT,()=>{
    console.log('server is listening on ',PORT)
})
