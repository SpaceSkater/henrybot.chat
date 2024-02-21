# HenryBot.CHAT

![image](https://github.com/SpaceSkater/henrybot.chat/blob/main/readme_assets/HenryBot-IMG.jpg)

**HenryBot.CHAT** 是一款基于 GPT LLM API 的问答机器人实验性开源前端项目。快来利用 Node.js 和 React，搭建属于你自己的极简、直连和个性化定制的 Chat GPT 吧！

# 在线访问

HenryBot.CHAT 官网：[www.henrybot.chat](https://www.henrybot.chat)
演示 DEMO： [chat.henrybot.chat](https://chat.henrybot.chat)

# 描述

- **HenryBot.CHAT** 通过请求 GPT 的 API 接口，并验证 Key，从而实现流式输出的问答。
- **HenryBot.CHAT** 适合个人部署以及练习，适合初学者以及有意愿开发基于 API 接口的问答机器人的开发者。

![image](https://github.com/SpaceSkater/henrybot.chat/blob/main/readme_assets/HenryBot-demo.gif)

# API 供应商 ⭐ 重要

- 在所有自建 GPT 中，最重要的就是权鉴对话的**Key**了
- 关于 **Key** 的获得，首要渠道是 **OpenAI** 账号的 **API KEY**，具体参考 [**OpenAI**官方文档](https://platform.openai.com/docs/api-reference/introduction)
- 除了使用 **OpenAI** 的官方 API 以外，推荐使用 **API2D** 的代理 API 服务，具体详情可以了解 [API2D 官方网站](https://api2d.com/r/198039)
- 以下示例中环境变量参考的是 **API2D** 的 API，请根据自己的情况考虑是否修改。

# 启动

你可以通过控制台或者集成开发环境（_IDE_）简单的启动 **HenryBot.CHAT** ，从而开始操作和修改功能，或者直接开始使用。

1. 克隆仓库到本地
2. 你会得到两个主要的文件夹 **server** 和 **client**，和其他一些暂时不需要管的文件，在分别打开 **server** 和 **client**。在终端下，分别执行 `npm install` 以安装其依赖。
3. 在 **server** 目录下添加 `.env` 文件， 并填入：

```
 CHATAPI_URL=https://openai.api2d.net/v1/chat/completions
 GETBALANCE_URL=https://oa.api2d.net/dashboard/billing/credit_grants
 PORT=4000
```

4. 在 **client** 目录下添加 `.env.local` 文件， 并填入

```
 VITE_VERCEL_ASK : localhost:4000/api/v1/ask
 VITE_VERCEL_IS_WORK : localhost:4000/api/v1/iswork
 VITE_VERCEL_GET_BALANCE : localhost:4000/api/v1/balance
```

5. 分别在 **server**目录终端中，输入 `npm start`, 在**client**终端中，输入 `npm run dev`, 即可分别启动 **server** 和 **client**，就可以开始使用和开发**HenryBot**了！

# 部署

> 部署你需要准备的知识：

1. 基本的 **Linux** 操作知识
2. 基本的 **Docker** 安装、构建镜像、运行容器的知识
3. 基本的 **Vercel** 部署知识
4. 基本的 **Nginx** 知识 （可选）
5. 域名注册与 DNS 管理 （可选）
6. 证书的注册与下载 （可选）

**Server：** server 文件夹包含 Node.js + Express 构建的微服务部分，负责处理**Client**和**GPT API**的 IO 信息。

> 推荐使用 **Docker** 将 Server 部署到个人云服务器上。以下为部署到云服务器的步骤。

1. 克隆仓库到本地
2. 将 **server** 文件夹保存到云服务器中（请自定义位置）
3. 在 **server** 文件夹中添加 `.env`文件
4. 在 `.env` 文件中填入：

```
CHATAPI_URL=https://openai.api2d.net/v1/chat/completions
GETBALANCE_URL=https://oa.api2d.net/dashboard/billing/credit_grants
PORT=4000
```

5. 在云服务器中安装**Docker**，具体安装参考[Docker 官方安装教程](https://docs.docker.com/engine/install/)
6. 在自定义的 server 目录下执行 **Docker** 命令：
   `docker build -t henrybot.`
   `docker run -p 4000:4000 -d henrybot`
7. 输入 `docker ps -a` 检查容器是否正常运行
8. 可以使用 **Docker** 和 **Nginx** 反向代理该服务的端口，**Nginx** 配置参考 **nginx.conf** 文件并且可以申请证书实现 **https** 访问

**Client：** client 文件夹包含 React 构建的 **HenryBot.CHAT** 前端部分。负责输入和响应问答信息，设置查询 **Key** 等操作。具体操作可参考官网和**demo**演示 。

> 推荐使用 **Vercel** 部署 Client 前端。

1. **Github** 中 **fork** 到自己仓库，克隆到本地，client 文件夹中为**React**前端部分
2. 可以按照需求自定义修改代码（也可以直接使用）
3. 将 **client 部分** 部署到 **Vercel**，具体部署参考[Vercel 官方部署教程](https://vercel.com/docs/getting-started-with-vercel)
4. 部署成功后添加以下环境变量到 **Vercel**

```
 VITE_VERCEL_ASK : <云服务器IP和端口> 或 <域名> + /api/v1/ask
 VITE_VERCEL_IS_WORK : <云服务器IP和端口> 或 <域名> + /api/v1/iswork
 VITE_VERCEL_GET_BALANCE : <云服务器IP和端口> 或 <域名> + /api/v1/balance
```

5. 访问属于自己的 **HenryBot.CHAT** ！
