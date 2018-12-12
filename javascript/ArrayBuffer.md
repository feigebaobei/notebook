
#二进制数组

由三部分组成：  
ArrayBuffer 内存中的一段二进制数据。通过视图进行操作。  
TypedArray 用来生成内存的视图。通过9个构造函数（Int8Array, Uint8Array, Uint8CArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array）可以生成9种数据格式的视图。  
DataView 用来生成内存的视图。可以自定义格式和字节序。  

创建存放二进制数据的内存空间（连续的）`let buffer = new ArrayBuffer(32)`  
若要操作这段内存空间需要使用视图（TypedArray视图、DataView视图）`let dataView = new DataView(buffer); dataView.getUint8(0) // 以uint8的格式读取第0位的数据`  

##ArrayBuffer  

1. 表示通用的、固定长度的原始的二进制数据缓冲区。它是把这些数据放在缓冲区。它的长度在初始化时必须设置，且长度不能改变。  
2. 初始化时必须使用`let arrBf = new ArrayBuffer(10)`。在内存中创建一段连续的区域用来存放数据。  
3. 初始化的内容都是0.  
4. 0 < 长度 < 2 ** 53 否则会报异常。  
2. 不能直接操作。需要通过类型数组对象、DataView对象来操作。  
3. 将缓冲区的内容表示为特定的格式。  
4. 它的出现方便了js与显卡间的大数、实时数据交换。使js可以直接操作内存。  

###api

|名称|说明|参数|返回|
|-|-|-|-|
|属性||||
|length||||
|方法||||
|.isView(arg)|参数是否是ArrayBuffer的视图实例|-|Boolean|
|.transfer(oldBuffer [, newByteLength])|从oldBuffer上截取指定长度的数据做为新ArrayBuffer对象并返回，若不够就用0补|||
|.slice()||||
|||||
|||||
|||||
|||||

##TypedArray  

##DataView  
