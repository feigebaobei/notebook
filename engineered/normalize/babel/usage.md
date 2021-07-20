# overview
使用方法有很多：

- prototyping
    - in the browser
- babel built-ins
    - cli
    - require hook
- build systems
    - broccoli
    - browserify
    - brunch
    - duo
    - grunt
    - gulp
    - jspm
    - make
    - MSBuild
    - RequireJS
    - Rollup
    - sprockets
    - start
- frameworks
    + ember
    + meteor
    + rails
    + sails
- test framworks
    + ava
    + jasmine
    + jest
    + karma
    + lab
    + mocha
- utilities
    + connect
    + nodemon
- language apis
    + c# / .net
    + node ruby
- template engines
    + pug
- editors and ides
    + webstorm
- debuggers
    - node inspector


# usage @babe/standalone
``` html
<div id="output"></div>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
    const getMsg = () => 'str'
    document.getElementById('output').innerHTML = getMsg()
</script>
```
`@babel/standalone`能做事很少。请在s端使用预编译功能。

# usage @babel/cli
```sh
npm i @babel/cli @babel/core @babel/preset-env -D
npx babel src -d lib              // 把<root>/src目录编译了

```
创建`<root>/babel.config.json`
```json
{
    "presets": ["@babel/preset-env"]
}
```
