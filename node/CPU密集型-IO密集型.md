# CPU密集型

消耗CPU资源，比如计算圆周率、对视频进行高清解码等等

最高效地利用CPU的方法：计算密集型任务同时进行的数量应当等于CPU的核心数。
解释型语言（python/js等）处理cpu密集型时一般用长较长。所以一般使用c语言处理。

# IO密集型

网络、磁盘IO
一般使用解释型语言。
