const Koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const qiniu = require('qiniu');

const accessKey = 'ykVzKjazGdn2WIadd8ZKuCE2IXyPaYiJ27U6aZt-';
const secretKey = 'a6cNIGt29utIFfYN6fHnQYeuOt_j_8faTrLhotxe';

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const app = new Koa();

app.use(cors());
app.use(bodyParser());

const qiniuRoute = {
  getToken(ctx) {
    const options = {
      scope: 'solar',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    ctx.body = { token };
  }
};
 
app.use(route.get('/qiniu/token', qiniuRoute.getToken));
 
app.listen(3000);

console.log('listening on port 3000');