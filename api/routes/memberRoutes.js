'use strict';
module.exports = function(app) {
  var members = require('../controllers/memberController');

  // todoList Routes
  app.route('/members')
    .get(members.list_all_members)
    // .post(members.create_a_member)

  app.route('/members/cobot/member_data')
  	.get(members.fetch_all_members)

  app.route('/member_by/email')
    .post(members.find_member_by_email)
  //   .get(todoList.read_a_member)
  //   .put(todoList.update_a_member)
  //   .delete(todoList.delete_a_member);

  app.route('/member_by/phone_number')
    .post(members.find_member_by_phone)

  app.route('/signin/rest')
    .post(members.authenticate_member_ironwifi)

  app.route('/member/confirm')
    .get(members.subscribe_to_cobot_comfirm_membership_subscription)
    .post(members.confirm_membership_cobot_subscription)
};