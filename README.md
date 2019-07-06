# 自如配置中房源监控

监控自如配置中房源是否可预定，若处于可预订状态，发送通知到指定邮箱。

## 安装
```
git clone git@github.com:haoye999/ziru-robot.git
cd ziru-robot
npm i
```

## 使用
在文件夹根目录创建 'config.js' 文件。

配置例如：
```js
module.exports = {
  user: 'from@example.com',
  pass: 'password', // 有些邮箱填写 IMAP/SMTP 授权码
  to: 'to@exaple.com',
  Cookie:
    'your Cookie', // 自如会通过 ip 检测所在地返回相应的站点，若部署到其他地区服务器，先获取监控地区站点对应的 Cookie，若服务器与监控地区相同，~~可忽略~~
  id: '205172' // 房源id
};

```

```
npm run start
```