'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;;


var MemberSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the member'
  },
  email: {
    type: String,
    required: 'Kindly enter the email of the member'
  },
  phone: {
    type: String,
    required: 'Kindly enter the phone of the member'
  },
  // cobot_id: {
  //   type: String,
  //   required: 'Cobot Membership ID Required'
  // },
  membership_plan: {
    type: String,
    enum: [
      'Road Warrior',
      'Small Business',
      'Drop-In',
      'Free Lancer',
      'Mailbox',
      'Regular',
      'Partner',
      'Small Business Membership',
      'Partner - Barter'
    ],
    default: ['Drop-In']
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Members', MemberSchema);