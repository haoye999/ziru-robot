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

  return axios({
    method: 'GET',
    url,
    headers: {
      Cookie:
        'PHPSESSID=v3ogi36op994sqa3mpvntt80p4; CURRENT_CITY_CODE=110000; CURRENT_CITY_NAME=%E5%8C%97%E4%BA%AC; BJ_nlist=%7B%22205172%22%3A%7B%22id%22%3A%22205172%22%2C%22sell_price%22%3A2070%2C%22title%22%3A%22%5Cu987a%5Cu4e49%5Cu987a%5Cu4e49%5Cu57ce15%5Cu53f7%5Cu7ebf%5Cu77f3%5Cu95e8%5Cu524d%5Cu8fdb%5Cu82b1%5Cu56ed%5Cu77f3%5Cu95e8%5Cu82d13%5Cu5c45%5Cu5ba4-%5Cu5357%5Cu5367%22%2C%22add_time%22%3A1561655453%2C%22usage_area%22%3A18.9%2C%22floor%22%3A%225%22%2C%22floor_total%22%3A%226%22%2C%22room_photo%22%3A%22%22%2C%22city_name%22%3A%22%5Cu5317%5Cu4eac%22%7D%7D; gr_user_id=d74f5e14-f80a-4182-a90f-2c3bba52ee6b; gr_session_id_8da2730aaedd7628=d837a451-7cd2-4519-a0bf-4b133f85d173; Hm_lvt_4f083817a81bcb8eed537963fc1bbf10=1561655454; Hm_lpvt_4f083817a81bcb8eed537963fc1bbf10=1561655454; gr_session_id_8da2730aaedd7628_d837a451-7cd2-4519-a0bf-4b133f85d173=true'
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
      if (info !== loadingImg) {
        console.log(configuration.canBuy);
        sendMail('买了买了');
        clearInterval(timer);
      } else {
        console.log(configuration.cantBuy);
      }
    });
  }, 60000);
}

main();
