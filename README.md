

SYSTEM ARCHITECTURE:

A] UNIFI Controller

B] IRON WI-FI Captive Portal

C] TOCS (Custom) API (Web-App + Database)

D] COBOT Member API

E] WP Landing Page



ToDo:


- USER-GUIDE (lots of images)

	A] 'TOCS-VIP' Wifi Newtork Password Update Instructions
	
		1 => UNIFI (simply update the password here)
		- will need to whitelist MK's IP address for Controller Access (ask Ron)

		2 => Update API : Provide page for { UPDATE Route - @api/tocs_wf_pw/ }


	B] Splash Page Images
		
		1 => Iron Wifi
			1. Login to Iron Wifi
			2. Navigate to Captie Portals
			3. Choose 'TOCS Portal'
			4. Select the 'Portal Pages'hamburger
			5. Click the edit-icon on the right side of the row
			6. Click on the Image -> then on the image icon on the top menue
				[PICURE HERE]

				(keep this page open and move on to next steps)


		2 => Imgur
			1. Create images with the following sizes:

				Top Row: ???px x ???px
				Bottom Row: ???px x ???px

		3. Upload to Imgur Account

		4. Copy the 'Direct Link' link (this is the url that contains the image file)

		5. Paste Link into Iron Wifi 


	C] Landing Page -- WordPress/Thrive CMS



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





