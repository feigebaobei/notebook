mongodb 是由c++语言编写的。基于分布式文件存储的开源数据库。 => 方便扩展  
将数据保存为一个文档。数据结构由kv对组成。  

##concept

||||
|-|-|-|
|database|数据库|多个集合|
|collection|集合|多个文档是一个集合。{},{},{}|
|document|文档|一个{...}就是一个文档|
|field|域||
|index|索引||
|primary key|主键||  

**基本command line**  

show dbs // 显示全部的db  
use dbname // 使用dbname 数据库  

**db命名**  

- 不能有空格  
- 不能有.$/\  
- 全部小写
- 最多64字节（也就是最多64个字母）  

###db

元数据  

dbname.system.*  // namespaces/indexes/profile/users  
dbname.local.sources  

数据类型  

||||
|-|-|-|
|String|||
|Integer|||
|Boolean|||
|Double|||
|Min/Max keys|||
|Array|||
|Timestamp|||
|Object|||
|Null|||
|Symbol|||
|Date|||
|Object ID||类似唯一主键。可以很快生成的排序。包含12bytes。由4个字节表示unix时间，之后3个字节是机器标识码，再之后2个字节是由进行id组成的pid，最后3个字节是随机数。|
|Binary Data|||
|Code|||
|Regular expression|||  

###document

文档必须有一个`_id`。默认是ObjectID对象。  
ObjectID可以使用`getTimestamp()`方法得到创建时间。  

##连接mongodb

    mongodb://[username:password@]host1[:port1][,host2[:port2]],...[/[database][？options]]

mongodb:// 固定的格式，必须要指定。  
username:password@ // 可选项。  
host1 // 至少指定一个host。  
post // 可以省略，默认为27017  
/database // 若指定username:password@。连接登录指定数据库。若不指定默认打开test数据压力开关。  

?options // 是连接选项。若不使用/database，则前面需要加上/。所有连接选项都是kv格式。多个连接选项之间使用&或;隔开。  

**options**  

||||
|-|-|-|
|replicaSet=name|验证replica set 的名称。Impliesconnect=replicaSet.||
|key|||
|key|||
|key|||
|key|||
|key|||
|key|||
|key|||
|key|||  

##关闭mongodb

    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/mongotest', {useNewUrlParse: true}, (err, client) => {
      console.log('connected to mongdb')
      client.close() // 关闭mongodb
    })

**创建数据库**  

    use dbname // 或使用数据库

**删除数据库**  

    db.dropDatabase()

##集合

    show collections // 查看所有集合
    db.createCollection(name, options) // 创建集合
    db.collectionname.drop() // 删除指定集合。若删除成功则返回true.否则返回false.

**options**  

||||
|-|-|-|
|capped|Boolean|是否创建固定大小的集合。当文档达到最多时，会自动覆盖最早的文档。|
|autoIndexId|Boolean|默认为false。是否在_id字段创建索引。|
|size|Number|指定集合的最大值（以字节算）。若指定capped为true则需要指定该值。|
|max|Number|指定集合中文档的最大数量。|  

##文档

    db.collectionname.insert(document) // 给指定集合插入文档
    db.collectionname.update(<query>, <update>, {
      upsert: <boolean>,
      multi: <boolean>,
      writeConcern: <document>
    })
    // query update的查询条件。
    // update update对象和一些更新的操作符（$,$inc,$set...）
    // upsert 若不存在update的数据就插入一条新数据
    // multi 是否只更新第一条记录，否则更新全部数据
    // writeConcern 抛出异常的级别

    db.collectionname.save(<document>, {writeConcern: <document>}) // 使用传入的文档来替换已有的文档.  

    db.user.find()

    db.collectionname.remove(<query>, {justOne: Boolean, writeConcern: <document>}) // 删除文档
    // query 删除文档的条件
    // justOne Boolean 是否删除一个匹配的文档。否则删除全部。
    // writeConcern 抛出异常的级别
    db.collectionname.remove({}) // 删除指定文档内所有数据
    db.collectionname.find(query, projection).pretty()
    // query 查询条件
    // projection
    // 条件操作符 $gt $gte ... 

    db.collectionname.remove({})

##node操作mongodb(基础)

总共分三步:  

1. 引入mongodb.MongoClient    
1. 连接mongodb  
2. 创建/连接collection  
3. 操作数据库  

```
    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/mongotest', {useNewUrlParse: true}, (err, client) => {
      let students = client.db('students')
      // students.createCollection('site') //创建集合
      // 链接集合
      students.collection('site').find({}) // 操作db
    })
```

##node操作mongodb的api

