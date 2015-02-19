/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */

/*
A simple node.js application intended to blink the onboard LED on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

var dio2 = new mraa.Gpio(2);
dio2.dir(mraa.DIR_OUT);
var dio3 = new mraa.Gpio(3);
dio3.dir(mraa.DIR_OUT);
var dio4 = new mraa.Gpio(4);
dio4.dir(mraa.DIR_OUT);
var dio5 = new mraa.Gpio(5);
dio5.dir(mraa.DIR_OUT);
var dio6 = new mraa.Gpio(6);
dio6.dir(mraa.DIR_OUT);
var dio7 = new mraa.Gpio(7);
dio7.dir(mraa.DIR_OUT);
var dio8 = new mraa.Gpio(8);
dio8.dir(mraa.DIR_OUT);

var http = require('http');
var url = require('url');
var util = require('util');
var qs = require('querystring');

var server = http.createServer(function (req, res) {

  console.dir(req.param);
  var pathname = url.parse(req.url).pathname;
  console.log('> HTTP');
  console.log("Request for " + pathname + " received.");

  if (req.method == 'POST') {
    console.log(">> POST");
    console.log("POST");
    var body = '';
    req.on('data', function (data) {
      body += data;
      console.log("Partial body: " + body);
    });
    req.on('end', function () {
      console.log("Body: " + body);
      var json = JSON.parse(body);
      console.log('id:' + json.id);
      console.log('power:' + json.power);

      if (pathname === '/dio' || pathname === '/dio/') {
        console.log('POST '+pathname);
        switch (parseInt(json.id)){
          case 1:
            console.log('case 1');
            dio2.write(parseInt(json.power)?0:1);
            break;
          case 2:
            console.log('case 2');
            dio3.write(parseInt(json.power)?1:0);
            break;
          case 3:
            console.log('case 3');
            dio4.write(parseInt(json.power)?1:0);
            break;
          case 4:
            console.log('case 4');
            dio5.write(parseInt(json.power)?1:0);
            break;
          case 5:
            console.log('case 5');
            dio6.write(parseInt(json.power)?1:0);
            break;
          default:
            break;
        }
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('post received');
    });

  }
  else {
    console.log(">> GET");
    console.log("GET");
    var html = '<html><body>Please access POST method</body></html>';
    //var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }

});
server.listen(10000);
console.log("Listening at server");

periodicActivity(); //call the periodicActivity function

function periodicActivity()
{
  myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
 // myOnboardLed2.write(ledState?0:1); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
 dio4.write(0);
 // dio4.write(ledState?1:0);
 // dio5.write(ledState?1:0);
 // dio6.write(ledState?1:0);
 // dio7.write(ledState?1:0);
 // dio8.write(ledState?1:0);
  ledState = !ledState; //invert the ledState
  setTimeout(periodicActivity,2000); //call the indicated function after 1 second (1000 milliseconds)
}