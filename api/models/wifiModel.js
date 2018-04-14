'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;;


var WifiSchema = new Schema({
  network_name: {
    type: String,
    required: 'Kindly enter the name of the member'
  },
  SSID_number: {
    type: String
  },
  SSID_type: {
    type: String,
    enum: [
      'Wireless Network',
      'VLAN',
      'WLAN',
      'Site/Location'
    ]
  },
  pw: {
    type: String,
    required: 'Error setting Wifi Password'
  },
  manufacturer: {
    type: String,
    enum: [
      'Iron Wifi',
      'UNIFI'
    ]
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('wifi', WifiSchema);