'use strict';

const mongoose = require('mongoose'),
  Member = mongoose.model('Members'),
  request = require('request'),
  rp = require('request-promise');


// ============== API METHODS ===================//


// GET - Populate 'members' database (via COBOT API)
exports.fetch_all_members = function(req, res) {

  const cobotAllMembersAPIRequest = {
    url: "https://the-office-ro.cobot.me/api/memberships/",
    headers: {
      "Authorization": "Bearer 99d6e5ea15c649d04cc99a563b36db74cd045421ecdb29a4c53f0e8ee9aaee46"
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

//==================================================
//==================================================

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
          
          res.status(200)
          // res.json("Access to Premimum WiFi Granted");

        } else {
          res.status(401); // Unauthorized
        }

        console.log(obj1); //need smarter logic for handling membership_plans
      }

      res.json(member);
    }
  
  });
};

// POST - .find {Member by:PHONE}
// ToDo: Normalize Phone String in fetch_all_members
exports.find_member_by_phone = function(req, res) {
  Member.find({phone: req.body.phone}, function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};



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
}

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