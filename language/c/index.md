# c
## typedef

为指定类型定义新的名称

`typedef unsigned char BYTE;` 为单字节数字定义了一个术语BYTE。然后就可以使用这个新的数据类型定义结构变量。

|typede|#define||
|-|-|-|
|仅限于为类型定义符号名称|不仅可以为类型定义别名，也能为数值定义别名，比如您可以定义 1 为 ONE。||
|是由编译器执行解释的|语句是由预编译器进行处理的。||

## 类型转换

(type_name) expression

```
int sum = 17, count = 5;
double mean;
mean = (double) sum / count;
printf("Value of mean: %f\n", mean);
```

## c 库函数

string.h 库
||||
|-|-|-|
|strcpy|char *strcpy(char *dest, const char *src)|把src把指向的字符串复制给dest|
||||
||||
||||
||||
||||

## 指针

每一个变量都有一个内存位置，每个内存位置都可以使用连字符&得到。
指针表示在内存中的一个地址。

```
#include <stdio.h>
int main ()
{
  int var1;
  char var2[10];
  printf("var1变量的地址：%p\n", &var1);
  printf("var2变量的地址：%p\n", &var2);
  return 0;
}
```

`type *var-name;`
type 指针的基类型
var-name 变量的名称
`*` 表示该变量是指针
```
int *ip;
double *dp;
float *fp;
char *ch;
```
不同类型的指针指向的变量、常量的数据类型不同。指针的值都是一个代表内存地址的16进制数。
使用`*`返回操作数所指向地址的变量的值。
```
int var = 20;
int *p;
p = &var;
printf(&var) // bffd8b3c
printf(p) // bffd8b3c
printf(*p) // 20
```
初始化指针为NULL是一个良好的习惯。`int *p = NULL` // 0x0
检查空指针`if(ptr)  if(!ptr)`

### 指针的算术运算

因指针指向的是内存中的数据地址。所以指针在递增、增减时会改变指向，即指向下一个元素的存储单元、上一个元素的存储单元。
指针递增、递减时跳跃的字节数取决于指向数据类型的长度。如指向int型，在递增时每次增加4个字节。（1000 => 1004）

### 指针数组

`int *ptr[MAX];`

### 指向指针的指针

`int **ptr;`
```
int var;
int *ptr;
int **pptr;
var = 3000;
ptr = &var;
pptr = &ptr;
```

### 从函数返回指针

```
// 声明一个返回指针的函数
int * myFn() {
  ...
  // 不支持调用函数时返回局部变量，除非定义局部变量为static变量。
}

```



