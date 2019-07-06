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
  const url = `http://www.ziroom.com/z/vr/${id}.html`;

  return axios({
    method: 'GET',
    url,
    headers: {
      Cookie: configUser.Cookie || ''
    }
  })
    .then(res => cheerio.load(res.data))
    .then($ => $('.pirobox_t6').attr('href'));
}

async function sendMail(msg) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: configUser.user,
      pass: configUser.pass
    }
  });

  transporter.sendMail({
    from: `"自如买啊买" ${configUser.user}`,
    to: configUser.to,
    subject: '[！！！重要！！！]赶紧买',
    text: msg
  });
}

function main() {
  const timer = setInterval(() => {
    getInfo(configUser.id).then(info => {
      if (!info.endsWith(loadingImg)) {
        console.log(configuration.canBuy);
        sendMail('买了买了');
        clearInterval(timer);
      } else {
        console.log(configuration.cantBuy);
      }
    });
  }, 10000);
}

main();
