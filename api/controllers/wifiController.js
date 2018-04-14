'use strict';

const mongoose = require('mongoose'),
  Wifi = mongoose.model('Wifi'), //SHOULD BE 'SSID'
  request = require('request'),
  rp = require('request-promise'),
  path = require("path");

//_______________________________________________________________
// POST - Route to CREATE Password for Iron Wifi Premimum Network
exports.create_wifi_pw = function (req, res) {
	console.log("---->> Function: create_wifi_pw() ===> \n" + req.body);
	
	let data = req.body;
	console.log("DATA TYPE: " + typeof req.body);

	// var obj1 = data[property1];

	// for (var property1 in data) {
	  
	  // obj1 = data[property1];

	  var wifi = new Wifi({
	    network_name: data["network_name"],
	    SSID_number: data["SSID_number"],
	    pw: data["pw"],
	    manufacturer: data["manufacturer"]
	  })

	  console.log("Password?: " + wifi.pw)
	  // console.log("Data?: " + JSON(data).stringify())
	  // member.save()

	  res.json(data)
	// }
}

//_______________________________________________________________
// GET - Route to View Password Manager HTML Page
exports.wifi_pw_manager = function (req, res) {

  res.sendFile(path.join(__dirname + '/managePassword.html'));
}


//_______________________________________________________________
// UPDATE - Route to update the Wifi Password (that is displayed to premium members)
exports.update_wifi_pw = function (req, res) {

}


//_______________________________________________________________

// ######################################################################## //
// ######################################################################## //
// ######################################################################## //

