const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

// 用户配置文件
const configUser = require('./config');

const configuration = {
  cantBuy: '配置中',
  canBuy: '赶紧抢'
};

const id = '205172';
const loadingImg = '-loading.jpg';

function getInfo(id) {
  const url = `http://www.ziroom.com/x/${configUser.id}.html`;

  return axios({
    method: 'GET',
    url,
    // headers: {
    //   Cookie: configUser.Cookie || ''
    // }
  })
    .then(res => cheerio.load(res.data))
    .then($ => $('.Z_info_aside .Z_name .status').hasClass('iconicon_release'));
}

getInfo().then(console.log);
