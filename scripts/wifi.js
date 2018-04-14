$(function() {

	var testController = {

	 testTemplate: _.template($('#network-template').html()),
	 

		render: function (data) {
		 var $testHtml = $(testController.testTemplate(data));
	 	// $('#network-data').append($testHtml);
		},

	//setup view on home page
	 all: function () {
	   $.ajax ({
	     type: 'GET',
	     url: '/premium_wifi_pw_mgmt',
	     success: function (data) {

	       // console.log(data);
	       // _.each(data, function(testObj) {
	         // if(testObj.network_name){//Smooth "IF" statement right here
	         // testController.render(testObj);
	       // }
	       // });

	     }
	   })
	   console.log("refreshed")
	 },

	 // all: function () {

	 // },

	setupView: function() {
		testController.all();
	}
	 
		}; //end Test Controller
	testController.setupView();

});