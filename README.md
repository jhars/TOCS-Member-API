Steps:

___________
MEMBER API:
###########
Save Each User in DB

Build GET route for Retrieving User by phone/email
	-> Return 200 Error

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




- - - - - - - - - 

Splash Page Design
	
	options:

		1) use kendra design
		2) iframe
		3) Use Thrive Architect for Splash Page