#  终端修改linux的网卡配置

```
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```
# 具体配置

```
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
IPADDR="192.168.23.129"
NETMASK="255.255.255.0"
GATEWAY="192.168.23.2"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="enp0s5"
UUID="84010df8-7a05-4375-b82e-ff2a6bc19d40"
DEVICE="enp0s5"
ONBOOT="yes"
```

# 重启network

```
// centos 7
systemctl restart network

// centos8
nmcli c reload
```


