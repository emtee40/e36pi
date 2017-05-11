let SerialPort = require("serialport");

let port = new SerialPort("/dev/cu.wchusbserialfa120", {
  baudRate: 9600,
  parser: SerialPort.parsers.readline('\r\n')
});

let readyInterval;
let sensorInterval;
let systemReady = false;

port.on('data', function (data) {
console.log(data);
	if(data == "system.ready=true"){
		systemReady = true;
		clearInterval(readyInterval);
		console.log('System ready.');

		sensorInterval = setInterval(function(){
			port.write(new Buffer('sensor\n'), function(err) {
				if (err) {
					return console.log('Error on write: ', err.message);
				}
		  	});
		},100);

	}else if(data == "system.ready=false"){
		console.log('System not ready yet.')
	}

	if(data.startsWith("sensor")){
		console.log(data.split(":")[1].split(','));
		//port.write('sensor\n');
	};
});

port.on('open', function() {

	port.write('begin\n');

	readyInterval = setInterval(function(){
		port.write(new Buffer('begin\n'), function(err) {
			if (err) {
				return console.log('Error on write: ', err.message);
			}
	  	});
	},1000);
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})
