## Send alerts from an IoT Device to your mobile phone via SMS using Twilio  

====================================

In this repository you will see how to send alerts from any IoT Device which is connected to the Watson Iot Platform via Node-RED to your mobile phone through Twilio Service via SMS . Try it out for yourself right now by Following these steps:




### Create your Application on IBM Cloud

1. Sign up to your IBM Cloud account, then sign in and open the catalog (https://cloud.ibm.com  //the link depends on your region (ng; eu-gb; etc.))
2. In the left sidebar click on “Boilerplates” (category: Apps)
3. Click on “Internet of Things Platform Starter”
4. Insert an “App name” (e.g. iot-alertnotification)
5. When your app's status is Awake, select the app URL or type it into the browser to open the Node-RED flow editor
6. Import the flow from file "node red flow.js" in this repositry into the Node-RED flow editor .

At this point , you have your own flow on node red and the next step is to fill and edit some of the nodes . 

### Setting up 'IoT in' node
 Open the link in the file "Simulated Sensor.txt" on this repositry. Up at the right corner , you will see a string of numbers and letters , this is the Device Id you will enter in the 'IBM IoT in' node . This string is randomly generated and will change when you refresh the simulated sensor page.



### Create a Twilio account and setting up Twilio node
1. Open https://www.twilio.com/ in your browser and Sign up . 
2. Complete the steps to create your account and name your project.
3. at this step , wou will see a red button that says get a number . Click on it . This number that you will use when dealing with Twilio APIs. Save it. 
3. go to your account Dashboard , now you can see your Account Sid and Auth Token. Save them as well . 
4. from Settings , go to Geo permissions and select you country .
5. Go to your node red flow editor , double click on Twilio node and enter the details from above . 
6. Click on Deploy.


### Conclusion

After finishing the previous steps you can send alerts from the simulated device to your phone through Twilio SMS Service.

1. Set the temperature of your simulated device to a critical value.

(The current thresholds are 15 °C and 30 °C. You can change it in the “Temp Threshold” node in your Node-RED flow editor.)

2. A text message will be recieved on your mobile phone with the corresponding value of the temperature sensor and with other details.

3. You can view live sensor data when you click on the Device id from the simulated sensor page .

THANKS! 
