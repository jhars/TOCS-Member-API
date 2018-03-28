'use strict';


var mongoose = require('mongoose'),
  Member = mongoose.model('Members'),
  request = require('request'),
  rp = require('request-promise');

  var rp = require('request-promise');
  
  function fetchCobotMemberList() {
      // this returns a promise:
      return rp(options);
  }


var options = {
  url: "https://the-office-ro.cobot.me/api/memberships/",
  headers: {
    "Authorization": "Bearer 99d6e5ea15c649d04cc99a563b36db74cd045421ecdb29a4c53f0e8ee9aaee46"
  },
  json: true
}


exports.fetch_all_members = function(req, res) {
  
  fetchCobotMemberList().then(data => {
    console.log("We have the data!!");
    console.log(data);
  }).catch(err => {
    console.log("Houston we Have a Problem")
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