# Projet GameBot

## Structure
This repository contains three ingescape agents applications: `GameBot` and `GameBotClient` and `Whiteboard`.

### GameBot [(documentation)](GameBot/README.md)
`GameBot` is a Python application that runs a chat bot that allows its users to play games displayed on the Whiteboard. It hosts the available games logic, manage their states and allow players to be synchronised.

### GameBotClient [(documentation)](GameBotClient/README.md)
`GameBotClient` is an Angular web application that provides an user interface for interacting with the `GameBot` and the games it offers.

### Whiteboard
`Whiteboard` is an application allowing its users to share an online whiteboard.

## Prerequisites

Before you begin, ensure that you have the following prerequisites:

- Python 3.x
- Node.js and npm

## Getting Started

1. Clone the repository
```shell
$ git clone 
```

2. Install the dependencies for `GameBot`
```shell
$ cd GameBot
$ pip install -r requirements.txt
```

3. Install the dependencies for `GameBotClient`
```shell
$ cd GameBotClient
$ npm install
```

4. Configure the proxy IP for `GameBotClient`
In [GameBotClient/src/app/app.component.ts](GameBotClient/src/app/app.component.ts) modify line 46
```javascript
IGS.netSetServerURL("ws://<YOUR_IP>:5000");
```

5. Run the `GameBot` application
```shell
$ cd GameBot
$ python src/main.py
```

6. Run the `GameBotClient` application
```shell
$ cd GameBotClient
$ ng serve
```

7. Run the `Whiteboard` application

8. Open your browser and navigate to `http://localhost:4200` to use the `GameBotClient` application.

## Screenshots

You can find some images from the whole application inside the [screenshots folder](/screenshots)

## Credits

Théo DESPRATS, Sylvain CROUZET, Nicolas CORMARY  
Projet IHM - ENSEEIHT 2022/2023