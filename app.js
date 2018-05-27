// Importing Modules
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const json = require('json');
const async = require('async');
const route = require('./routes/route');
const web3 = require('web3');
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
    let template = fs.readFileSync('./static/canarylist.html', 'utf8');
    let json = require('./addresses.json');
    var table = "";
    for(var i; i < json.length; i++){ // For each in json (if json.length = 2, do 2)
      console.log(json[i]);
      // -> Do web3.js getCanaryNameByAddress(address _address) return string canary.name
        // -> parse canary.name
        /* Just used for testing purposes */
      canary[i].name = "pew pew";
      canary[i].lastblock = 42;
      canary[i].alive = true;
        /* Just used for testing purposes */
      // -> Do web3.js getCanaryLastBlockPing(address _address) return uint canary.lastblock
        // -> parse canary.lastblock
      // -> Do web3.js isCanaryAlive(address _address) return bool canary.alive
        // -> parse canary.alive into
      table += "<tr><td>" + canary[i].name + "</td><td>" + canary[i].lastblock + "</td><td>" + canary[i].alive + "</td>"
    }
    template = template.replace("{{ canaries.table }}", table);
    res.send(default_template.replace('{{ content }}', fs.readFileSync('./static/canarylist.html', 'utf8')));
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
