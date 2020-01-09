# reflog


## name

管理reflog信息。

## synopsis

```
git reflog <subcommand> <options>
```

## description

这个命令可以使用各种各样的子命令和不同的子命令的可选依赖。

```
git reflog [show] [log-options] [<ref>]
git reflog expire [--expire=<time>] [--expire-unreachable=<time>][--rewrite][--updateref][--stale-fix][--dry-run|-n][--verbose][--all[--single-worktree]|<refs>...]
git reflog delete [--rewrite][--updateref][--dry-run|-n][--verbose] ref@{specifier}...
git reflog exists <refs>
```

参考reference/log，当分支有tip时或在本地库被修改时，记录。reflog在各种各样的log命令中很有用，可以得到以前的参考的值。如`HEAD@{2}`:这在里head被移动2次。`master@{one.week.ago}`:本地库里master在一周前point.
这个命令管理记录信息。
在默认时或没有任何子命令时，'show'是默认子命令，在命令行是展示参考的log。reflog包括所有的记录（包括跨分支）.
`git reflog show`有一个另外一个写法`git log -g --abbrev-commit --pretty=oneline`.
expire会筛去较老的记录。筛去比expire更老的记录，或筛去比expire-unreachable更老的代码。
delete 不会。
exists 检查ref是否被reflog。

## options

git reflog show 可以添加任意git log可以使用的options
git reflog expire
  --all 处理所有的参考。
  --single-worktree 只从当前分支上取参考数据。若不使用这个选项，则会显示所有分支上的要参考。
  --expire=<time> 筛去比指定时间的条目。
  --expire-unreachable=<time>
  --updateref 更新最顶层的入口的参考。
  --rewrite
  --stale-fix
  -n
  --dry-run
  --verbose 显示额外信息。
git reflog delete
