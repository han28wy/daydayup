
var RenderUrlsToFile, UploadFile,args;
var fs = require("fs");
var webpage = require("webpage");
var wpage = webpage.create();
// var defaultHtmlUrl = "http://mid-static-open/hjghemaildataview";
var defaultHtmlUrl = "http://172.21.39.203:9109/weeklyReport";
var defaultUpdoadUrl = "";
var renderTimeout_const = 30000;
var renderTimes_const = 3;

// var tfiles_path = '/apprun/tfiles/';
var tfiles_path = '/apprun/phantomjs-2.1.1-linux-x86_64/img/';
var ID = 1
/**
 * 抓取图片
 */
RenderUrlsToFile = function(callbackFinal) {
    wpage.viewportSize = {
        width: 2000,
        height: 581
    };
    wpage.settings.userAgent = "Phantom.js bot";

    var url = defaultHtmlUrl;
    // url = url + '?code='+ code + '&report='+report+ '&type='+type+'&name='+name+'&level='+level+'&title='+title+'&watermark='+watermark+'&auth='+auth;

    // console.log('ID:'+ ID);
    // console.log('report:'+ report);
    // console.log('code:'+ code);
    // console.log('type:'+ type);
    // console.log('url:'+ url);
    // console.log('name:'+ name);
    // console.log('title:'+ title);
    // console.log('level:'+ level);
    // console.log('watermark:'+ watermark);
    // console.log('renderTimes:'+ renderTimes);

    wpage.open(url, function(status) {
        console.log('status:'+ status);
        var filePath = tfiles_path +  'weekly_img' +'.png';
        if (status === "success") {
            console.log('render' + filePath +'--start--------------');
            window.setTimeout((function() {
                // console.log('##############################');
                var height = wpage.evaluate(function () {
                    //此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到这个js中其他变量
                    var div = document.getElementById('email-content'); //要截图的div的id
                    // console.log('div:', div.childElementCount);
                    // return div
                    // console.log(div);
                    if(div){
                        var bc = div.getBoundingClientRect();
                        // var top = bc.top;
                        // var left = bc.left;
                        // var width = bc.width;
                        var h = bc.height;
                        window.scrollTo(0, 20000);//滚动到底部
                        return h;
                    }else{
                        return 5000;
                    }

                });

                wpage.viewportSize ={
                    width: 2000,
                    height: height
                }

                wpage.render(filePath);
                setTimeout(function(){
                    console.log('render' + filePath +'--end--------------');
                    if( fs.size(filePath)){
                         //上传文件
                         console.log('uploadfile request--------------');
                        return UploadFile(filePath, ID, callbackFinal);
                    }else{
                        if(renderTimes < renderTimes_const){
                            return RenderUrlsToFile(url, callbackFinal);
                        }else{
                            callbackFinal(-2, filePath); //图片生成失败，文件不存在
                        }
                    }
                },1000);
            }), renderTimeout_const);
        }else{
            console.log('网页打开失败');
            return callbackFinal(-1);//网页打开失败
        }
    });
};

/**
 * 上传图片
 */
UploadFile = function(filePath, ID, callbackFinal){
    wpage.uploadFile('input[name=file]', filePath);
    wpage.evaluate(function (ID) {
        // document.querySelector('input[name=uploadId]').value = ID;
        document.getElementById('form').submit();
    },ID);
}


wpage.onConsoleMessage = function(msg) {
    console.log(msg);
}

wpage.onResourceReceived = function(response) {

    if(response.url && response.url.indexOf('/openAuth/weeklyData/sendMessage') > -1){
        if(response.stage == 'start'){
            console.log('uploadfile start----------------------');
        }

        if(response.stage == 'end'){
            console.log('uploadfile statusText:'+response.statusText);
            console.log('uploadfile end----------------------');
            return phantom.exit(0);
        }
    }
};

wpage.onResourceError = function(resourceError) {
    console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};
    RenderUrlsToFile(function(status,filePath){
        if (status == -1) {
            return console.log("Unable to render '" + url + "'");
        } else if(status == -2) {
            return console.log( filePath+"is not exist");
        }
        return phantom.exit(status);
    })

// }

