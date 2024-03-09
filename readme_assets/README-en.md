# HenryBot.CHAT

![image](https://github.com/SpaceSkater/henrybot.chat/blob/main/readme_assets/HenryBot-IMG.jpg)

**HenryBot.CHAT** is an experimental open source front-end project for a Q&A ( question and answer ) robot based on the LLM API. Come and use Node.js and React to build your own minimalist, directly connected and personalized LLM Chat Bot!

# Online access

HenryBot.CHAT website：[www.henrybot.chat](https://www.henrybot.chat)
DEMO： [chat.henrybot.chat](https://chat.henrybot.chat)

# Description

- **HenryBot.CHAT** implements streaming output Q&A by requesting the LLM ( such as GPT ) API interface and verifying the Key.
- **HenryBot.CHAT** is suitable for personal deployment and practice, and is suitable for beginners and developers who are willing to develop Q&A robots based on API interfaces.

![image](https://github.com/SpaceSkater/henrybot.chat/blob/main/readme_assets/HenryBot-demo.gif)

# API Provider ⭐ IMPORTANT

- Among all self-built GPTs, the most important one is the **key** of the authentication dialogue.
- Regarding obtaining the **Key**, the main channel is the **API KEY** of the **OpenAI** account. For details, please refer to the [**OpenAI** official doc](https://platform.openai.com/docs/api-reference/introduction)
- In addition to using **OpenAI** 's official API, it is recommended to use **API2D** 's proxy API service. For details, please visit the [API2D official website](https://api2d.com/r/198039)
- The environment variables in the following examples refer to the API of **API2D**. Please consider whether to modify it according to your own situation.

# Start

You can simply launch **HenryBot.CHAT** through the terminal or integrated development environment (_IDE_) to start operating and modifying functions, or start using it directly.

1. Clone the repository locally
2. You will get two main folders, **server** and **client**, and some other files that you don’t need to manage for the time being. Open **server** and **client** respectively. In the terminal, execute `npm install` respectively to install its dependencies.
3. Add the `.env` file in the **server** directory and fill in:

```
CHATAPI_URL=https://openai.api2d.net/v1/chat/completions
GETBALANCE_URL=https://oa.api2d.net/dashboard/billing/credit_grants
PORT=4000
```

4. Add the `.env.local` file in the **client** directory and fill in the

```
VITE_VERCEL_ASK=localhost:4000/api/v1/ask
VITE_VERCEL_IS_WORK=localhost:4000/api/v1/iswork
VITE_VERCEL_GET_BALANCE=localhost:4000/api/v1/balance
```

5. In the **server** directory terminal, enter `npm start` and in the **client** terminal, enter `npm run dev` to start the **server** and **client** respectively, and you can start using and developing **HenryBot** !

# Deploy

> Deploy the knowledge you need to prepare:

1. Basic **Linux** operating knowledge
2. Basic knowledge of **Docker** installation, building images, and running containers
3. Basic **Vercel** deployment knowledge
4. Basic **Nginx** knowledge (optional)
5. Domain name registration and DNS management (optional)
6. Certificate registration and download (optional)

**Server:** The server folder contains the microservice part built by Node.js + Express, which is responsible for processing IO information of **Client** and **GPT API** .

> It is recommended to use **Docker** to deploy the server to a VPS. The following are the steps to deploy to a cloud server.

1. Clone the repository locally
2. Save the **server** folder to the cloud server (please customize the location)
3. Add `.env` files in the **server** folder
4. Fill in the `.env` file with:

```
CHATAPI_URL=https://openai.api2d.net/v1/chat/completions
GETBALANCE_URL=https://oa.api2d.net/dashboard/billing/credit_grants
PORT=4000
```

5. Install **Docker** in the cloud server. For specific installation, please refer to [Docker official installation tutorial](https://docs.docker.com/engine/install/).
6. Execute the **Docker** command in the customized server directory:
   `docker build -t henrybot.`
   `docker run -p 4000:4000 -d henrybot`
7. Input `docker ps -a` to check if the container is running properly
8. You can use **Docker** and **Nginx** to reverse proxy the port of the service. For **Nginx** configuration, refer to the **nginx.conf** file and you can apply for a certificate to achieve **https** access.

**Client：** The client folder contains the **HenryBot.CHAT** frontend portion built with React. Responsible for inputting and responding to Q&A information, setting query **keys** and other operations. For specific operations, please refer to the official website and **demo**.

> It is recommended to use **Vercel** to deploy the Client front end.

1. **Fork** to your own warehouse in **Github** and clone it locally. The client folder is the **React** and **Vite** front-end part.
2. You can customize and modify the code according to your needs (you can also use it directly)
3. Deploy the **client** part to **Vercel** . For specific deployment, please refer to the [Vercel official deployment tutorial](https://vercel.com/docs/getting-started-with-vercel).
4. After successful deployment, add the following environment variables to **Vercel**

```
VITE_VERCEL_ASK : <cloud server IP & port> or <domain name> + /api/v1/ask
VITE_VERCEL_IS_WORK : <cloud server IP & port> or <domain name> + /api/v1/iswork
VITE_VERCEL_GET_BALANCE : <cloud server IP & port> or <domain name> + /api/v1/balance
```

5. Access your own **HenryBot.CHAT** !
