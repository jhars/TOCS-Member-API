'use strict';

const mongoose = require('mongoose'),
  Wifi = mongoose.model('Wifis'), //SHOULD BE 'SSID'
  request = require('request'),
  rp = require('request-promise'),
  path = require("path");

//_______________________________________________________________
// POST - Route to CREATE Password for Iron Wifi Premimum Network
// ==>> GOOD EXAMPLE: Baseline CREATE Data-Object NodeJS Route
exports.create_wifi_pw = function (req, res) {
	let data = req.body;
	  
  var wifi = new Wifi({
    network_name: data["network_name"],
    SSID_number: data["SSID_number"],
    SSID_type: data["SSID_type"],
    pw: data["pw"],
    manufacturer: data["manufacturer"]
  })

  console.log("Password?: " + wifi.pw)
  wifi.save();

	res.json(wifi)
}
//_______________________________________________________________
// GET - Route to getch CURRENT WIFI PASSWORD

exports.fetch_current_pw = function (req, res) {
	
	let network = req.query["network_name"];
	console.log("#1 Network from URL ? QUERY = ... " + network);

	//HARD CODING network name here________//
	Wifi.findOne({network_name: network}, function(err, ssid) {
		console.log("SSID: " + ssid);
		
		if (err) {
			res.send(err)
		} else {
			res.json(ssid)	
		}
		
	});

	console.log(" #2 Network from URL ? QUERY = ... " + network);
}

//_______________________________________________________________
// POST (should be 'PUT')
//	- Route that updates the Wifi Password, that COBOT Members be 'authorized' to view

exports.update_wifi_pw = function (req, res) {

		let password = req.body['pw']
		let networkName = req.params['network_name']
		console.log(password);
		console.log(networkName);
		// let password = "My NewP$$sword$$$$";
		var newvalues = { $set: { pw: password } };

	Wifi.findOneAndUpdate({network_name: networkName}, newvalues, {new: true}, function(err, ssid) {
		console.log("SSID: " + ssid);

		if (err) {
			res.send("ERROR: "+ err)
		} else {
			res.json(ssid.pw)
		}

	});
}



//_______________________________________________________________
// GET - Route to View Password Manager HTML Page
exports.wifi_pw_manager = function (req, res) {

	let urlParams = req.params["network_name"];
	console.log("PARAMS #1 => " + JSON.stringify(urlParams));


 	Wifi.findOne({network_name: urlParams}, function(err, network) {
 		console.log("#3 Wifi ? NETWORK PASSWORD =>  " + network["pw"]);
 		console.log("#3 -------- END ---------------- #3");
	});


	let view = path.join(__dirname + '/managePassword.html');
	res.sendFile(view);
}


//_______________________________________________________________

// ######################################################################## //
// ######################################################################## //
// ######################################################################## //

