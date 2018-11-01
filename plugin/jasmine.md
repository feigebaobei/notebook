#jasmine

##intro

用来验证脚本运行结果是否正确的脚本。  

##install

官网下载地址：https://github.com/jasmine/jasmine/releases  
npm: `npm i jasmine`  

##usage

```
<script src="lib/jasmine-3.3.0/jasmine.js"></script>
<script src="lib/jasmine-3.3.0/jasmine-html.js"></script>
<script src="lib/jasmine-3.3.0/boot.js"></script>
<script>
let obj = {
  k: 'value'
}
describe('test title', () => {
  it('first', () => {
    expect(obj.k).toEqual('value');
  }),
  it('second', () => {
    expect(1 + 2).toEqual(3);
  })
})
</script>
```

##api

