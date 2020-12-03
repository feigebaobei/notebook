# header

Accept-Encoding与Content-Encoding是一种前后端协商的表现。
请求头中使用Accept-Encoding表明，希望得到的编码格式。
回馈头中使用Content-Encoding表明，当前内容使用的编码方式。
优点是减少网络传输量。缺点是会增加服务端的压力，一般当服务器的使用率超过80%时不使用压缩。

|Accept-Encoding||||
|-|-|-|-|
|gzip|使用lempel-ziv coding压缩算法|||
|compress|lempel-ziv-welcom压缩算法|||
|deflate|采用zlib结构和deflate解压算法|||
|br|采用brotli算法|||
|identity|指代自身|||
|*|算法之间无优先次序|||
|;q=(qvalues weighting)|表示优先次序|||

|Content-Encoding||||
|-|-|-|-|
|gzip||||
|comress||||
|deflate||||
|identity||||
|br||||
