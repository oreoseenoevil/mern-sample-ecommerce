# MERN Store App

## Description

An ecommerce store built with MERN stack and utilizes third party API.
This ecommerce store enable 2 different flows:

1. User browse the products, transations history and checkout
2. Admin manage and control entire store components.

## Clone this Repo

```
$ git clone https://github.com/oreoseenoevil/mern-sample-ecommerce.git
$ cd mern-sample-ecommerce
```

## Setup

```
$ copy env.example .env
```

## Configure or Add your MONGODB URI, API & SECRET

```
  * MONGO_URI & ACCESS_TOKEN_SECRET & REFRESH_TOKEN_SECRET => configuration
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * CLOUD_NAME & CLOUD_API_KEY & CLOUD_API_SECRET => cloudinary configuration
```

The server-side run on http://localhost:5000/ also the client-side also run on http://localhost:5000/

## Install

Some basic Git commands are:

```
$ npm install
```

## Run the application for development

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)

### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:

```json
{
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.eol": "\n",
  "prettier.jsxSingleQuote": true
  // Enable this once you're on the client folder/react
  // "emmet.includeLanguages": {
  //   "javascript": "javascriptreact"
  // }
}
```
