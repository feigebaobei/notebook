# ecc

ECC算法描述：

1、用户A选定一条适合加密的椭圆曲线Ep(a,b)(如:y2=x3+ax+b)，并取椭圆曲线上一点，作为基点G。 　　
2、用户A选择一个私有密钥k，并生成公开密钥（公钥PB）K=kG。 　　
3、用户A将Ep(a,b)和点（公钥）K，G传给用户B。 　　
4、用户B接到信息后 ，将待传输的明文（M）编码到Ep(a,b)上一点M，并产生一个随机整数`r（r<n）`。加密开始 　　
5、用户B计算点C1=M+rK；C2=rG。 　　
6、用户B将C1、C2传给用户A。 　　
7、用户A接到信息后，计算C1-kC2，结果就是点M。因为C1-kC2=M+rK-k(rG)=M+rK-r(kG)=M，再对点M进行解码就可以得到明文。
密码学中，描述一条Fp上的椭圆曲线，常用到六个参量： 　　T=(p,a,b,G,n,h)。 　　（p 、a 、b 用来确定一条椭圆曲线，G为基点，n为点G的阶，h 是椭圆曲线上所有点的个数m与n相除的整数部分）

这几个参量取值的选择，直接影响了加密的安全性。参量值一般要求满足以下几个条件：
1、p 当然越大越安全，但越大，计算速度会变慢，200位左右可以满足一般安全要求；
2、p≠n×h；
3、pt≠1 (mod n)，1≤t<20； 　　4、4a3+27b2≠0 (mod p)； 　　5、n 为素数； 　　6、h≤4。
