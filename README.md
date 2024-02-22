# Audio-Recorder

## Introduction
  Record and store audio securely using React, Node.js, MongoDB, and Firebase. Accessible and efficient audio management platform.
  
## Deployed App

[netlify](https://shatru-audio-recorder.netlify.app/)
##
[backend](https://audio-recorder-backend.onrender.com/)

## Features

- Start, Pause, Resume and Stop Audio
- Save to Cloud 
- Delete Audio from Cloud
- Download Audio

## Design decisions or assumptions

I have created a simple and single-layout landing page rendering recordings stored on database.

## Installation & Getting started

### Backend
Use your own ***.env*** file and include ***mongoURL***
```bash
git clone https://github.com/shatrukumar47/eksaq-audio-recorder/tree/main/backend
npm install
npm run server
```

### Frontend
Use your own ***src/firebase.js** file and include ***firebase credentials to setup storage***
```bash
git clone https://github.com/shatrukumar47/eksaq-audio-recorder/tree/main/frontend
npm install
npm run start
```

## API Endpoints
***base URL : https://audio-recorder-backend.onrender.com/***
### Audio Route

```
GET /audio/ - Retrieve all audio
POST /audio/add - Add new audio - req.body({url:String})
DELETE /audio/delete/:id - Delete audio with _id
```

## Technology Stacks

### Backend
 Node.js | Express.js | MongoDB | Mongoose

### Frontend
 React | Axios | Firebase


## Snaps
![Screenshot (618)](https://github.com/shatrukumar47/eksaq-audio-recorder/assets/123942835/f7140b4c-b305-4ef0-9afe-df1e0e0423cd)

![Screenshot (619)](https://github.com/shatrukumar47/eksaq-audio-recorder/assets/123942835/dbc91c02-1267-4939-a0e0-28671306207c)








 
