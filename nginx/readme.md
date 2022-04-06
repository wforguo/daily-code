# nginx

## 问题

### 云服务器的防火墙开启443端口

增加443端口

`firewall-cmd --zone=public --add-port=443/tcp --permanent`

重启防火墙

`firewall-cmd --reload ` 
