require('dotenv').config();

const config = {
  
  dbPassword: process.env.PASSWORD,
  
};

module.exports = { config };