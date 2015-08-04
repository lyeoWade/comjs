
var http=require('http');

http.createServer(function (request , response){


	//request ------ >请求    浏览器->服务器  输入
	//response ------>响应    服务器->浏览器  输出
	console.log(request.url+'有人请求了asdasd');

	response.write('请求成功');
	response.end();

	
}).listen(8089);



