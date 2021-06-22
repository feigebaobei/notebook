# packages/runtime-dom
如何渲染为dom的。
同分析packages/vue的逻辑。得知：
- 入口文件是src/index.ts
- dependencies
用到好多packages/runtime-core里的东西。

## runtime-dom/src/index.ts
CompilerOptions的代码在pacages/compiler-core/options.ts中。
```
export type CompilerOptions = ParserOptions & TransformOptions & CodegenOptions

export interface ParserOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
    CompilerCompatOptions {
  /**
   * e.g. platform native elements, e.g. `<div>` for browsers
   */
  isNativeTag?: (tag: string) => boolean
  /**
   * e.g. native elements that can self-close, e.g. `<img>`, `<br>`, `<hr>`
   */
  isVoidTag?: (tag: string) => boolean
  /**
   * e.g. elements that should preserve whitespace inside, e.g. `<pre>`
   */
  isPreTag?: (tag: string) => boolean
  /**
   * Platform-specific built-in components e.g. `<Transition>`
   */
  isBuiltInComponent?: (tag: string) => symbol | void
  /**
   * Separate option for end users to extend the native elements list
   */
  isCustomElement?: (tag: string) => boolean | void
  /**
   * Get tag namespace
   */
  getNamespace?: (tag: string, parent: ElementNode | undefined) => Namespace
  /**
   * Get text parsing mode for this element
   */
  getTextMode?: (
    node: ElementNode,
    parent: ElementNode | undefined
  ) => TextModes
  /**
   * @default ['{{', '}}']
   */
  delimiters?: [string, string]
  /**
   * Whitespace handling strategy
   */
  whitespace?: 'preserve' | 'condense'
  /**
   * Only needed for DOM compilers
   */
  decodeEntities?: (rawText: string, asAttr: boolean) => string
  /**
   * Keep comments in the templates AST, even in production
   */
  comments?: boolean
}
```

## runtime-dom/src/index.ts
用于渲染dom的方法。
输出@vue/runtime-core里的所有方法。
输出{
    render                  渲染函数
    hydrate
    createApp               创建应用并返回
    createSSRApp
    useCssModule
    useCssVars
    Transition
    TransitionProps
    TransitionGroup
    TransitionGroupProps
    vModelText
    vModelCheckbox
    vModelRadio
    vModelSelect
    vModelDynamic
    withModifiers
    withKeys
    vShow                   
}

## runtime-dom/src/directives
这里放的都是指定。

## runtime-dom/src/directives/vShow.ts
控制是否把dom元素设置为display: 'none';
输出
vShow： {
    beforeMount
    mounted
    updated
    beforeUnmount
}
与官网公布的指令的若干方法一致。

## runtime-dom/src/directives/vOn.ts
输出withModifiers/withKeys
withModifiers
返回fn(evnet, ...args)
withKeys

## runtime-dom/src/directives/vModel.ts
输出5个指令。
vModelText
vModelCheckbox
vModelRadio
vModelselect
vModelDynamic

## runtime-dom/src/components
这里放过滤的源代码。

## runtime-dom/src/components/Transition.ts
输出2个接口：
interface TransitionProps
interface ElementWithTransition
输出6个方法：
Transition     使用h重新渲染。
TransitionPropsValidators    与Transition的公用一个对象。props的验证方法。
resolveTransitionProps       返回各钩子函数。
addTransitionClass           为el添加类
removeTransitionClass        为el删除类
getTransitionInfo            返回过滤的信息。
forceReflow                  返回body的偏移高度。

## runtime-dom/src/components/TransitionGroup.ts
输出1个类型
TransitionGroupProps
输出1个方法
TransitionGroup

## runtime-dom/src/helpers
这里放助手函数。

## runtime-dom/src/helpers/useCssModule.ts
useCssModule
返回空对象。

## runtime-dom/src/helpers/useCssVars.ts
useCssVars
不会