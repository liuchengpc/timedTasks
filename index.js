const schedule = require("node-schedule");
const request = require('request');




var resData = {
    "msgtype": "news", // 消息类型，此时固定为news
    "news": {
        "articles" : [  //图文消息，一个图文消息支持1到8条图文
            {
                "title" : "每日健康情况收集",//标题，不超过128个字节，超过会自动截断
                "description" : "为避免新型冠状病毒在公司内传播，请各位如实填写此收集表。祝各位同事及家人身体健康!",//描述，不超过512个字节，超过会自动截断
                "url" : "https://wj.qq.com/s2/8027149/2df3/",// 点击后跳转的链接。
                "picurl" : "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdocs.ebdoor.com%2Fimage%2Fproductimage%2F0%2F1681%2F16812595_1.jpg&refer=http%3A%2F%2Fdocs.ebdoor.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615264600&t=cef3d5bf755deba27283540634e11ed7"//图文消息的图片链接，支持JPG、PNG格式，较好的效果为大图 1068*455，小图150*150。
            }
        ]
    }
};

var rule=function requestfun() {
    // url 为企业机器人的webhook
    request({
        // url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ae754e44-3b89-4c11-b067-cbe75a25fbd1",//公司
        url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=a34b94d8-74fd-4841-9fc9-117f3701ef18",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(resData)
    }, function (error, response, body) {
        console.log('提示成功！');
    });
}

const scheduleCronstyle = () => {
    //周一到周日，每天12点41分0秒的时候执行 requestfun()；
    // schedule.scheduleJob('0 41 12 * * 0-7', () => {
    schedule.scheduleJob('1 */5 * * * *', () => {
        rule();
        console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();
console.log('Start successfully');




