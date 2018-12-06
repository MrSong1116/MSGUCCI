var http = require("http");

http.createServer(function(request,response){

    //  发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200,{'Content-Type':'text/plain'});

    response.end("hellow")
}).listen(8888)


// 终端打印如下信息
console.log('复制打开这个网址：http://127.0.0.1:8888/');

var fs = require("fs");
// var data = fs.readFileSync("input.txt");

fs.readFile("input.txt",function(err,data){
    if(err)return console.error(err);
    console.log(data.toString())
});
// console.log(data.toString());
console.log("执行完毕");




