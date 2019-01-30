[{"id":"344acc34.d9aa0c","type":"tab","label":"Flow 1"},{"id":"7fdacf04.2f0848","type":"ibmiot in","z":"344acc34.d9aa0c","authentication":"quickstart","apiKey":"","inputType":"evt","logicalInterface":"","ruleId":"","deviceId":"5eb33342bc27","applicationId":"","deviceType":"+","eventType":"+","commandType":"","format":"json","name":"IBM IoT App In","service":"quickstart","allDevices":false,"allApplications":false,"allDeviceTypes":true,"allLogicalInterfaces":false,"allEvents":true,"allCommands":false,"allFormats":false,"qos":"0","x":180,"y":400,"wires":[["945da350.4e9458"]]},{"id":"8d37b1b5.ea2a1","type":"function","z":"344acc34.d9aa0c","name":"Temp Threshold","func":"var temp = msg.payload.d.temp;\nvar device = msg.payload.d.name;\n\nvar maxThreshold = 30;\nvar minThreshold = 15;\n\n\nif ( temp > maxThreshold){\n\tmsg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too high: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}\n\nelse if (temp <= maxThreshold && temp >=  minThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is normal: \"+Math.round(String(temp))+\" C\",\"severity\":\"Clear\",\"type\":\"Resolution\",\"temp\":String(temp)};\n \tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n\t //return [null,msg]; \n\t //delete line 16,17 and uncomment line 18 if you dont want to get msgs about the sensor's normal state.\n }\n\nelse if ( temp < minThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too low: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}","outputs":1,"noerr":0,"x":420,"y":280,"wires":[["e70eba0a.ad7d48"]]},{"id":"945da350.4e9458","type":"rbe","z":"344acc34.d9aa0c","name":"","func":"rbe","gap":"","start":"","inout":"out","property":"payload.d.temp","x":260,"y":300,"wires":[["8d37b1b5.ea2a1"]]},{"id":"e70eba0a.ad7d48","type":"function","z":"344acc34.d9aa0c","name":"Message to send","func":"\nvar alertmessage = msg.payload.alertmessage;\nvar topic = msg.topic;\nvar deviceid = msg.deviceId;\nvar devicetype = msg.deviceType;\nvar sev = msg.payload.severity;\nvar type = msg.payload.type;\nvar temp = msg.payload.temp;\n \n msg.payload=\"\\r\\n Alert: Sensor value has change\\r\\n\"+\"Device Id: \"+String(deviceid)+\"       Located in : Dubai\\r\\n\"+\" Alert message is:\"+String(alertmessage),\n\nmsg.headers = {\n Accept: \"application/json\"\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":650,"y":380,"wires":[["69bb43c2.16ad24","93cf19c0.7ee4f8"]]},{"id":"69bb43c2.16ad24","type":"debug","z":"344acc34.d9aa0c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":1010,"y":140,"wires":[]},{"id":"93cf19c0.7ee4f8","type":"twilio out","z":"344acc34.d9aa0c","service":"_ext_","twilio":"","from":"","number":"","name":"","x":850,"y":480,"wires":[]}]
