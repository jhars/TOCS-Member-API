'use strict';

const mongoose = require('mongoose'),
  Member = mongoose.model('Members'),
  request = require('request'),
  rp = require('request-promise');

const bearerToken = "Bearer 4a0443d7ea815fb1404e65e07da04d2af54bd97a3ae33134b6aa8d03ffa79458"
var pswd = "Grand Circus"

// ============== API METHODS ===================//
//_________________________________________________________________
// GET - List All Members
exports.list_all_members = function(req, res) {
  Member.find({}, function(err, member) {
    
    if (err) {
      res.status(400); // Bad Request
      res.send(err)
    } else {
      res.json(member)
    }
    
  })
};

//_________________________________________________________________
// POST -  .find {Member by:EMAIL}
exports.find_member_by_email = function(req, res) {
  Member.find({email: req.body.email}, function(err, member) {
    
    console.log(member);

    if (err) {
      res.status(400); // Bad Request
      // res.status(401); // Unauthorized
      // res.status(402); // payment required
      // res.status(403);    // forbidden
      res.send(err);      
    } else if (member.length == 0) {
      res.status(403);
      res.json("No TOCS/COBOT Members w/ with matching email");  
    } else {
      
      var obj1;
      for (var i in member) {
        const plan = member[i]['membership_plan'];

        if (plan == ('Road Warrior' || 'Small Business Membership')) {
          // res.json("Access to Premimum WiFi Granted");
          res.status(200)
        } else {
          res.status(401); // Unauthorized
        }

        console.log(obj1); //need smarter logic for handling membership_plans
      }

      res.json(member);
    }
  
  });
};

//_________________________________________________________________
// POST - .find {Member by:PHONE}
// ToDo: Normalize Phone String in fetch_all_members
exports.find_member_by_phone = function(req, res) {
  Member.find({phone: req.body.phone}, function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};


//_______________________________________________________________
// POST - Route setup for Captive-Portal REST-Auth tool to hit.
// ...this is the 'gateway' to premium network

// authenticate_member_ironwifi
exports.authenticate_member_ironwifi = function(req, res) {
  
  Member.find({email: req.body.email}, function(err, member) {

    console.log("MEMBER: " + member);

    if (err) {
      res.status(400); // Bad Request
      // res.status(401); // Unauthorized
      // res.status(402); // payment required
      // res.status(403);    // forbidden
      res.send("ERROR #1 => " + err);      
    } else if (member.length == 0) {
      res.status(403);
      res.json("No TOCS/COBOT Members w/ with matching email");  
    } else {
      
      // var obj1;
      // for (var i in member) {
        
      //   const plan = member[i]['membership_plan'];
      //   var msg;

        // if (plan == 'Road Warrior' || plan == 'Small Business Membership') {
        //   msg = "Welcome " + plan + " Member! \n the password for our faster, premium network is " + wifiPassword;
          
        //   res.status(200)
        // } else {
        //   msg = "Thanks for signing in! " + plan + " Member! Enjoy Free Wi-Fi!";
        //   pswd = null
        //   res.status(401); // Unauthorized
        // }
        // console.log("___________iteration logic object: " + i + "\n___________" + obj1); //need smarter logic for handling membership_plans
        
      // }

      res.json({
        message: msg,
        password: pswd
      });

      // res.status(500)
    }
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - COBOT API ROUTES - - - - - - - - - - - - - - - - - - - - //


//_________________________________________________________________
//GET - Subscribe to COBOT
// =>   Subscription: confirm_membership

exports.subscribe_to_cobot_comfirm_membership_subscription = function(req, res) {
    console.log(req.body);
    
    const callbackRoute = "https://tocs-api.herokuapp.com/member/confirm"

    var cobotSubscribeRequest = {
      method: 'POST',
      uri: "https://the-office-ro.cobot.me/api/subscriptions/",
      headers: {
        "Authorization": bearerToken
      },
      body: {
        "event": "confirmed_membership",
        "callback_url": callbackRoute
      },
      json: true // Automatically stringifies the body to JSON
    };
    
    rp(cobotSubscribeRequest).then(data => {
      
      console.log("---------- COBOT SUBSCRIBE REQUEST RESPONSE DATA: ---------- \n" + data)

    }).catch(err => {
      console.log("Houston we Have a Problem subscribing to Cobot WEBHOOK 01")
      console.log(err)
      res.send(err)
    })
  };



//_________________________________________________________________
//COBOT sends "POST" request to this ROUTE
// Receive confirmation from COBOT that a new member has signed up
// so...
// Create a New Member in the TOCS API Database

exports.confirm_membership_cobot_subscription = function(req, res) {
  const memberData = req.body
  console.log("THIS IS MY MEMBER DATA: ->\n" + memberData);

  const fetchedURL = req.body["url"]
  console.log("Feteched URL: ->\n" + fetchedURL);

  // https://the-office-ro.cobot.me/api/memberships/dae9fc20daea2df5700de5d6755027d7
  const getNewMemberCobotAPIRequest = {
    url: fetchedURL,
    headers: {
      "Authorization": bearerToken
    },
    json: true
  }
  
  rp(getNewMemberCobotAPIRequest).then(data => {

    console.log("========== Sanity Check #1 ==========")

    let id = data["id"]
    let name = data["name"]
    let email =data["email"]
    let phone = data["phone"]
    let membership_plan = data["plan"]["name"]

    console.log("========== Sanity Check #2 ==========")

    var member = new Member({
      name: name,
      email: email,
      phone: phone,
      membership_plan: membership_plan
    })

    console.log("MEMBER DB OBJECT: " + member)
    member.save()

    console.log("========== Sanit Check #3 ==========")

    var obj1;
    for (var property1 in data) {
      obj1 = data[property1];
      console.log(obj1);
      console.log("========== SANITY Check " + property1 + " ==========")
    }

    
    console.log("========== Sanit Check #4 ==========")


  }).catch(err => {
      console.log("Houston we Have a Problem subscribing to Cobot WEBHOOK 02")
      console.log(err)
    res.send(err)
  })


};

//_______________________________________________________________
// POST - Route setup for Captive-Portal REST-Auth tool to hit.
// ...this is the 'gateway' to premium network

// authenticate_member_ironwifi
exports.authenticate_member_ironwifi = function(req, res) {
  Member.find({email: req.body.email}, function(err, member) {

    if (err) {
      res.status(400); // Bad Request
      // res.status(401); // Unauthorized
      // res.status(402); // payment required
      // res.status(403);    // forbidden
      res.send(err);      
    } else if (member.length == 0) {
      res.status(403);
      res.json("No TOCS/COBOT Members w/ with matching email");  
    } else {
      
      var obj1;
      for (var i in member) {

        const plan = member[i]['membership_plan'];

        if (plan == 'Road Warrior' || plan == 'Small Business Membership') {
          // res.json("Access to Premimum WiFi Granted");
          res.status(200)
        } else {
          res.status(401); // Unauthorized
        }

        console.log(obj1); //need smarter logic for handling membership_plans
      }

      res.json(member);
    }
  
  });
};

// ######################################################################## //
// ########################### DO NOT CALL THIS ROUTE ##################### //
// ############## Unless you wnat to populate the DATABASE ############### //

// GET - Populate 'members' database (via COBOT API)
exports.fetch_all_members = function(req, res) {

  const cobotAllMembersAPIRequest = {
    url: "https://the-office-ro.cobot.me/api/memberships/",
    headers: {
      "Authorization": bearerToken
    },
    json: true
  }
  
  rp(cobotAllMembersAPIRequest).then(data => {
    console.log("RECORDS LENGTH " + data.length)
    
    var obj1;

    for (var property1 in data) {
      
      obj1 = data[property1];
      
      var member = new Member({
        name: obj1["name"],
        email: obj1["email"],
        phone: obj1["phone"],
        membership_plan: obj1["plan"]["name"]
      })

      console.log(member.name)
      member.save()
    }

    res.json(data)
    res.status(200)

  }).catch(err => {
    console.log("Houston we Have a Problem")
    console.log(err)
    res.send(err)
  })
};

// ######################################################################## //
// ######################################################################## //
// ######################################################################## //



//==================================================
//==================================================

// exports.create_a_member = function(req, res) {
//   var new_member = new Member(req.body);
//   new_member.save(function(err, member) {
//     if (err)
//       res.send(err)
//     res.json(member)
//   })
// }



// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };