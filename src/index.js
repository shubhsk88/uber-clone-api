import express from 'express';
// const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(3000, function () {
  console.log('Example app listening to the port 3000');
});
