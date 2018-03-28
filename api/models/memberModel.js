'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MemberSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the member'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  // status: {
  type: [{
    type: String,
    enum: ['Road Warrior', 'Small Business', 'Drop-In']
  }],
  default: ['Drop-In']
  // }
});

module.exports = mongoose.model('Members', MemberSchema);