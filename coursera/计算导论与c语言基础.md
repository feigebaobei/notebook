计算机的历史
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
局部性原理
程序需要转换为指令集中的二进制代码才能在cpu上运行。
指令集中的指令是cpu制造商预置到cpu的。
指令由指令+参数组成。
程序代码 --汇编--> 汇编代码 ----> 机器代码 ----> cpu
1. 程序必须经过编译后才能转换为cpu能接受的指令。
2. 一句程序可能被转换为多句指令。
3. 在控制器的协调下连续、依次执行相应的指令。
4. 程序在内存中执行。
5. 程序在执行时，在内存中的不同区域存放代码和相关的数据。
思考重于模仿
向培养计算机科学家的方向努力

no.4
训练得技能，须抓大放小，多练简单题、选一本薄书。
代码语言一共有三种句式：顺序执行、分支判断、循环。
可能会有专为mac的c++ ide
eclipse ide
netbeans
mingw
mac上使用xcode开发c++
c++标准库中的函数或对象都是命名空间std中定义的。所以在使用这些方法、对象时需要在其前面加上`std::`
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

no.6
高级程序语言的基本成分：{
  数据成分：数据类型及使用
  运行成分：运行符及使用
  控制成分：三种控制语句及使用
  传输成分：输入、输出数据
}

no.7
先定义 再使用(c中)
（变量类型）（变量标识符）
最好定义时赋值。
`int Max = 0;`
编译执行、解释执行。
```
基本数据类型： bool/char/int/浮点型(float/double)
自定义数据类型：[]/*/class/void/构造数据类型(struct/union/enum)
```
type variable;
typedof type newname; // 为type类型取一个新名字newname
```
```
整形：基本型(int)、短整形(short/short int)、长整形(long/long int)
          32bit        16bit                   32bit
2^10 = 1024
2^16 = 65536
2^32 = 4294967296
2^22 = 2147483648
编译环境不同，占内存大小不同。
c语言的标准很宽范。
visul c (简称vc)
sizeof(params) // 返回params的字节长度（xbyte）
int型数据在内存中的第一位是符号位。0：+，1：-
保存正数、负数不同。
    原码  补码
hex // 16
oct // 8
dec // 10
浮点型（实型）：float / double / long double
              32bit   64bit     64bit 精度           7位     15位       15位
`-3.4*10^38~3.4*10^38`
`-1.7*10^308~1.7*10^308`
`-1.7*10^308~1.7*10^308`
setprecision(100) // 精度100位，包括整数位。
常量使用后缀表示
```
n = 10000L;
m = -0x888abL;
k = 10000U;
i = 0777LU;
x = 3.1415F;
y = 3.1415L;
```
浮点型默认double型。
ulf都可小写。

标识符包括：字母、数字、下划线。开头必须是字母、下划线。
匈牙利命名法：{
  数据类型：一个或多个小写字母开头
  变量的用途：一个或多个大写开头的单词
}
驼峰命名法：{
  第一个单词小写首字母
  其它的单词大写首字母
}
可以在一个项目中使用多种命名法。
赋值语句有值。值是赋值符传递的值。赋值语句也是一种表达式（在c语言中）
```
a=(b=4)+(c=6) // a:10 b:4 c:6
int a = b = c = 5 // x
a = b = c = 5 // v a:5 b:5 c:5
```
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
```
int i = 3;
-i++ // -3 i:4 i++> -i
-++i // -5 -i = ++i 右结合
(-i)++ // x ++只用于变量，不用于表达式
++i++ // c中不成立。原因同上。
后置++优先级高于前置++
```
在vc里在输出里从右向左计算值。
优先级：算术运算符 > 关系运算符 > 赋值运算符
优先级：! > && > ||
! > 算术运算符 > 关系运算符 > && > || > 赋值运算符
逻辑表达式求解中，只有在必须执行下一个逻辑运算符才能求出表达式的解时，才执行该运算符。
```
(year % 4 == 0 && year % 100 != 0) || year % 400 == 0
```
逗号表达式：逗号用于将2个表达式链接起来。整个表达式的值为最后一个表达的值。
强制类型转换: `(类型名)(表达式) (double)(a)`
位运算：对二进制位（byte）的运算
& 与 `a & b`
| 或 `a | b`
^ 异或 同位的数若相同则结果为0，否则为1. `a ^ b`
~ `~a`
<< `a << 2` 若不溢出，则移多少位，则相当于乘以多少个2.
`>>` `a >> 2`
优先级： ~ > 算数运算符 > <<,>> > 关系运算符 > & > ^ > | 逻辑运算符

- 封装
抽象
继承
多态

gcc是gnu的一个编译器套件。 gnu compiler collection.
```
// usage
g++ -v // 输出g++信息
g++ path/to/file.cpp // 在当前目录中输出 `a.out`
g++ path/to/file.cpp -o path/to/fileName // 在指定目录下输出`hello`
g++ path/to/file0.cpp path/to/file1.cpp -o path/to/fileName // 合并多个文件后在指定目录下输出`hello`
```
|g++常用命令|解释||
|-|-|-|
|-ansi|只支持 ANSI 标准的 C 语法。这一选项将禁止 GNU C 的某些特色， 例如 asm 或 typeof 关键词。||
|-c|只编译并生成目标文件。||
|-DMACRO|以字符串“1”定义MACRO宏||
|-DMACRO=DEFN|以字符串“DEFN”定义"MACRO"宏||
|-E|只运行c预编译器||
|-g|生成调用信息，gnu调试器可利用该信息。||
|-IDIRECTORY|指定额外的头文件搜索路径DIRECTORY||
|-LDIRECTORY|指定额外的函数库搜索路径DIRECTORY||
|-ILIBRARY|连接时搜索指定的函数库LIBRARY||
|-M486|针对486进行代码优化。||
|-o|FILE生成指定的输出文件。用在生成可执行文件时。||
|-O0|不进行优化处理。||
|-O|或-O1优化生成代码。||
|-O2|进一步优化。||
|-O3|比-O2更进一步优化，包括inline函数。||
|-shared|生成共享目标文件。通常用在建立共享库时。||
|-static|禁止使用共享连接||
|-UMACRO|取消对MACRO宏的定义||
|-w|不生成任何警告信息||
|-Wall|生成所有警告信息||

在编译阶段g++是调用gcc的。

```
#include <iostream> // 使用include关键字引入当前程序执行时需要的依赖。这里引入了<iostream>
using namespace std; // 告诉编译器使用std命名空间。 
// main() 是程序开始执行的地方
int main()
  {
     cout << "Hello World"; // 输出 Hello World
     return 0;
  }
```

三字符组

||||
|-|-|-|
|??=|#||
|??/|`\`||
|??'|^||
|??(|[||
|??)|]||
|??!|`|`||
|??<|{||
|??>|}||
|??-|~||

当局部变量被定义时，系统不会对其初始化，您必须自行对其初始化。定义全局变量时，系统会自动初始化为下列值:
int: 0
char '\0'
float 0
double 0
pointer NULL

lambda表达式
xcode编译快捷键

结构化程序设计语言。需要三种控制成分（顺序结构、分支结构、循环结构）。

`#define N 4;`

c++不支持可变长数组。

字符数据、数组（一维数组、二维数组、三维数组、……）。
`cin/cin.get()/EOF/(c=cin.get())!=EOF/cin.get(c)/getchar()`
`cin.get(ch, number, endChar)` // 遇到终止符，停止读取，指针不移动。
`cin.getline(ch, number, endChar)` // 缓冲区指针移动终止符之后
不能用赋值语句将一个字符串常量或字符数组直接赋给另一个字符数组。

`for (len1 = 0; str[len1] != '\0'; len1++)`
`str2[len2++] += str[len1++]`


// char a[10] = {'a', 'b', 'c'}
// char a[] = {'c', 'd', 'e'}
// char a[] = "qwertgfds"
// // char a[6] = "wertytrds"
// while ((c = cin.get()) != EOF) {}
// while (cin.get(c))
// while(c = getchar()) {} // 不跳过任何字符
// char a[10] = "qwertyu"
// cin >> str;
// cin.get(ch, 10, '\n')

读入字符串
```
cin
cin >> a;
cin >> a >> b >> c;
接受一个字符串，遇“空格”、“Tab”、“回车”都结束

cin.get()
cin.get(c)
c = cin.get() // 常用于吃掉回车。
cin.get(var)
只能获取一个字符
cin.get(var, number)
可获取空格

cin.getline(var, number)
可获取空格、回车。
cin.getline(var, number[, end])
可获取空格、回车。

gets()
需包含“#include<string>
gets(m);
接收一个字符

getchar()
需包含“#include<string>
c = getchar()
接收一个字符
```

一个c程序由一个或多个源程序文件组成。
一个源程序文件可以由一个或多个函数组成。
由main()入口。

include `""` 优先当前目录，再系统目录。 `<>`在系统目录里找。

函数的类型是返回值的类型。
函数的原型 = 返回值类型 + 函数名 + 参数类型`char makes(bool, int);`

数组的名字不是变量，是常量。
当函数中的以数组为参数时，实际上传递是整个数组。数组的名字代表数据的地址。这种操作很危险。

递归
1. 连续发生的动作是什么。
2. 不同次动作间的关系。
3. 边界条件是什么。
利用递归进行“自动分析”
1. 假设有一个函数可以给出答案。
2. 该函数如何解决问题。
3. 最简单的情况下答案是什么。
双递归
`f(x) = g(x-1); g(x) = f(x) - 1;`

Xcode 出现Thread 1: signal SIGABRT
代码语言：C
出现原因：数组初始化时，循环赋值越界。

# eclipse

主要用于java开发。

## 需要的配置

toolchain(编译器、链接器、调试器)

## 运行环境

### 选择workspace

工作空间是eclipse为项目开辟的一块空间。主要用于开发。这里会保存开发时产生的代码等。有eclipse中的一切设置都会与工作空间相关联。若无必要，建议不要切换工作空间。

### 窗口组成

eclipse为程序员提供了多种窗口组合。每种组合都被称为perspective。

### 开发编程

1. 需要创建一个项目。`file > new > project`
2. 写代码。
3. 格式化代码`ctrl+a ctrl+shift+f`
4. build 点击”锤子“ `ctrl+b`
1. 执行`ctrl+f11`. console view窗口可以看到输出内容。

### 调试

1. 调试 点击”虫子“ `f11`. expression窗口可以看到变量及其值。
2. step into / step over
3. 设置断点
4. 可终止调试

c++是c的超集

gcc gnu compiler collection gnu编译器套件

# gcc与g++的区别

它是c语言的编译器。
它把源文件（人类可读懂的代码）转化为机器语言（机器可读懂的代码）`gcc -v // 查看版本`
在编译阶段g++是调用gcc的。所以二者是等价的。
它们都最编译器。都可以编译c或c++代码。

||gcc|g++|
|-|-|-|
|后缀为.c|当作c程序|当作c++程序|
|后缀为.cpp|当作c++程序|当作c++程序|
||不定义__cplusplus宏|定义__cplusplus宏|
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||

# sublime + c

1. 检查环境。

`tools > build > /是否有需要的编译方式/`

2. 安装环境。

3. 编译
```
command + b
command + shift + b
```

# c

程序需要包含`main()`函数。代码从main()函数开始执行。
1972年在dec pdp-11计算机上首次使用。
几乎所有的unix应用程序都是使用c语言写的。
1. 高效率。
2. 处理底层的活动。
3. 在多种计算机平台上编译。
vi / vim
c中的数据类型
1. 基本类型：整数类型、浮点类型
2. 枚举类型
3. void类型
4. 派生类型：指针类型、数组类型、结构类型、共用体类型、函数类型。
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
||||
sizeof()
c语言为每种数据类型设计了不同的存储方式。
float:  sign exponent fraction
        1bit   8bit    23bit
double: sign exponent fraction
        1bit   11bit   52bit
存储类
1. auto 变量默认的存储类。只能在函数内使用。
2. register 在寄存器中。
3. static 保持此变量存活。
4. extern 引用别的文件中定义的变量、方法等。
c使用传值调用。
#define ONE 1
#define TWO 2
enum DAY {
  mon = 1, tue, wed, sun
}
先定义枚举类型，再定义枚举变量。
enum DAY {...};
enum DAY day;
枚举类型连续时，才能被遍历。
int a = 1;
enum day wk = (enum day) a;
```
int *p;
int a = 0;
p = &a;
// p是地址。*p是地址对应的值。
```
`a[i] <=> *(a+i)`
```
int a[10] = {0};
int *p = null;
p = a; // 指向数组
p = *(a[3]);
```
在定义时或者和 sizeof、& 一起使用时才表示整个数组，出现在表达式中就会被转换为指向数组第 0 个元素的指针。
```
int *(p[5]) // 指针数组
int (*p)[5] // 二维数组指针
int max (int x, int y) {...}
int (*p)(int, int) = max
char a[6] = {'h', 'e', 'l', 'l', 'e', '\0'};
char g[] = "hello";
strcpy(s0, s1)
strcat(s0, s1)
strlen(s0)
strcmp(s0, s1)
strchr(s0, ch)
strstr(s0, s1)

scanf() // 
printf()
getchar() // 读取一个字符
putchar()
gets() // 
puts()
eof是文件结束的标志。
终止符 '\0'

FILE *fopen(const char * filename, const char * mode);
filename 
mode
```
编译器：词法分析、语法分析、语义分析、性能优化、生成可执行文件五个步骤。
编译：
1. 把源文件 => 二进制指令。它是中间文件（或临时文件）
链接：
1. 把二进制指令与它需要的系统组件（如标准库、动态链接库）结合起来。

`%[flag][width][.precision]type`
flag      - 左对齐
          + 右对齐
width     最小宽度
precision 精度
#         输入时加前缀（0b/0/0x）

// printf("%-9.4d")

a+=a;
a++;
++a;
强制类型转换
(type_name) expresss
%f  float
%lf double
%ld long int

scanf()       printf()
getchar()     putchar()
gets()        puts()
```
// 定义字符串
char s[20] = "sdfgh";
char *s = "sdfg";
```
// 输入
```
char c;
c = getchar();
char s[30];
gets(s);
char s2[30];
scanf("%s fromat");
```
strcat(s1, s2)
strcpy(s0, s1)
strcmp(s0, s1)

|||||
|-|-|-|-|
|scanf|`scanf("fromat%s", &s)`|||
|printf|`printf("fromat %d, %s"), i, s`|||
|gets|`gets(str)`|||
|puts|`puts(str)`|||
|getchar|`var = getchar()`|||
|putchar|`putchar(var)`|||

dataTypes fn () {
  // body
  return dataType
}

头文件里是函数的声明（不是定义）。可以把头文件的内容复制到源文件中，同样可以运行。头文件中声明的函数定义在其它源文件中。它些源文件是已经被编译好的，并以动态链接库、静态链接库（它们合称为系统库）的形式存在。

标准c语言有15个标准库。

|||||
|-|-|-|-|
|合格程序员|`<stdio.h> <ctype.h> <stdlib.h> <string.h>`|||
|熟练程序员|`<assert.h> <limits.h> <stddef.h> <time.h>`|||
|优秀程序员|`<float.h> <math.h> <error.h> <locale.h> <setjmp.h> <signal.h> <stdarg.h>`|||

c程序从main开始到main结束。main不能被其它函数调用。

预处理指令有2个：`#include / #define`(不需要;)
预处理就是预先处理、提前处理。
预处理结果保存为与源文件同名的`*.i`文件。
以`#`开头的命令就是预处理命令。
编译：vc/vs编译后为`*.obj`,gcc编译后为`*.o`。每次编译只编译一个源文件。
链接：多个目标文件+系统库=可执行程序
`<>`在系统路径中查找头文件。常用于标准头文件。
`""`先在当前目录找，再去系统路径中找。常用于自定义头文件。
宏定义
1. `#define 宏名 字符串`
2. 不加;
3. 从定义到`#undef`
4. 可嵌套
5. 大写字母
6. 可用于表示数据类型

宏定义与形参间不能有空格。
宏在预处理阶段展开为字符串。

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
4. 2个指针变量可以相减，
5. 数组是有类型的。定义数组时、使用sizeof/&时数组名表示整个数组。在表达式中数组名表示指向数组的指针。

结构体只能逐一赋值。
