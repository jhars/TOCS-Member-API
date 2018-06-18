

SYSTEM ARCHITECTURE:

A] UNIFI Controller

B] IRON WI-FI Captive Portal

C] TOCS (Custom) API (Web-App + Database)

D] COBOT Member API

E] WP Landing Page



DOCS - SETUP STEPS:

#1) CLEAR DATABASE
#2) POPULATE DATABASE
#3) CREATE WIFI NETWORK

SAMPLE BODY:

{
    "network_name": "TheOfficeCoffeeShop_VIP",
    "SSID_number": "123456",
    "SSID_type": "Wireless",
    "pw": "theoffice2015",
    "manufacturer": "Iron"
}


ToDo:
- Choose (non captive-portal) redirect page for Premium Network


DONE:
-clean & test splash page
-clean up Premium Wifi on Landing Page
-min style to email Confimr
-create "comp" {NOT AUTHORIZED HTML RESPONSE PAGE}
-TOC-VIP Password (reveal) PageDesign


Steps:

___________
MEMBER API:
###########
Save Each User in DB

==================================================
==================================================

Build GET route for Retrieving User by phone/email
	-> Return 200 Error

Optimize Error Codes

(tdd, is it better?)
___________
Iron WiFi:
###########
- Setup/ Configure New Captive Portal for Paid-SSID
- Use REST API AUthentication (200 status code triggers Success/Grant-Access)

___________
UNIFI:
###########
- Whitelist MemberAPI
- Create User Group for Paid-SSID
- Create User Group for Free-SSID
- Set Bandwidth (Mbps) Limits for 'Paid' & 'Free'


- - - - - - - - -


=> Add Webhooks for new user
	- get user id
	- lookup user via COBOT API (w/ user id)
	- Add User to MemberAPI



=> Setup Hosting/Domain


COBOT MEMBERSHIP PURTCHASE URL:
https://the-office-ro.cobot.me/

- - - - - - - - -
Add Footer
- - - - - - - - -
Wire Up Premium Network ion Iron WiFi
- - - - - - - - -
Free Network Design Improvements
- - - - - - - - -

- - - - - - - - -

Splash Page Design

	options:

		1) use kendra design
		2) iframe
		3) Use Thrive Architect for Splash Page
