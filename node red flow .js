[
    {
        "id": "3fc8b87e.99338",
        "type": "ibmiot in",
        "z": "bbfb1ee5.476eb",
        "authentication": "quickstart",
        "apiKey": "",
        "inputType": "evt",
        "ruleId": "",
        "deviceId": "",
        "applicationId": "",
        "deviceType": "+",
        "eventType": "+",
        "commandType": "",
        "format": "json",
        "name": "IBM IoT App In",
        "service": "quickstart",
        "allDevices": false,
        "allApplications": false,
        "allDeviceTypes": true,
        "allEvents": true,
        "allCommands": false,
        "allFormats": false,
        "qos": "0",
        "x": 370,
        "y": 420,
        "wires": [
            [
                "5da01f1a.e8869"
            ]
        ]
    },
    {
        "id": "a403debd.323c98",
        "type": "function",
        "z": "bbfb1ee5.476eb",
        "name": "Temp Threshold",
        "func": "var temp = msg.payload.d.temp;\nvar device = msg.payload.d.name;\n\nvar upperThreshold = 30;\nvar lowerThreshold = 15;\n\n\nif ( temp > upperThreshold){\n\tmsg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too high: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}\n\nelse if (temp <= upperThreshold && temp >= lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is normal: \"+Math.round(String(temp))+\" C\",\"severity\":\"Clear\",\"type\":\"Resolution\",\"temp\":String(temp)};\n return [null,msg];\n }\n\nelse if ( temp < lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too low: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}",
        "outputs": 1,
        "noerr": 0,
        "x": 610,
        "y": 300,
        "wires": [
            [
                "6373437c.dffb5c"
            ]
        ]
    },
    {
        "id": "1d9d0037.7a897",
        "type": "twilio out",
        "z": "bbfb1ee5.476eb",
        "service": "_ext_",
        "twilio": "",
        "from": "+17866591963",
        "number": "",
        "name": "",
        "x": 1060,
        "y": 380,
        "wires": []
    },
    {
        "id": "5da01f1a.e8869",
        "type": "rbe",
        "z": "bbfb1ee5.476eb",
        "name": "",
        "func": "rbe",
        "gap": "",
        "start": "",
        "inout": "out",
        "property": "payload.d.temp",
        "x": 450,
        "y": 320,
        "wires": [
            [
                "a403debd.323c98"
            ]
        ]
    },
    {
        "id": "6373437c.dffb5c",
        "type": "function",
        "z": "bbfb1ee5.476eb",
        "name": "Message to send",
        "func": "var locat = \"Dubai\";\nvar alertmessage = msg.payload.alertmessage;\nvar topic = msg.topic;\nvar deviceid = msg.deviceId;\nvar devicetype = msg.deviceType;\nvar sev = msg.payload.severity;\nvar type = msg.payload.type;\nvar temp = msg.payload.temp;\n\nmsg.payload = \n{\n \"Subject\":String(alertmessage)+\" \"+String(deviceid)+ \"\\n\",\n \" Details\": \"Temperature Alert (\"+String(temp)+\" °C) @Device: \"+String(deviceid)+ \"\\n\",\n \" Where\": String(locat)+ \"\\n\",\n \" Severity\": String(sev)+ \"\\n\",\n \" Type\": String(type)+ \"\\n\",\n \" Source\": String(deviceid)+ \"\\n\",\n \"ApplicationsOrServices\": [\n String(topic)\n ],\n /*\"URLs\": [\n {\n \"Description\": \"\",\n \"URL\": \"\"\n }\n ],*/\n\n \n },\n \n\nmsg.headers = {\n Accept: \"application/json\"\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 871,
        "y": 313,
        "wires": [
            [
                "1d9d0037.7a897",
                "b4266b49.77f578"
            ]
        ]
    },
    {
        "id": "b4266b49.77f578",
        "type": "debug",
        "z": "bbfb1ee5.476eb",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1060,
        "y": 260,
        "wires": []
    }
]
