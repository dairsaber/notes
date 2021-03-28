# 下载go extension

## 1.  在setting.json 中配置

```json
{
  "go.goroot":"/usr/local/go",
  "go.gopath":"/Users/dairsaber/gopath"
}
```

## 2. 在新建一个main.go的时候会提示安装工具 安装就行了 失败的话 就搭个梯子

- 设值代理环境变量

```
//.zshrc
# 备用地址
# export GOPROXY=https://goproxy.cn

# 配置 GOPROXY 环境变量
export GOPROXY=https://goproxy.io,direct
# 还可以设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
export GOPRIVATE=git.mycompany.com,github.com/my/private
//清除 gotools缓存
go clean --modcache
```





