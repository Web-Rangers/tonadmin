import dotenv from 'dotenv';
dotenv.config();
console.log(process.env)
const config = {
    API_URL: process.env.REACT_APP_API_URL,
    NODE_URL: process.env.NODE_URL,
    SERVER_URL:process.env.REACT_APP_SERVER_URL
};

export default config;