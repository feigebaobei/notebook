有2种调用方式：
## 1. app调用web的方法

因app是web页面的宿主，所以app可以直接调用web的方法。

```
// web
window.sdk = {
  double = value => value * 2,
  triple = v => v * 3
}
// andriod
webview.evaluateJavascript('window.sdk.double(10)', new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String s) {
    // 20
  }
});
// ios
NSString *func = @"window.sdk.double(10)";
NSString *str = [webview stringByEvaluatingJavaScriptFromString:func]; // 20
```

## 2. web调用app的方法

### 2.1 app向web注入一个全局js对象

推荐此方法。但是可能有安全隐患。

```
// andriod
webview.addJavascriptInterface(new Object() {
  @JavascriptInterface
  public int double(value) {
    return value * 2;
  }
  @JavascriptInterface
  public int triple(value) {
    return value * 3;
  }
}, "appSdk");
// ios
NSString *scripts = @"window.appSdk = {double: value => value * 2, triple: value => value * 3}";
[webview stringByEvaluatingJavaScriptFromString:scripts];
// web
window.appSdk.double(10); // 20
```

### 2.2 web发起一个自定义协议请求

1. web定义方法。如：`window.bridge = {getDouble: v => {}}`
2. app定义协议。如：`sdk://action?params`
3. web发起协议请求。如：`location.href='sdk://double?value=10'`
4. app拦截请求，得到到参数，做相应处理，调用web的方法。

```















// web
window.bridge = {
  getDouble: value => {
    // 20
  },
  getTriple: value => {
    // more
  }
};
location.href = 'sdk://double?value=10';
// android
webview.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        // 判断如果 url 是 sdk:// 打头的就拦截掉
        // 然后从 url sdk://action?params 中取出 action 与params
        Uri uri = Uri.parse(url);
        if ( uri.getScheme().equals("sdk")) {
            // 比如 action = double, params = value=10
            webview.evaluateJavascript('window.bridge.getDouble(20)');
            return true;
        }
        return super.shouldOverrideUrlLoading(view, url);
    }
});
// ios
- (BOOL)webview:(UIWebView *)webview shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
  // 判断如果 url 是 sdk:// 打头的就拦截掉
  // 然后从 url sdk://action?params 中取出 action 与params
  NSString *urlStr = request.URL.absoluteString;
  if ([urlStr hasPrefix:@"sdk://"]) {
    // 比如 action = double, params = value=10
    NSString *func = @"window.bridge.getDouble(20)";
    [webview stringByEvaluatingJavaScriptFromString:func];
    return NO;
  }
  return YES;
}
```
