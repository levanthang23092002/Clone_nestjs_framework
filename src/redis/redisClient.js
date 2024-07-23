"use strict";
const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379' // Adjust the URL as needed
});

client.on('error', (err) => console.error('Redis Client Error', err));

client.connect();

module.exports = client;
