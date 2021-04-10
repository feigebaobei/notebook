# 计算机的历史
冯诺依曼式构成：{
  控制器
  计算器
  存储器{
    寄存器
    高速缓存
    内存
    外存
  }
  输入设备
  输出设备
}

## 局部性原理
程序需要转换为指令集中的二进制代码才能在cpu上运行。
指令集中的指令是cpu制造商预置到cpu的。
指令由指令+参数组成。
程序代码 --汇编--> 汇编代码 ----> 机器代码 ----> cpu
1. 程序必须经过编译后才能转换为cpu能接受的指令。
2. 一句程序可能被转换为多句指令。
3. 在控制器的协调下连续、依次执行相应的指令。
4. 程序在内存中执行。
5. 程序在执行时，在内存中的不同区域存放代码和相关的数据。

## 如何写代码
好程序的标准：{
  计算出正确结果，
  可被理解，
  结构清楚
}
问题-》解决方案-》程序
若没有解决方案，则不写程序。
结构化程序设计。先粗后细，先抽象后具体。直到可分解为顺序、循环、分支。:{
  程序由若干模块组成，
  模块内“高内聚”，
  模块间“低耦合”
}
金字塔原理
先写程序的轮廓，再定义变量。

## 高级程序语言的基本成分：
{
  数据成分：数据类型及使用
  运行成分：运行符及使用
  控制成分：三种控制语句及使用
  传输成分：输入、输出数据
}

## setup
需要包含main()函数。代码从main()函数开始执行。
`/**/`注释
`#include` 是一个预处理命令。用来引入头文件。
源文件的扩展名是`.c`
源文件是给人读的。把它编译为机器语言可以让机器读。需要使用编译器。GNU/HP/Solaris
```
// 写一个hello.c
$ gcc hello.c // 生成 a.out
$ .a.out
hello world.
```
先写变量名，现在先变量的数据类型。
1972年在dec pdp-11计算机上首次使用。
几乎所有的unix应用程序都是使用c语言写的。
1. 高效率。
2. 处理底层的活动。
3. 在多种计算机平台上编译。
vi / vim

一个c程序由一个或多个源程序文件组成。
一个源程序文件可以由一个或多个函数组成。
由main()入口。
include `""` 优先当前目录，再系统目录。 `<>`在系统目录里找。

# 变量
先定义 再使用(c中)
c中的数据类型
1. 基本类型：整数类型、浮点类型
2. 枚举类型
3. void类型
4. 派生类型：指针类型、数组类型、结构体类型、共用体类型、函数类型。
```
基本数据类型： bool/char/int/浮点型(float/double)
自定义数据类型：[]/*/class/void/构造数据类型(struct/union/enum)
sizeof(p) // 返回p的字节长度（x byte）
```
赋值语句有值。值是赋值符传递的值。赋值语句也是一种表达式（在c语言中）

|类型|存储大小(单位：byte)|值范围|
|-|-|-|
|char|1|`-128~127 / 0~255`|
|unsigned char|1|0-255|
|signed char|1|`-128~127`|
|int|2/4||
|unsigned int|2/4||
|short|2||
|unsigned short|2||
|long|4||
|unsigned long|4||

### int
整形：基本型(int)、短整形(short/short int)、长整形(long/long int)
          32bit        16bit                   32bit
2^10 = 1024
2^16 = 65536
2^32 = 4294967296
2^22 = 2147483648
编译环境不同，占内存大小不同。
c语言的标准很宽范。
int型数据在内存中的第一位是符号位。0：+，1：-
保存时使用补码。
hex // 16
oct // 8
dec // 10

## float
浮点型（实型）：float / double / long double
              32bit   64bit     64bit 
精度           7位     15位       15位
float:  sign exponent fraction
        1bit   8bit    23bit
double: sign exponent fraction
        1bit   11bit   52bit
`-3.4*10^38~3.4*10^38`
`-1.7*10^308~1.7*10^308`
`-1.7*10^308~1.7*10^308`
setprecision(100) // 精度100位，包括整数位。
`%[flag][width][.precision]type`
flag      - 左对齐
          + 右对齐
width     最小宽度
precision 精度

## enum
```
enum DAY {
  mon = 1, tue, wed, sun
}
enum DAY day;
int a = 1;
enum day wk = (enum day) a;
```
枚举类型连续时，才能被遍历。

## 指针
保存一个内存地址
每一个变量都有一个内存位置，每个内存位置都可以使用连字符&得到。
指针表示在内存中的一个地址。
```
int *(p[5])                   // 指针数组。   p是一个数组，它的5个指针变量组成。
int (*p)[5]                   // 二维数组指针。p是一个指针变量。所指向的东西是长度为5的数组。
int max (int x, int y) {...}
int (*p)(int, int) = max      // 函数指针
char a[6] = {'h', 'e', 'l', 'l', 'e', '\0'};
char g[] = "hello";
FILE fp = fopen("path", "r") // 文件指针
```
数组名和数组首地址不总是等价的。
数组指针：指向数组的指针。`int *p = arr;`
指向数组的元素。`int *p = &(arr[0]);`
访问数组元素的方法：
1. 使用下标。`arr[i]`
2. 使用指针加、减相应的序号。`*(p+i)`
像数组、字符串、动态分配的内存都使用它们的指针传入函数。
指针函数是返回指针的函数。

1. 指针变量执行减加运算时，表示指向前、后一个数据。
2. 不赋值一个常量。
3. 赋值给指针变量的变量必须被初始化。
4. 2个指针变量可以相减，结果表示二者相关多少个元素。不同数组内的指针相减没有意义。
5. 数组是有类型的。定义数组时、使用sizeof/&时数组名表示整个数组。在表达式中数组名表示指向数组的指针。

## 结构体

结构体只能逐一赋值。
结构体是一种数据类型。它是一种创建变量的模板，编译器不为它分配内存空间。
结构体变量是包含一个实实在在的数据，占用内存。
```
struct stu {
    type memberName;
    struct point p1;
    struct point p2;
    ...
}
struct stu *pstu = &stu0; // 得到结构体变量的地址
(*pstu).memberName;
pstu->memberName;
```

## 联合体

```
// defined
union u_tag {
    type memberName;
    ...
}
// use
u_tag.memberName;
pu->memberName;
```
联合体（共用体）占内存为成员列表中最大的成员决定。

## typedef
为指定类型定义新的名称
`typedef oldName newName;`
`typedef unsigned char BYTE;` 为单字节数字定义了一个术语BYTE。然后就可以使用这个新的数据类型定义结构变量。
```
typedef struct tnode {
    char *word;
    int count;
    Treeptr left;
    Treeptr right;
} Treenode;
```

|typedef|#define||
|-|-|-|
|仅限于为类型定义符号名称|不仅可以为类型定义别名，也能为数值定义别名，比如您可以定义 1 为 ONE。||
|是由编译器执行解释的|语句是由预编译器进行处理的。||

## 运算优先级
! > 算术运算符 > 关系运算符 > && > || > 赋值运算符、
逻辑表达式求解中，只有在必须执行下一个逻辑运算符才能求出表达式的解时，才执行该运算符。

## 类型转换
```
// 横向平级、竖向越级。高级在上。
double <-- float
  ^
  |
  |
long
  ^
  |
  |
unsigned
  ^
  |
  |
int <-- char / short
```
强制类型转换: `(类型名)(表达式) (double)(a)`

# 位运算
对二进制位（byte）的运算
& 与 `a & b`
| 或 `a | b`
^ 异或 同位的数若相同则结果为0，否则为1. `a ^ b`
~ `~a`
<< `a << 2` 若不溢出，则移多少位，则相当于乘以多少个2.
`>>` `a >> 2`
优先级： ~ > 算数运算符 > <<,>> > 关系运算符 > & > ^ > | 逻辑运算符

# 存储类
1. auto     变量默认的存储类。只能在函数内使用。 只能定义局部变量
2. register 在寄存器中。
3. static   保持此变量存活。                   只能定义局部变量
4. extern   引用别的文件中定义的变量、方法等。

# 预处理
预处理指令有2个：`#include / #define`(不需要;)
以`#`开头的命令就是预处理命令。

## 宏
宏定义
1. `#define 宏名 字符串`
2. 不加;
3. 从定义到`#undef`
4. 可嵌套
5. 大写字母
6. 可用于表示数据类型
宏定义与形参间不能有空格。
宏在预处理阶段展开为字符串。
```
#define ONE 1
#define TWO 2
```

## include
include `""` 优先当前目录，再系统目录。 `<>`在系统目录里找。
预处理器最多允许 15 层的嵌套包含。
使用条件编译可避免重复包含。

标准c语言有15个标准库。
|||||
|-|-|-|-|
|合格程序员|`<stdio.h> <ctype.h> <stdlib.h> <string.h>`|||
|熟练程序员|`<assert.h> <limits.h> <stddef.h> <time.h>`|||
|优秀程序员|`<float.h> <math.h> <error.h> <locale.h> <setjmp.h> <signal.h> <stdarg.h>`|||

# 编译

编译：vc/vs编译后为`*.obj`,gcc编译后为`*.o`。每次编译只编译一个源文件。
```
编写         编译                   连接                     运行
编写代码*.c -------》 目标文件*.obj -------》 可运行文件 ------》 运行
```
编译器：词法分析、语法分析、语义分析、性能优化、生成可执行文件五个步骤。
编译：
1. 把源文件 => 二进制指令。它是中间文件（或临时文件）
链接：
1. 把二进制指令与它需要的系统组件（如标准库、动态链接库）结合起来。

条件编译
```
#if 整型常量表达式1
code0
#elif
code1
#elif
code2
#endif

#ifdef 宏名 若定义了该宏则执行
code0
#else
code1
#endif

#ifndef 宏名 若宏未被定义则执行
code0
#else
code1
#endif
```

## gcc与g++的区别

它是c语言的编译器。
它把源文件（人类可读懂的代码）转化为机器语言（机器可读懂的代码）`gcc -v // 查看版本`
在编译阶段g++是调用gcc的。对于编译代码来说使用谁都一样。
它们都最编译器。都可以编译c或c++代码。

||gcc|g++|
|-|-|-|
|后缀为.c|当作c程序|当作c++程序|
|后缀为.cpp|当作c++程序|当作c++程序|
||不定义__cplusplus宏|定义__cplusplus宏|

# 连接
链接：多个目标文件+系统库=可执行程序

# 输入&输出

|输入|输出|表达式|表达式|demo|
|-|-|-|-|-|
|scanf|printf|scanf(express, address)|printf(express, p)||
|gets|puts|gets(strArr, "str")|puts(strArr, "str")||
|getchar|putchar|var c = getchar()|putchar(c)||
|getc|putc||||
|fgetc|fputc|var char = fgetc(fp)|fputc(char, fp)||

# 操作文件

打开文件 -- 读写文件 -- 关闭文件
获取文件的相关信息。
文件流：数据在文件与内存间的传递。
文件保存在磁盘。
输入流：数据从文件复制到内存的过程。
输出流：从内存保存到文件的过程。
数据流：数据源和程序间传递的过程。

## 打开
fopen()返回：文件名、文件状态、当前读写位置等信息的结构体变量的地址。
```
FILE *fp;
// 打开文件失败会返回null.
// 当失败时停止操作文件。
if ((fp=fopen("D://demo.txt", "rb") == null) {
  printf("fail to open file");
  exit(0);
}
```
## 控制文件的权限字符串
||||
|-|-|-|
|r|只读||
|w|写入。若不存在则创建一个新的。若存在则清空内容。||
|a|追回。若不存在则创建一个新的。若存在则追加内容。||
|r+|读写。可读可写。若不存在则打开失败。||
|w+|写入/更新。若不存在则创建一个新的。若存在则清空内容。||
|a+|追加/更新。若不存在则创建一个新的。若存在则追加内容。||
|t|打开方式：文本文件||
|b|打开方式：二进制文件||

## 关闭
`int fclose(FILE *fp)`
```
fgetc(fp);
fputc(fp);
fgets(str, n, fp);
fputs(str, fp);
fread(ptr, size, count, fp);
fwrite(ptr, size, count, fp);
fscanf(fp, format, ...);
fprintf(fp, format, ...);
rewind(fp);
fseek(fp, offset, origin);
```
EOF <=> end of file

# 流
流(stream)是程序输入或输出的一个连续的字节序列
 stdin        标准输入           键盘
 stdout       标准输出            屏幕
 stderr       标准错误            屏幕
 stdprn       标准打印机          LPT1端口
 stdaux       标准串行设备        COM1端口
