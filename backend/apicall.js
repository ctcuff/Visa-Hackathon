import fetch from 'node-fetch'
const fetch = require('node-fetch');

var url = '';

fetch(url, {}).then((res)=> {return res.json()}).then((json)=>{console.log(json)}).catch(err=>console.error(err));