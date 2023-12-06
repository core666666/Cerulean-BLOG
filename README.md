# Cerulean-Blog

<div align=center><img src="https://ooo.0x0.ooo/2023/12/06/OAgL4F.jpg" width="30%" height="30%"></div>


[![](https://img.shields.io/badge/JDK-1.8%2B-lightgrey)](https://www.oracle.com/java/technologies/javase-downloads.html)

[![](https://img.shields.io/badge/SpringBoot-2.1.0.RELEASE-brightgreen)](https://spring.io/projects/spring-boot)

[![](https://img.shields.io/badge/MyBatis-1.3.2-orange)](https://mybatis.org/mybatis-3/)

[![](https://img.shields.io/badge/Thymeleaf-3.0.12-success)](https://www.thymeleaf.org/)




## 博客简介

+ `项⽬描述`：采⽤前后端分离架构实现的博客系统，主体架构采用 SpringBoot + Thymeleaf + MyBatis，基于Java环境采用 IntelliJ IDEA 开发，使用 Maven 工具构建。
+ `涉及技术`：Spring Boot、MyBatis、Thymeleaf、Docker、Nginx
+ `设计细节`：整个项⽬分为登录、博客管理、分类管理、标签管理、评论管理、系统配置等多个模块

本博客系统页面优美简介，但是作为个人博客，基本满足大部分需求；

可作为SpringBoot学习学习项目，也可作为个人博客搭建；





## 运行配置

运行 sql 脚本（sql 脚本位于 sql 目录中），修改`application.properties`配置文件中的数据库连接

项目启动成功后本地访问 http://localhost:8080/admin/login

默认账号：Cerulean

密码：123456



## 项目地址

目前项目托管在 **Gitee** 和 **Github** 平台上中，欢迎大家 **Star** 和 **Fork** 支持~

- Github地址：https://github.com/core666666/Cerulean-Blog



## 主题

> 简介

共有三个主题，位于 `templates/blog` 下：

+ amaze
+ default
+ yummy-jekyll

默认主题为：amaze

> 主题切换

通过修改类实现主题切换

在 `controller/blog/MyBlogController` 中有三个字段：

```java
public static String theme = "default";
public static String theme = "yummy-jekyll";
public static String theme = "amaze";
```

选择其中一个，将其与两个注释即可完成主题的切换。

## 部署

```java
# 设置环境变量
spring.datasource.url=jdbc:mysql://{host}:{port}/my_blog_db?useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false&serverTimezone=UTC
spring.datasource.username={username}
spring.datasource.password={pwd}
```
替换为你的mysql连接

> 构建镜像
```java
docker build -t myblog .
```
> 运行容器

```java
docker run -d -p 8080:8080 <镜像id>
```

## 效果预览

### 登录页面

![login](https://ooo.0x0.ooo/2023/12/06/OAg43I.png)



### 控制面板

![dashboard](https://ooo.0x0.ooo/2023/12/06/OAgRrG.png)


### 博客列表

![blogs](https://ooo.0x0.ooo/2023/12/06/OAgpVr.png)


### 文章详情

![blogs](https://ooo.0x0.ooo/2023/12/06/OAgtQ1.png)

<br>
<br>
<br>

[参考地址](https://github.com/Horycloud/Iceberg-Blog)