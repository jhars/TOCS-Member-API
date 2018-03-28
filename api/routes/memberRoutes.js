'use strict';
module.exports = function(app) {
  var members = require('../controllers/memberController');

  // todoList Routes
  app.route('/members')
    .get(members.list_all_members)
    .post(members.create_a_member);

  app.route('/members/all')
  	.get(members.fetch_all_members);

  // app.route('/members/:memberId')
  //   .get(todoList.read_a_member)
  //   .put(todoList.update_a_member)
  //   .delete(todoList.delete_a_member);
};