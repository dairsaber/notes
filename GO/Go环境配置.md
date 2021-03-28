# macos go的环境配置

## 1. 去golang官网下载对应的下载包直接安装

```
https://golang.google.cn/dl/
```

## 2. 配置环境变量

这边是zsh 所以打开~/.zshrc 添加

```shell
#GO config
export GOROOT=/usr/local/go
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

-  如果gopath不存在的话自己新建一个