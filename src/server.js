const Koa = require('koa');
const server = new Koa();
const route = require('koa-route');
const axios = require('axios');

let getOfficialUnionID = async ctx => {
    let query = ctx.querystring
    let req_url = "http://172.81.210.155:7300/mock/602f0cfcfb801d00637b5f79/wxService/cgi-bin/user/info?" + query

    try {
        const res = await axios({
            method: 'get',
            url: req_url
        });
        if (res.status === 200) {
            // 返回数据
            ctx.response.body = res.data.qya_data;
            // 设置响应头
            ctx.set('Content-Type', 'application/json')
        } else {
            ctx.status = res.status;
            ctx.body = {
                success: false,
            };
            ctx.set('Content-Type', 'application/json')
        }
    } catch (e) {
        console.log("error: " + e )
        ctx.body = {
            success: false,
        };
        ctx.set('Content-Type', 'application/json')
    }
}

server.use(route.get('/mock/cgi-bin/user/info', getOfficialUnionID));

server.listen(7310);
