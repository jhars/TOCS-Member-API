'use strict';
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;;


var WifiSchema = new Schema({
  network_name: {
    type: String,
    required: 'Kindly enter the String/Alphanumeric name of the network'
  },
  SSID_number: {
    type: String,
    required: 'Raw SSID # (digits) of the network'
  },
  SSID_type: {
    type: String,
    enum: [
      'Wireless Network',
      'VLAN',
      'WLAN',
      'Site/Location'
    ],
    required: "[ 'Wireless Network','VLAN','WLAN','Site/Location']"
  },
  pw: {
    type: String
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

module.exports = mongoose.model('Wifi', WifiSchema);