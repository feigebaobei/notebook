# packages/compiler-core
## overview

## compiler-core/src/index.ts
从兄弟文件中引入并输出。

## compiler-core/src/compile.ts
getBaseTransformPreset
……
baseCompile
……

## compiler-core/src/transform.ts
createTransformContext
创始一个context对象。并返回。
transform
从context对象中取出一些方法赋给root对象。
createRootCodegen
……

## compiler-core/src/ast.ts
createRoot
返回一个RootNode类型的对象。
createVNodeCall
返回一个对象
createArrayExpression
createObjectExpression
createObjectProperty
createSimpleExpression
createInterpolation
createCompoundExpression
createFunctionExpression
createConditionalExpression
createCacheExpression
createBlockStatement
createTemplateLiteral
createIfStatement
createAssignmentExpression
createSequenceExpression
createReturnStatement
创建一个指定的对象，并返回。

## compiler-core/src/options.ts
返回好多enum/type/interface

## compiler-core/src/parse.ts
各种解析

## compiler-core/src/codegen.ts
生成代码

## compiler-core/src/errors.ts
enum ErrorCodes
错误码
errorMessages
错误码对应的消息

## compiler-core/src/utils.ts
一堆判断函数

## compiler-core/src/runtimeHelpers.ts
定义一堆变量。

## compiler-core/src/transform/vModel.ts
v-model指令

## compiler-core/src/transform/vOn.ts
v-no指令
## compiler-core/src/transform/vBind.ts
## compiler-core/src/transform/vIf.ts
## compiler-core/src/transform/vFor.ts
## compiler-core/src/transform/transformExpressions.ts
## compiler-core/src/transform/noopDirectiveTransform.ts
## compiler-core/src/transform/vSlot.ts
相应的指令