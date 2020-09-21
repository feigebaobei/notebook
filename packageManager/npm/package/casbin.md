# casbin

它是一个为node.js开发的强大的、有效的、开源的访问资源控制库。它提供了各种基于资源控制模块的验证。
它支持casbin/jcasbin/node-casbin/php-casbin/pycasbin/casbin.net/casbin-cpp/casbin-rs.等。

##前言

|||
|-|-|
|acl (access control list) 访问权限列表 | 表明某个用户具有某个权限。 |
|rbac (role base access control) 基于角色的权限控制 | 某个用户是某个角色，某个角色具有某个权限。 |
|abac (attribute base access control) 基于属性的权限控制 | 通过动态计算出一个或一组属性来着迷是否满足某种条件来授权。 |


## document
## install
```
npm i casbin
```
## get started

新的node-casbin是基于model file and policy file执行的。

```
import {newEnforcer} from 'casbin'
// 创建决策器
// 决策器需要有一个模型文件和策略文件
const enforcer = await newEnforcer('basic_model.conf', 'basic_policy.csv')
// 在访问发生之前，需要添加强制挂钩。
const sub = 'alice' // 想要访问资源的用户
const obj = 'datal' // 要访问的资源
const act = 'read' // 用户对资源执行的操作
const res = await enforcer.enforce(sub, obj, act)
if (res) {
  // permit alice to read datal
} else {
  // deny the request, show an error
}
```
除了静态策略文件之外, Casbin 还为运行时的权限管理提供 API。例如, 您可以将分配给用户的所有角色按如下所示进行:
```
const roles = await enforcer.getRolesForUser('alice')
```
## 工作原理

在 Casbin 中, 访问控制模型被抽象为基于 PERM (Policy, Effect, Request, Matcher) 的一个文件。 因此，切换或升级项目的授权机制与修改配置一样简单。 您可以通过组合可用的模型来定制您自己的访问控制模型。 例如，您可以在一个model中获得RBAC角色和ABAC属性，并共享一组policy规则。

Casbin中最基本、最简单的model是ACL。ACL中的model CONF为:

## model

### 支持的Models
1. ACL (Access Control List, 访问控制列表)
1. 具有超级用户的 ACL
1. 没有用户的 ACL: 对于没有身份验证或用户登录的系统尤其有用。
1. 没有资源的 ACL: 某些场景可能只针对资源的类型, 而不是单个资源, 诸如write-article,read-log等权限。 它不控制对特定文章或日志的访问。
1. RBAC (基于角色的访问控制)
1. 支持资源角色的RBAC: 用户和资源可以同时具有角色 (或组)。
1. 支持域/租户的RBAC: 用户可以为不同的域/租户设置不同的角色集。
1. ABAC (基于属性的访问控制): 支持利用resource.Owner这种语法糖获取元素的属性。
1. RESTful: 支持路径, 如`/res/*,/res/: id`和 HTTP 方法, 如`GET,POST,PUT,DELETE`。
1. 拒绝优先: 支持允许和拒绝授权, 拒绝优先于允许。
1. 优先级: 策略规则按照先后次序确定优先级，类似于防火墙规则。

### model语法

Model CONF 至少应包含四个部分: [request_definition], [policy_definition], [policy_effect], [matchers]。
如果 model 使用 RBAC, 还需要添加[role_definition]部分。
Model CONF 文件可以包含注释。注释以 # 开头， # 会注释该行剩余部分。

```
# model.conf的内容
[request_definition]
# 用于request的定义
r = sub, obj, act
[policy_definition]
p = sub, obj, act
p2 = sub, act
# 每行是一个策略规则。
[policy_effect]
e = some(where(p.eft == allow))
[role_definition]
#原语定义了RBAC中的角色继承关系。 Casbin支持RBAC系统的多个实例，例如，用户可以有角色和继承关系，而资源也可以有角色和继承关系。 这两个RBAC系统不会干扰
g = _, _
g2 = _, _
# p
[matchers]
# 原语定义了策略规则如何与访问请求进行匹配的匹配器，其本质上是布尔表达式。
m = r.sub === p.sub && r.obj === p.obj && r.act === p.act
# 注释
```
添加自定义函数
```
let kfn = () => {...}
e.AddFunction('my_func', kfn)
```








## policy management
有2种api set.
- management api
- rbac api





## 存储

### model存储

与 policy 不同，model 只能加载，不能保存。 因为我们认为 model 不是动态组件，不应该在运行时进行修改。

```
// 从代码加载model
// Initialize the model from Go code.
m := model.NewModel()
m.AddDef("r", "r", "sub, obj, act")
m.AddDef("p", "p", "sub, obj, act")
m.AddDef("g", "g", "_, _")
m.AddDef("e", "e", "some(where (p.eft == allow))")
m.AddDef("m", "m", "g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act")
// Load the policy rules from the .CSV file adapter.
// 使用自己的 adapter 替换。
a := persist.NewFileAdapter("examples/rbac_policy.csv")
// 创建一个 enforcer。
e := casbin.NewEnforcer(m, a)

// 从字符串加载的 model
// Initialize the model from a string.
text :=
`
[request_definition]
r = sub, obj, act
[policy_definition]
p = sub, obj, act
[role_definition]
g = _, _
[policy_effect]
e = some(where (p.eft == allow))
[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`
m := NewModel(text)
// Load the policy rules from the .CSV file adapter.
// Replace it with your adapter to avoid files.
a := persist.NewFileAdapter("examples/rbac_policy.csv")
// Create the enforcer.
e := casbin.NewEnforcer(m, a)
```

## 扩充功能

### 适配器
在Casbin中，策略存储作为adapter(Casbin的中间件) 实现。 Casbin用户可以使用adapter从存储中加载策略规则 (aka LoadPolicy()) 或者将策略规则保存到其中 (aka SavePolicy())。 为了保持代码轻量级，我们没有把adapter代码放在主库中。





