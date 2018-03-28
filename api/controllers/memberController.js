'use strict';


var mongoose = require('mongoose'),
  Member = mongoose.model('Members'),
  request = require('request'),
  rp = require('request-promise');
  
  // function fetchCobotMemberList() {
  //     // this returns a promise:
  //     return ;
  // }


var options = {
  url: "https://the-office-ro.cobot.me/api/memberships/",
  headers: {
    "Authorization": "Bearer 99d6e5ea15c649d04cc99a563b36db74cd045421ecdb29a4c53f0e8ee9aaee46"
  },
  json: true
}



exports.fetch_all_members = function(req, res) {
  
  rp(options).then(data => {
    console.log("We have the data!!");
    console.log(data.length);
    console.log(typeof data);


    // var string1 = "";
    var obj1;
    
    for (var property1 in data) {
      obj1 = data[property1];
      console.log(obj1["name"]);
      console.log(obj1["user"]["email"]);
      console.log(obj1["phone"]);
      console.log(obj1["plan"]["name"]);
    }

    var $ = JSON.parse(data);
    // var memberData = $(this);

    var members = $(this);

    console.log(members);

// Houston we Have a Problem
// SyntaxError: Unexpected token o in JSON at position 1
//     at JSON.parse (<anonymous>)
//     at rp.then.data (/Users/jonathanharlan/JH/dev/tocs/TOCS-MemberAPI/api/controllers/memberController.js:41:18)


    // for (var prop in JSON.parse(data)) {
    //   console.log(prop);
    // }

    // for (datum in data) {
    //      console.log(key.length);
    // };
    // for(i=0;i<data.length;i++){

    //   console.log(data[i]);
    // }

  // }).then(members => {



    // var memberData = JSON.parse(data);

    // console.log(memberData[4]);

    


    // var member = {
    //                 name: 
    //                 email:
    //                 phone:
    //                 memberType:
    //               } 
    


    // for (datum in data) {
      // var memberDictionary = JSON.parse(data);

      // console.log(json.memberDictionary);
    // }




    res.json(data);
    res.status(200);


  }).catch(err => {
    console.log("Houston we Have a Problem")
    console.log(err);
  })
};

//==================================================
//==================================================

exports.create_a_member = function(req, res) {
  var new_member = new Member(req.body);
  new_member.save(function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};

exports.list_all_members = function(req, res) {
  Member.find({}, function(err, member) {
    if (err)
      res.send(err);
    res.json(member);
  });
};



// FIND BY MEMBER PHONE NUMBER FUNCTION HERE

// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


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