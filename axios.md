#axios notebook  

##Feature  

1. 在浏览器里创建xhr对象。
2. 从node.js里创建http请求。
3. 支持Promise API。
4. 拦截请求和回应。
5. 转换请求的数据和回应的数据。
6. 取消请求。
7. 自动转换为json对象。
8. client side support for protecting against [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)  

##Install  

- using npm(or cnpm):  
>     npm install axios

- using bower:
>     bower install axios

- using cdn:
>     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  

**tip:** 使用jsDelivr CDN可以提高加载速度  

##Example  

**perform a GET request**  

	// make a request for a user with a given ID
	axios.get('/user?ID=12345')
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});
	// optionally the request above could also be done as
	axios.get('/user', {
		params: {
			ID: 12345
		}
	})
	.then(function(){
		console.log(response);
	})
	.catch(function(){
		console.log(error);
	});

**perform a POST request**  

	axios.post('/user', {
		firstName: 'Fred',
		lastName: 'Flintstone'
	})
	.then(funtion(response){
		console.log(response)
	})
	.catch(function(error){
		console.log(error)
	})

**performing multiple concurrent requests**  

	function getUserAccount() {
		return axios.get('/user/12345');
	}
	function getUserPermissions() {
		return axios.get('/user/12345/permissions');
	}
	axios.all([getUserAccount(), getUserPermissions()])
		.then(axios.spread(function(acct, perms){
		//Both requests are now complete
	}))

##axios API  

Requests can be made by passing relevant config to axios.  

**axios(config)**  

	// send a POST request
	axios({
		method: 'post',
		url: '/user/12345',
		data: {
			firstName: 'Fred',
			lastName: 'Flintstone'
		}
	});

	// get request for remote image
	axios({
		method:'get',
		url:'http://bit.ly/2mTM3nY',
		responseType:'stream'
	})
	.then(function(response){
		response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
	});

**axios(url[,config])**  

	//send a GET request (default method)
	axios('/user/12345')

**Request method aliases**  

For convenience aliases have been provided for all supported request methods.  
为了方便，我们为全部的请求方法都提供了别名。  

**axios.request(config)**  
**axios.get(url[, config])**  
**axios.delete(url[, config])**  
**axios.head(url[, config])**  
**axios.options(url[, config])**  
**axios.post(url[, config])**  
**axios.put(url[, config])**  
**axios.patch(url[, config])**  

**note:**When using the alias methods url, method, add data properties don't need to be specified in config.  
**笔记：**在使用这些别名的时候不必明确配置url/method/data。  

**Concurrency**(并发性，同时发生)  

helper function for dealing with concurrent requests.

**axios.all(iterable)**  
**axios.spread(callback)**  

**Creating an instance**  

You can create a new instance of axios with a custom config.  
我们可以创建一个自定义的axios实例。

**axios.create([config])**  

	var instance = axios.create({
		baseURL: 'https://some-demain.com/api',
		timeout: 1000,
		headers: {'X-Custom-Header': 'foobar'}
	})

**Instance methods**  

The available instance methods are listed below.The specified config will be merged with the instance config.  
实例的方法已经列在下面了。使用实例的配置做为配置。  

**axios#request(config)**  
**axios#get(url[, config])**  
**axios#delete(url[, config])**  
**axios#head(url[, config])**  
**axios#options(url[, config])**  
**axios#post(url[, data[, config]])**  
**axios#put(url[, data[, config]])**  
**axios#patch(url[, data[, config]])**  

##Request Config  

These are the avaibable config options for making requests. Only the url is required. Requests will default go GET if method is no specified.  
下面是创建请求的配置选项。只有url是必须的。method的默认值是GET。  

	{
		url: '/user',
		method: 'get',// default
		transformRequest: [ function (data, headers) {//可以做数据预处理
			return data;
		}],
		transformResponse: [ function (data) {
			return data;
		}],
		params: {
			ID: 12345
		},
		paramsSerializer: funcion(params){// 串连参数
			return Qs.stringify(params, {arrayFormat: 'brackets'})
		},
		data: {
			firstName: 'Fred'
		},
		timeout: 1000,
		withCredentials: false,//default
		adapter: function (config){
			//code
		},
		auth: {
			username: 'janedoe',
			password: 's00pers3cret'
		},
		responseType: 'json',//default
		xsrfCookieName: 'XSRF-TOKEN',//default
		xsrfHeaderName: 'X-XSRF-TOKEN',//default
		onUploadProgress: function(progressEvent) {
			//code
		},
		onDownloadProgress: function(progressEvent) {
			//code
		},
		maxContentLength: 2000,//规定请求的内容的最大字符量。
		validateStatus: functions ( status ) {//验证状态码
			return status >= 200 && status < 300; // default
		},
		maxRedirect: 5,// default //f规定最大重定向的次数。
		httpAgent: new http.Agent({ keepAlive: true }),
		httpsAgent: new https.Agent({ keepAlive: true }),
		proxy: {
			host: '127.0.0.1',
			port: 9000,
			auth: {
				username: 'mikeymike',
				password: 'rapunz31'
			}
		},
		cancelToken: new CancelToken(function(cancel){})
	}

##Response Schema(返回概要)  

the response for a request contains the following information.  
根据请求会返回的信息包括以下内容。  

	{
		data: {},
		status: 200,
		statusText: 'OK',
		headers: {},
		config:{},
		request: {}
	}

when using then, you will receive the response as follows:

	axios.get('/user/12345')
		.then(function(response){
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		});

When using catch, or passing a rejection callback as second parameter of then, the response will be available through the error object in the Handling Errors section.  

##Config Defaults  

You can specify config defaults that will be applied to every request.  

##Global axios defaults  

**Global axios defaults**  
	axios.defaults.baseURL = 'https://api.example.com';
	axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	axios.defaults.header.post['Content-Type'] = 'application/x-www-form-urlencoded';

**Custom instance defaults**  

	// set config default when creating the instance
	var instance = axios.create({
		baseURL: 'https://api.example.com'
	})

**Config order of precedence(配置的优先条件)**  

Config will be merged with an order of precedence. The order is library defaults found in lib/defaults.js, then defaults property of the instance, and finally config argument for the request. The latter will take precedence over the former. Here's an example.  
所有的配置条件会被合并为一个。最后面的会优先于前面的。默认的配置文件 在lib/defaults.js。下面是一个例子  

	var instance = axios.create();
	instance.default.timeout = 2500;
	instance.get('/longRequest', {
		timeout:5000
	});

##Interceptors（拦截）  

You can intercept requests or responses before they are handled by then or catch.  
我们可以拦截请求、回应然后在then或者catch里面操作。  

	axios.interceptors.request.use(function(config) {
		return config;
	}, function(error) {
		return Promise.reject(error);
	});

	axios.interceptors.response.use(function(response) {
		return response;
	}, function(error) {
		return Promise.reject(error);
	});

if you may need to remove an interceptor later you can.  

	var myIntercepter = axios.interceptors.request.use(function() {
		//code
	});
	axios.interceptors.request.eject(myInterceptor);

You can add interceptors to a custom instance of axios.  

	var instance = axios.create();
	instance.interceptions.request.use(function(){
		//code
	});

**Handling Errors（处理错误）**  

	axios.get('/user/12345')
		.catch( function ( error ) {
			if(error.response) {
				//code
			} else if ( error.response ) {
				//code
			} else {
				//code
			}
			console.log(error.config);
		});

You can define a custom HTTP status code error range using the validateStatus config option.  
我们可以根据状态码范围分别处理。  
	
	axios.get('/user/12345', {
		validateStatus: function (status) {
			return status < 500; // Reject only if the status code is greater than or equal to 500
		}
	})

**Cancellation（取消）**  

You can cancel a request using a cancel token.You can create a cancel token using the CancelToken.source factory as shown below:  
我们可以使用CancelToken.source工厂取消。

	var CancelToken = axios.CancelToken;
	var source = CancelToken.source();
	axios.get('/user/12345', {
		cancelToken: source.token
	}).catch(function(thrown){
		if ( axios.isCancel(thrown)) {
			console.log('Request canceled', thrown.message);
		} else {
			// headle error
		}
	});
	source.cancel('Operation canceled by the user.');

You can also create a cancel token by passing an executor function to the CancelToken constructor:  
我们可以使用一个方法去取消请求。  

	var CancelToken = axios.CancelToken;
	var cancel;
	axios.get('/user/12345', {
		cancelToken: new CancelToken(function executor(c){
			cancel = c;
		})
	});
	cancel();

**Note:** you can cancel several requests with the same cancel token.  

##Using application/x-www-form-urlencoded format  

By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use one of the following options.  
默认情况下axios会串连起js对象成为json对象。然后把json对象用application/x-www-form-urlencoded方式传递。我们可以使用以下的方法。  

**Brower**  

In a browser, you can use the URLSearchParams API as follows:  

	var params = new URLSearchParams();
	params.append('param1', 'value1');
	params.append('param1', 'value1');
	axios.post('/foo', params);

**Note** that URLSearchParams is not supported by all browsers (see caniuse.com), but there is a polyfill available (make sure to polyfill the global environment).  

Alternatively, you can encode data using the qs library:  
还可以使用qs库。  

	var qu = require('qs');
	axios.post('/foo', qs.stringify({'bar':123}));

**node.js**  

In node.js, you can use the querystring module as follows:  

	var querystring = require('querystring');
	axios.post('http://something.com/', querystring.stringify({foo:'bar'}))

You can also use the qs library.  

##Semver  

Until axios reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.5.1, and 0.5.4 will have the same API, but 0.6.0 will have breaking changes.  

##Promises  

axios depends on a native ES6 Promise implementation to be supported. If your environment doesn't support ES6 Promises, you can polyfill.  

##TypeScript  

axios includes TypeScript definitions.  

	import axios from 'axios';
	axios.get('/user?ID=12345');

***  

2018/1/7 12:08:30 by stone