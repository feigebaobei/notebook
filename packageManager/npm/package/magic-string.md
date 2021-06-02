# overview
可以修改源代码的库。
- 替换指定代码。
- 设置header/footer。
- 在文件尾部添加source map

# install
`npm i magic-string`
`<script src="magic-string.umd.js"></script>`

# usage
```
var MagicString = require( 'magic-string' );
var s = new MagicString( 'problems = 99' );
 
s.overwrite( 0, 8, 'answer' );
s.toString(); // 'answer = 99'
 
s.overwrite( 11, 13, '42' ); // character indices always refer to the original string
s.toString(); // 'answer = 42'
 
s.prepend( 'var ' ).append( ';' ); // most methods are chainable
s.toString(); // 'var answer = 42;'
 
var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true
}); // generates a v3 sourcemap
 
require( 'fs' ).writeFile( 'converted.js', s.toString() );
require( 'fs' ).writeFile( 'converted.js.map', map.toString() );
```
```
var s = new MagicString(somecode, {
    filename: 'foo.js',
    indentExclusionRanges: [/*...*/]
    })
```

# api
|method|description|return|||
|-|-|-|-|-|
|addSourceMpatLocation(index)|把指定的内容添加到source map中添加到指定的位置。若不设置则不添加。||||
|append(content)|添加指定内容到字符串后面。|this|||
|appendLeft(index, context)|在index插入content.||||
|appendRight(index, content)|-||||
|clone()|执行||||
|generateDecodedMap(options)|生成一个数组形式的生成的source map.||||
|generateMap(options)|生成一个v3版本的source map||||
||options||||
|||file|需要写source map的文件||
|||source|包含原始码的文件的文件名||
|||includeContent|在map的sourceConent数组中是否包含原始代码。||
|||hires|-||
|||toString|JSON.stringify(map)||
|||toUrl|-||
|indent(prefix[, options])|每一行的前缀||||
|move(start, end, newIndex)|从start到end的代码移到index。|this|||
|overwrite(start, end, content[, options])|从start到end的代码代替为content。||||
|prepend(content)|在string前面添加content|this|||
|prependLeft(index, content)|-||||
|remove(start, end)|||||
|slice(start, end)|返回源代码的start-end的代码转换为了内容。也可能抛出错误。||||
|snip(start, end)|-||||
|trim([charType])|删除匹配charType的内容。||||
|trimStart([charType])|-||||
|trimEnd([charType])|-||||
|trimLine()|删除空行||||
|isEmpty(index)|-||||

# bundling
把多个原代码连接在一起，请使用`MagicString.Bundle`
```
var bundle = new MagicString.Bundle(); // 得到MagicString的实例。
 
bundle.addSource({
  filename: 'foo.js',
  content: new MagicString( 'var answer = 42;' )
});
 
bundle.addSource({
  filename: 'bar.js',
  content: new MagicString( 'console.log( answer )' )
});
 
// Advanced: a source can include an `indentExclusionRanges` property
// alongside `filename` and `content`. This will be passed to `s.indent()`
// - see documentation above
 
bundle.indent() // optionally, pass an indent string, otherwise it will be guessed
  .prepend( '(function () {\n' )
  .append( '}());' );
 
bundle.toString();
// (function () {
//   var answer = 42;
//   console.log( answer );
// }());
 
// options are as per `s.generateMap()` above
var map = bundle.generateMap({
  file: 'bundle.js',
  includeContent: true,
  hires: true
});
```

# principle

只定义了三个类（Bundle/SourceMap/MagicString）。再输出这三个类。
