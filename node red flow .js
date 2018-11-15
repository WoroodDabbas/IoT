[
  {
    "id": "deb0d57.1c46528",
    "type": "tab",
    "label": "Flow 1"
  },
  {
    "id": "c2743f8.11a27c",
    "type": "ibmiot in",
    "z": "deb0d57.1c46528",
    "authentication": "quickstart",
    "apiKey": "",
    "inputType": "evt",
    "logicalInterface": "",
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
    "allLogicalInterfaces": false,
    "allEvents": true,
    "allCommands": false,
    "allFormats": false,
    "qos": "0",
    "x": 180,
    "y": 400,
    "wires": [
      [
        "1147c17e.478777"
      ]
    ]
  },
  {
    "id": "8a49fa89.47b02",
    "type": "function",
    "z": "deb0d57.1c46528",
    "name": "Temp Threshold",
    "func": "var temp = msg.payload.d.temp;\nvar device = msg.payload.d.name;\n\nvar upperThreshold = 30;\nvar lowerThreshold = 15;\n\n\nif ( temp > upperThreshold){\n\tmsg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too high: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}\n\nelse if (temp <= upperThreshold && temp >= lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is normal: \"+Math.round(String(temp))+\" C\",\"severity\":\"Clear\",\"type\":\"Resolution\",\"temp\":String(temp)};\n return [null,msg];\n }\n\nelse if ( temp < lowerThreshold){\n msg.payload = {\"device\": String(device),\"alertmessage\":\"Temperature is too low: \"+Math.round(String(temp))+\" C\",\"severity\":\"Fatal\",\"type\":\"Problem\",\"temp\":String(temp)};\n\tmsg.reset = {\"reset\":0};\n\treturn [msg,msg.reset];\n}",
    "outputs": 1,
    "noerr": 0,
    "x": 420,
    "y": 280,
    "wires": [
      [
        "45a37f79.388908"
      ]
    ]
  },
  {
    "id": "5fcc5fbb.ae0898",
    "type": "twilio out",
    "z": "deb0d57.1c46528",
    "service": "_ext_",
    "twilio": "",
    "from": "+17866591963",
    "number": "",
    "name": "",
    "x": 870,
    "y": 360,
    "wires": []
  },
  {
    "id": "1147c17e.478777",
    "type": "rbe",
    "z": "deb0d57.1c46528",
    "name": "",
    "func": "rbe",
    "gap": "",
    "start": "",
    "inout": "out",
    "property": "payload.d.temp",
    "x": 260,
    "y": 300,
    "wires": [
      [
        "8a49fa89.47b02"
      ]
    ]
  },
  {
    "id": "45a37f79.388908",
    "type": "function",
    "z": "deb0d57.1c46528",
    "name": "Message to send",
    "func": "var locat = \"Dubai\";\nvar alertmessage = msg.payload.alertmessage;\nvar topic = msg.topic;\nvar deviceid = msg.deviceId;\nvar devicetype = msg.deviceType;\nvar sev = msg.payload.severity;\nvar type = msg.payload.type;\nvar temp = msg.payload.temp;\n\nmsg.payload = \n{\n \"Subject\":String(alertmessage)+\" \"+String(deviceid)+ \"\\n\",\n \" Details\": \"Temperature Alert (\"+String(temp)+\" °C) @Device: \"+String(deviceid)+ \"\\n\",\n \" Where\": String(locat)+ \"\\n\",\n \" Severity\": String(sev)+ \"\\n\",\n \" Type\": String(type)+ \"\\n\",\n \" Source\": String(deviceid)+ \"\\n\",\n \"ApplicationsOrServices\": [\n String(topic)\n ],\n /*\"URLs\": [\n {\n \"Description\": \"\",\n \"URL\": \"\"\n }\n ],*/\n\n \n },\n \n\nmsg.headers = {\n Accept: \"application/json\"\n};\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 681,
    "y": 293,
    "wires": [
      [
        "5fcc5fbb.ae0898",
        "73bbf81a.7611d8"
      ]
    ]
  },
  {
    "id": "73bbf81a.7611d8",
    "type": "debug",
    "z": "deb0d57.1c46528",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 240,
    "wires": []
  }
]
