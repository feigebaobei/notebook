# transliteration

能用字符转化为拉丁文。可以在所有的平台工作。可以适用于所有语言。
兼容ie9+、现代浏览器、node.js、web worker、react native、cli

## Installation

```
npm i transliteration --save
```





## Usage

### node.js/React Native
```
import {trsanliterate as tr, slugify} from 'transliteration'
tr('你好, world!')      // Ni Hao, world!
slugify('你好, world!') // ni-hao-world
```
### browser

```
<!-- UMD build -->
<script
  async
  defer
  src="https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.umd.min.js"
></script> 
<script>
  console.log(transliterate('你好'));
</script> 
<!-- ESM build -->
<script type="module">
  import { transliterate } from 'https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.esm.min.js';
  console.log(transliterate('你好'));
</script> 
// 全局变量
transliterate('你好, World');
// window.transliterate
slugify('Hello, 世界');
// window.slugify
transl('Hola, mundo'); // For backward compatibility only, will be removed in next major version
// window.transl
// cli
npm install transliteration -g
transliterate 你好 # Ni Hao 
slugify 你好 # ni-hao 
echo 你好 | slugify -S # ni-hao 
```

### tranliterate(str, [options])

把str转化为拉丁字符。

#### options
```
{
  /**
   * Ignore a list of strings untouched
   * @example tr('你好，世界', { ignore: ['你'] }) // 你 Hao , Shi Jie
   */
  ignore?: string[];
  /**
   * Replace a list of string / regex in the source string with the provided target string before transliteration
   * The option can either be an array or an object
   * @example tr('你好，世界', { replace: {你: 'You'} }) // You Hao , Shi Jie
   * @example tr('你好，世界', { replace: [['你', 'You']] }) // You Hao , Shi Jie
   * @example tr('你好，世界', { replace: [[/你/g, 'You']] }) // You Hao , Shi Jie
   */
  replace?: OptionReplaceCombined;
  /**
   * Same as `replace` but after transliteration
   */
  replaceAfter?: OptionReplaceCombined;
  /**
   * Decides whether or not to trim the result string after transliteration
   * @default false
   */
  trim?: boolean;
  /**
   * Any characters not known by this library will be replaced by a specific string `unknown`
   * @default ''
   */
  unknown?: string;
  /**
   * Fix Chinese spacing. For example, `你好` is transliterated to `Ni Hao` instead of `NiHao`. If you don't need to transliterate Chinese characters, set it to false to false to improve performance.
   * @default true
   */
  fixChineseSpacing?: boolean;
}
```
### transliterate.config([optionsObj], [reset=false])
设置转化时的配置项。
optionsObj:转化时的配置项。
reset:     是否重置
返回当前配置项
若已经设置，则后继的转化都使用此配置项。
```
import { transliterate as tr } from 'transliteration';
tr('你好，世界');
// Ni Hao , Shi Jie
tr('Γεια σας, τον κόσμο');
// Geia sas, ton kosmo
tr('안녕하세요, 세계');
// annyeonghaseyo, segye
tr('你好，世界', { replace: { 你: 'You' }, ignore: ['好'] });
// You 好,Shi Jie
tr('你好，世界', { replace: [['你', 'You']], ignore: ['好'] });
// You 好,Shi Jie (option in array form)
tr.config({ replace: [['你', 'You']], ignore: ['好'] });
tr('你好，世界'); // You 好,Shi Jie
console.log(tr.config());
// { replace: [['你', 'You']], ignore: ['好'] }
tr.config(undefined, true);
console.log(tr.config());
// {}
```

### slugify(str, [options])

使用`-`连接拉丁字符。
```
/**
   * Ignore a list of strings untouched
   * @example tr('你好，世界', { ignore: ['你'] }) // 你 Hao , Shi Jie
   */
  ignore?: string[];
  /**
   * Replace a list of string / regex in the source string with the provided target string before transliteration
   * The option can either be an array or an object
   * @example tr('你好，世界', { replace: {你: 'You'} }) // You Hao , Shi Jie
   * @example tr('你好，世界', { replace: [['你', 'You']] }) // You Hao , Shi Jie
   * @example tr('你好，世界', { replace: [[/你/g, 'You']] }) // You Hao , Shi Jie
   */
  replace?: OptionReplaceCombined;
  /**
   * Same as `replace` but after transliteration
   */
  replaceAfter?: OptionReplaceCombined;
  /**
   * Decides whether or not to trim the result string after transliteration
   * @default false
   */
  trim?: boolean;
  /**
   * Any characters not known by this library will be replaced by a specific string `unknown`
   * @default ''
   */
  unknown?: string;
  /**
   * Whether the result need to be converted into lowercase
   * @default true
   */
  lowercase?: boolean;
  /**
   * Whether the result need to be converted into uppercase
   * @default false
   */
  uppercase?: boolean;
  /**
   * Custom separator string
   * @default '-'
   */
  separator?: string;
  /**
   * Allowed characters.
   * When `allowedChars` is set to `'abc'`, only characters which match `/[abc]/g` will be preserved.
   * Other characters will all be converted to `separator`
   * @default 'a-zA-Z0-9-_.~''
   */
  allowedChars?: string;
  /**
   * Fix Chinese spacing. For example, `你好` is transliterated to `Ni Hao` instead of `NiHao`. If you don't need to transliterate Chinese characters, set it to false to false to improve performance.
   */
  fixChineseSpacing?: boolean;
```
```
slugify('你好，世界');
// ni-hao-shi-jie
slugify('你好，世界', { lowercase: false, separator: '_' });
// Ni_Hao_Shi_Jie
slugify('你好，世界', {
  replace: { 你好: 'Hello', 世界: 'world' },
  separator: '_',
});
// hello_world
slugify('你好，世界', {
  replace: [
    ['你好', 'Hello'],
    ['世界', 'world'],
  ],
  separator: '_',
}); // replace option in array form)
// hello_world
slugify('你好，世界', { ignore: ['你好'] });
// 你好shi-jie
```

### slugify.config([optionsObj], [reset=false])
设置转化时的配置项。
optionsObj:转化时的配置项。
reset:     是否重置
返回当前配置项
若已经设置，则后继的转化都使用此配置项。
```
slugify.config({ lowercase: false, separator: '_' });
slugify('你好，世界');
// Ni_Hao_Shi_Jie
console.log(slugify.config());
// { lowercase: false, separator: "_" }
slugify.config({ replace: [['你好', 'Hello']] });
slugify('你好, world!');
// This equals slugify('你好, world!', { replace: [['你好', 'Hello']] });
console.log(slugify.config());
// { replace: [['你好', 'Hello']] }
slugify.config(undefined, true);
console.log(slugify.config());
// {}
```

### cli usage

```
➜  ~ transliterate --help
Usage: transliterate <unicode> [options]

Options:
  --version      Show version number                                                       [boolean]
  -u, --unknown  Placeholder for unknown characters                           [string] [default: ""]
  -r, --replace  Custom string replacement                                     [array] [default: []]
  -i, --ignore   String list to ignore                                         [array] [default: []]
  -S, --stdin    Use stdin as input                                       [boolean] [default: false]
  -h, --help                                                                               [boolean]

Examples:
  transliterate "你好, world!" -r 好=good -r          Replace `,` with `!`, `world` with `shijie`.
  "world=Shi Jie"                                     Result: Ni good, Shi Jie!
  transliterate "你好，世界!" -i 你好 -i ，           Ignore `你好` and `，`.
                                                      Result: 你好，Shi Jie !
```
```
➜  ~ slugify --help
Usage: slugify <unicode> [options]

Options:
  --version        Show version number                                                     [boolean]
  -U, --unknown    Placeholder for unknown characters                         [string] [default: ""]
  -l, --lowercase  Returns result in lowercase                             [boolean] [default: true]
  -u, --uppercase  Returns result in uppercase                            [boolean] [default: false]
  -s, --separator  Separator of the slug                                     [string] [default: "-"]
  -r, --replace    Custom string replacement                                   [array] [default: []]
  -i, --ignore     String list to ignore                                       [array] [default: []]
  -S, --stdin      Use stdin as input                                     [boolean] [default: false]
  -h, --help                                                                               [boolean]

Examples:
  slugify "你好, world!" -r 好=good -r "world=Shi     Replace `,` with `!` and `world` with
  Jie"                                                `shijie`.
                                                      Result: ni-good-shi-jie
  slugify "你好，世界!" -i 你好 -i ，                 Ignore `你好` and `，`.
                                                      Result: 你好，shi-jie
```

## Caveats

支持 1to1 code map.
支持的语言
- chinese
- japanese
- thai
- cyrillic
