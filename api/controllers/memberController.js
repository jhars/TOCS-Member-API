'use strict';

const mongoose = require('mongoose'),
  Member = mongoose.model('Members'),
  request = require('request'),
  rp = require('request-promise');





exports.fetch_all_members = function(req, res) {

  const cobotAllMembersAPIRequest = {
    url: "https://the-office-ro.cobot.me/api/memberships/",
    headers: {
      "Authorization": "Bearer 99d6e5ea15c649d04cc99a563b36db74cd045421ecdb29a4c53f0e8ee9aaee46"
    },
    json: true
  }
  
  rp(cobotAllMembersAPIRequest).then(data => {
    console.log("We have the data!!")
    console.log(data.length)
    
    var obj1;

    for (var property1 in data) {
      
      obj1 = data[property1];

      // console.log(obj1);


      // if (var email = obj1["user"]["email"]) {

      // }
      
      // console.log(obj1["email"]);

      
      var member = new Member({
        name: obj1["name"],
        email: obj1["email"],
        phone: obj1["phone"],
        membership_plan: obj1["plan"]["name"]
      })

      // member.save(function(member, err) {
      //   if (err)
      //     res.send(err)
      //   console.log(member.name)
      // })

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

exports.create_a_member = function(req, res) {
  var new_member = new Member(req.body);
  new_member.save(function(err, member) {
    if (err)
      res.send(err)
    res.json(member)
  })
}

exports.list_all_members = function(req, res) {
  // Member.find({}, function(err, member) {
  Member.find({}, function(err, member) {
    if (err)
      res.send(err)
    res.json(member)
  })
}



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