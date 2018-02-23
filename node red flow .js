[
    {
        "id": "b3113a3c.58d91",
        "type": "ibmiot in",
        "z": "deb0d57.1c46528",
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
        "x": 160,
        "y": 220,
        "wires": [
            [
                "ba1104d8.f3be6"
            ]
        ]
    },
    {
        "id": "a33c3df8.8d0268",
        "type": "function",
        "z": "deb0d57.1c46528",
        "name": "Temp Threshold",
        "func": "var temp = msg.payload.d.temp;\nvar device = msg.payload.d.name;\n\nvar upperThreshold = 30;\nvar lowerThreshold = 15;\n\n\nif ( temp > upperThreshold){\n\tmsg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too high: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}\n\nelse if (temp <= upperThreshold && temp >= lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is normal: \"+Math.round(String(temp))+\" C\",\"severity\":\"Clear\",\"type\":\"Resolution\",\"temp\":String(temp)};\n return [null,msg];\n }\n\nelse if ( temp < lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too low: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}",
        "outputs": 1,
        "noerr": 0,
        "x": 400,
        "y": 100,
        "wires": [
            [
                "69373231.78b604"
            ]
        ]
    },
    {
        "id": "c0582f27.12baa",
        "type": "twilio out",
        "z": "deb0d57.1c46528",
        "service": "_ext_",
        "twilio": "",
        "from": "+17866591963",
        "number": "",
        "name": "",
        "x": 850,
        "y": 180,
        "wires": []
    },
    {
        "id": "ba1104d8.f3be6",
        "type": "rbe",
        "z": "deb0d57.1c46528",
        "name": "",
        "func": "rbe",
        "gap": "",
        "start": "",
        "inout": "out",
        "property": "payload.d.temp",
        "x": 240,
        "y": 120,
        "wires": [
            [
                "a33c3df8.8d0268"
            ]
        ]
    },
    {
        "id": "69373231.78b604",
        "type": "function",
        "z": "deb0d57.1c46528",
        "name": "Message to send",
        "func": "var locat = \"Dubai\";\nvar alertmessage = msg.payload.alertmessage;\nvar topic = msg.topic;\nvar deviceid = msg.deviceId;\nvar devicetype = msg.deviceType;\nvar sev = msg.payload.severity;\nvar type = msg.payload.type;\nvar temp = msg.payload.temp;\n\nmsg.payload = \n{\n \"Subject\":String(alertmessage)+\" \"+String(deviceid),\n \"\\n\\n Details\": \"Temperature Alert (\"+String(temp)+\" °C) @Device: \"+String(deviceid),\n \"\\n Where\": String(locat),\n \"\\n Severity\": String(sev),\n \"\\n Type\": String(type),\n \"\\n Source\": String(deviceid),\n \"\\n ApplicationsOrServices\": [\n String(topic)\n ],\n /*\"URLs\": [\n {\n \"Description\": \"\",\n \"URL\": \"\"\n }\n ],*/\n\n \n },\n \n\nmsg.headers = {\n Accept: \"application/json\"\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 661,
        "y": 113,
        "wires": [
            [
                "c0582f27.12baa",
                "2edde296.d86156"
            ]
        ]
    },
    {
        "id": "2edde296.d86156",
        "type": "debug",
        "z": "deb0d57.1c46528",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 850,
        "y": 60,
        "wires": []
    }
]
