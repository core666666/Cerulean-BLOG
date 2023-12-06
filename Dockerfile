# 使用官方的OpenJDK 8镜像作为基础镜像
FROM openjdk:8-jdk-alpine

# 设置环境变量
spring.datasource.url=jdbc:mysql://{host}:{port}/my_blog_db?useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false&serverTimezone=UTC
spring.datasource.username={username}
spring.datasource.password={pwd}

# 设置国内镜像源
RUN echo "http://mirrors.aliyun.com/alpine/v3.12/main" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.12/community" >> /etc/apk/repositories

# 安装字体和设置时区
RUN apk add --no-cache ttf-dejavu tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 设置工作目录
WORKDIR /app

# 复制项目构建产物到容器中
COPY iceberg-blog-4.0.0-SNAPSHOT.jar /app/app.jar

# 暴露应用程序的端口（根据您的应用需求进行调整）
EXPOSE 8080

# 启动Spring Boot应用程序
CMD ["java", "-jar", "app.jar"]