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
const loadingImg =
  'http://pic.ziroom.com/static/images/slist_1207/defaultPZZ/other-loading.jpg';

function getInfo(id) {
  const url = `http://www.ziroom.com/z/vr/${id}.html`;
  let result = '';

  return axios
    .get(url)
    .then(res => cheerio.load(res.data))
    .then($ => $('.pirobox_t6').attr('href'));
}

async function sendMail(msg) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      ...configUser
    }
  });

  transporter.sendMail({
    from: '"自如买啊买" <hanlianhao1234@163.com>',
    to: '1271489754@qq.com',
    subject: '[！！！重要！！！]赶紧买',
    text: msg
  });
}

function main() {
  const timer = setInterval(() => {
    getInfo(id).then(info => {
      console.log(info, loadingImg);
      if (info !== loadingImg) {
        console.log(configuration.canBuy);
        sendMail('买了买了');
        clearInterval(timer);
      } else {
        console.log(configuration.cantBuy);
      }
    });
  }, 1000);
}

main();
