const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || '8080';
app.set('port', port);

app.set('view engine', 'js');
app.set('view engine', 'html');
app.engine('js', require('express-react-views').createEngine());
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'dist')));

const server = http.createServer(app);

app.get('/home',(req,res)=>{
  res.render('../dist/index.html');
});

app.get('*', function(req, res){
  res.render('../dist/index.html');
});

server.listen(port);