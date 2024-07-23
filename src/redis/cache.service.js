"use strict";
const client = require('./redisClient');

const getCache = async (key) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, data, expiration) => {
  await client.setEx(key, expiration, JSON.stringify(data));
};
const delCache = async (key,) => {
    client.del(key, (err, response) => {
        if (err) throw err;
        return response
    });
  };

module.exports = {
  getCache,
  setCache,
  delCache,
};
