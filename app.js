// Importing Modules
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const json = require('json');
const async = require('async');
const route = require('./routes/route');
const Web3 = require('web3');

const default_template = fs.readFileSync('./static/default.html', 'utf8');

// Initialize
var app = express();

const port = 3000;

/* Start Express WebApp */
function startWebApp(){
  app.use('/api', route)

  // Add middleware
  app.use(cors());

  // Body - parser
  app.use(bodyparser.json());

  // Static Files
  app.use(express.static(path.join(__dirname, '/public')));

  // Test Serv.
  app.get('/', (req, res)=>{
    res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/index.html', 'utf8')));
  });

  app.get('/about', (req, res)=>{
    res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/about.html', 'utf8')));
  });

  app.get('/canaries', (req, res)=>{
    // Web3 Requirements
    var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    var contractaddress = "0x0849c22e4bfbe4cf7d7d21e4b0a5de33836d7d56";
    var abi = [{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCanaryNameByAddress",
    "outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"initCanary","outputs":[{"name":"","type":"bool"}],
    "payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pingCanary",
    "outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_address",
    "type":"address"}],"name":"getCanaryLastBlockPing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view",
    "type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isCanaryAlive","outputs":[{"name":"","type":"bool"}],
    "payable":false,"stateMutability":"view","type":"function"}]

    const contractInstance = new web3.eth.Contract(abi,{address: contractaddress}); //.at(contractaddress)
    //const contractInstance = Contract;
    let template = fs.readFileSync('./static/canarylist.html', 'utf8');
    var addresses = require('./addresses.json');
    var table = "";
    var ready = false;
    var canaryname;
    var canarylastblock;
    var canaryalive;
      //canaryname = contractInstance.getCanaryNameByAddress.call(address);
      //canarylastblock = contractInstance.getCanaryLastBlockPing.call(address);
      //canaryalive = contractInstance.isCanaryAlive.call(address);
      //web3.eth.defaultAccount = account;
      //console.log("1: " + canaryname + " 2: " + canarylastblock + " 3: " + canaryalive);
      for(var i = 0; i < addresses.length; i++){ // For each in json (if json.length = 2, do 2)
        table += '<tr><td id="add' + addresses[i] +'">' +  "addresses[" + i + "]"
        + '</td><td id="lastblock' + addresses[i] +'">' + "lastblock" + "addresses[" + i + "]"
        + '</td><td id="isalive' + addresses[i] +'">' + "isalive" + "addresses[" + i + "]"
        + '</td>'
        if(i == addresses.length-1){

          ready = true;
          console.log("ready = " + ready + ". Continuing");
        }
        else{
          console.log("ready = " + ready + ". Starting over;");
        }
      }
    if(ready == true){
      function push(){
        console.log('pushing template now');
        template = template.replace('{{ table }}', table);
        console.log('template pushed, starting res.send');
        res.send(default_template.replace('{{ content }}', template, 'utf8'));
      }
      push();
    }

      //console.log(table);

    //console.log("we're getting here as well")
  });

  app.get('/(/|index.html)?', function(req, res) { // Serve index.html
    res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/index.html', 'utf8')));
  });

  app.listen(port,()=>{
    console.log('Server started on port: ' + port);
  });
}

/* Start WebApp */
startWebApp();
