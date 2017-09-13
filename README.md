## Send alerts from an IoT Device to IBM Alert Notification Service

====================================

In this repository you will see how to send an alert from any IoT Device which is connected to the Watson Iot Platform via Node-RED to the IBM Alert Notification Service. Try it out for yourself right now by clicking:



### Application Overview
![alt text](https://developer.ibm.com/recipes/wp-content/uploads/sites/41/2017/03/ANStop.png)


### Create your Bluemix Application

1. Sign in to your Bluemix account and open the catalog (https://console.ng.bluemix.net/catalog/   //the link depends on your region (ng; eu-gb; etc.))
2. In the left sidebar click on “Boilerplates” (category: Apps)
3. Click on “Internet of Things Platform Starter”
4. Insert an “App name” (e.g. iot-alertnotification)

### Prepare Watson IoT Platform for receiving data

1. Open your Bluemix dashboard (https://console.ng.bluemix.net/dashboard/services)
2. Click on the service with the “Internet of Things Platform” service offering.
3. Click “Launch” on the next page.
4. Click on “Devices” in the left sidebar
5. Click on “+ Add Device” on the right
6. Click on “Create Device Type” (If you already created a device type and you want to use it for this scenario you can continue with step 10)
7. Click on “Create Device Type” again.
9. The sections General Information, Define Template, Submit Information and Metadata are optional.
    Click “Next” until you are in the Metadata section then click “Create”
10. Now you should be back on the “Add Device” page and you can choose the created device type. Do this and click “Next”
11. Enter an Device ID (e.g. Sensor01) and click “Next”.
12. The Device Info Section is optional. Click “Next”
13. Provide a token for the device and click “Next” (If you leave this field blank the token will be auto generated)
14. Now you see a summary of the device information. Click “Add”.
15. Now you should see a page with your device credentials. Save these credentials!

### Send (simulated) data to Watson IoT Platform
1. Open http://watson-iot-sensor-simulator.mybluemix.net/ in your browser and enter the saved credentials from point 15 of the previous step
2. Click on “Save changes”.
3. Now the device is connected to your Watson IoT Platform. Please check if there are incoming events by clicking on the device! (https://uzer22.internetofthings.ibmcloud.com/dashboard/#/devices/browse) //Replace uzer22 with your Organization ID!
#### (The following steps are optional!)
You can configure an instance of a ClodantNoSQL database and use it as historical data storage.

4.1 If you want to do this click on “Extensions” in the left sidebar of your Watson IoT Platform or on this link: https://uzer22.internetofthings.ibmcloud.com/dashboard/#/extensions  //Replace uzer22 with your Organization ID!

4.2 Click on “Setup” (Historical Data Storage)

4.3 Click on “Select”  (If you have more than one instance of CloudantNoSQL in your Bluemix account select the instance which was created during the second step (Create your Bluemix Application))

4.4 Click on “Done”.

4.5 Now a pop-up will open up and you have to confirm that you want to give access.

4.6 For displaying the historical data within the Watson IoT Platform you can create a board with a line chart. If you want to do this click on “Boards” in the left sidebar.

4.7 Click on “+ Create New Board” on the right

4.8 Provide a name for your board and click “Next”.

4.9 On the next page you don’t have to change anything. Click “Submit”

4.10 Click on the new created board.

4.11 Click on “+ Add New Card”.

4.12 Choose “Line chart”.

4.13 Now click on the check box (1.). After that click on your device in the left sidebar (2.)

4.14 Click on “Connect new data set”

4.15 Fill out the fields with the properties which are shown below and click on “Next”.

4.16 Click on “Settings” and choose the properties which are shown below. After that click on “XL” and on “Next”.

4.17 Click on “Submit”

4.18 Now you see the device data

4.19 If you want to see older data click on “now” and choose the desired date.

### Create Alerts and send them to IBM Alert Notification Service
The data from the Watson IoT Platform will be processed in Node-RED. For receiving the data in Node-RED you need to create an API-Key within the Watson IoT Platform and credentials for Alert Notification Service within Bluemix.

Generate an API-Key within your Watson IoT Platform

1. Open your Watson IoT Platform and select “Apps” in the left sidebar.
2. Click on “+ Generate API Key”
3. Save the API Key and the Authentication Token
4. Click on “Generate”

### Create an IBM Alert Notification Service within your Bluemix account

1. Open the bluemix catalogue (https://console.ng.bluemix.net/catalog/)
2. Search for “alert notification” and click on the service.
3. Click on “Create” in the bottom right corner. After that the Alert Notification Service will be listed in your Bluemix Dashboard under “All services”
4. If you want to see your credentials you can click on “Service Credentials” and on “View Credentials”. You will need these credentials later.
##### Create an alert and send it to IBM Alert Notification Service

The data will be processed within Node-RED (a tool for wiring together hardware devices, APIs and online services). You already created an instance of Node-RED in step 2.
1. Open your Bluemix console. (https://console.ng.bluemix.net/)
2. Click on the route to your app.
3. Click on “Go to your Node-RED flow editor” on the next page and add a new flow by clicking on “+” or on “Flows -> Add” as shown below.
![alt text](https://developer.ibm.com/recipes/wp-content/uploads/sites/41/2017/03/Bildschirmfoto-2017-03-10-um-17.18.08.png)

4. Copy the flow from the " node red flow " file in this repository and paste it into the clipboard of your Node-RED flow editor as shown below
5. Now you have to provide your API-Key of your Watson IoT Platform. Open the “IBM IoT” node.
6. Select “API-Key” in the authetication field and provide the Device Type, Device Id and the Event of the device data in your Watson IoT Platform.
![alt text](https://developer.ibm.com/recipes/wp-content/uploads/sites/41/2017/03/Bildschirmfoto-2017-03-09-um-16.00.58.png)

7. Click on the pen next to the “API-Key” field and provide the key + token you have created at the beginning of this step.
8. Click on “Add” and on “Done”
9. Open the “http request” node, select the method “POST” and provide the Alert Notification Service credentials from Bluemix under “Use basic authentication” (The needed username is displayed as “name” in Bluemix)
10. If your region in Bluemix is not US-South you have to update the URL as well (e.g. https://ibmnotifybm.eu-gb.mybluemix.net/api/alerts/v1 if your region is UK).

![alt text](https://developer.ibm.com/recipes/wp-content/uploads/sites/41/2017/03/Bildschirmfoto-2017-03-09-um-16.17.21.png)

11. Click on “Done”
12. Click on “Deploy” in the top right corner.


### Conclusion

After finishing the previous steps you can send alerts from the simulated device to IBM Alert Notification Service.

1. Set the temperature of your simulated device to a critical value.

(The current thresholds are 15 °C and 30 °C. You can change it in the “Temp Threshold” node in your Node-RED flow editor.)

2. Open IBM Alert Notification Service to see the alert (open your Bluemix dashboard and click on the Alert Notification Service, in the next window click on “Launch”).

3. If you want to know what you can do with this alert read the Bluemix documentation about IBM Alert Notification Service: https://console.ng.bluemix.net/docs/services/AlertNotification/index.html 
"# Madtalks" 
