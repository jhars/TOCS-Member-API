'use strict';

const mongoose = require('mongoose'),
  Wifi = mongoose.model('Wifis'), //SHOULD BE 'SSID'
  request = require('request'),
  rp = require('request-promise'),
  path = require("path");
  // _ = require('underscore');
  // html = require("html");

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

	//________Hardcoing 'ophelia' network name here________//
	Wifi.findOne({network_name: 'ophelia'}, function(err, ssid) {
		console.log("SSID: " + ssid['pw']);
		
		if (err) {
			res.send(err)
		} else {
			res.json(ssid)	
		}
		
	});

	console.log(" #2 Network from URL ? QUERY = ... " + network);
}

//_______________________________________________________________
// UPDATE - Route that updates the Wifi Password, that COBOT Members be 'authorized' to view

// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

exports.update_wifi_pw = function (req, res) {

		let password = req.query['pw']
		// let password = "My NewP$$sword$$$$";

	Wifi.findOneAndUpdate({network_name: 'ophelia'}, password, {new: true}, function(err, ssid) {
		console.log("SSID: " + ssid);
		
		if (err) {
			res.send(err)
		} else {
			res.json(ssid)	
		}
		
	});

}



//_______________________________________________________________
// GET - Route to View Password Manager HTML Page
exports.wifi_pw_manager = function (req, res) {

	console.log("REQ.PARAMS => " + req.params);
	
	let urlParams = req.params["network_name"];
	// console.log("TypeOf => " + (typeof urlParams));
	console.log("PARAMS #1 => " + JSON.stringify(urlParams));
	// res.json(urlParams);

	// teamTemplate: _.template($('#pw-template').html()),



	// console.log("PARAMS #2 => " + urlParams["pw"]);


 	Wifi.findOne({network_name: urlParams}, function(err, network) {
 		
 		console.log("#3 Wifi ? NETWORK PASSWORD =>  " + network.pw);
 		console.log("#3 -------- END ---------------- #3");
	
	// 	if (!network) {
	// 		res.status(401);
	// 		res.send(err);
	// 	} else {
	// 		res.status(201);
	// 		res.json(network);
	// 	}
	// });
 	
	// console.log("PARAMS #3 => " + urlParams["pw"]);


 //   var testController = {
  
 //     testTemplate: _.template($('#network-template').html()),
     

 //     render: function (data) {
 //       var $testHtml = $(testController.testTemplate(data));
 //       // $('#network-data').append($testHtml);
 //     },

 // //setup view on home page
 //     // all: function () {
 //     //   $.ajax ({
 //     //     type: 'GET',
 //     //     url: '/api/teams',
 //     //     success: function (data) {
 //     //       var allTeams = data;
 //     //       // console.log(allTeams);
 //     //       // _.each(allTests, function(teamObj) {
 //     //         // if(teamObj.natRank){//Smooth "IF" statement right here
 //     //         testController.render(testObj);
 //     //       // }
 //     //       // });
 //     //       // teamController.addEventHandlers();
 //     //     }
 //     //   })
 //     //   console.log("refreshed")
 //     // },

 //     all: function () {

 //     },

 //    setupView: function() {
 //    	testController.all();
 //    }
     
 //   	}; //end Test Controller
	// 	testController.setupView();

	});


	let view = path.join(__dirname + '/managePassword.html');
	res.sendFile(view);
}

// });




//_______________________________________________________________

// ######################################################################## //
// ######################################################################## //
// ######################################################################## //

