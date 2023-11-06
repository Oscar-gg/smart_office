# General Documentation

### Connection of Node Mcu and server

To provide real-time communication between the Node Mcu and the server, we use WebSockets. Websockets is a bi-directional communication protocol, which means that both the server and the client can send messages to each other at any time. This is different from the traditional HTTP protocol, where the client sends a request to the server, and the server responds with a response. This communication method has the advantage of reusing the connection channel, which is useful for real-time applications, such as ours.

https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/

There are several ways of implementing web socket communication, but we use the AWS API Gateway, which is a service that makes it easy to create, publish, maintain, monitor, and secure APIs. The free tier includes sufficient resources for the use case of our project:

>The Amazon API Gateway free tier includes one million API calls received for REST APIs, one million API calls received for HTTP APIs, and one million messages and 750,000 connection minutes for WebSocket APIs per month for up to 12 months: [AWS API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/)

When using API Gateway, several options can be established to configure the WebSocket connection. In particular, the integration request and response allows us to facilitate the management of the devices, by providing connection IDs that can be used to map devices in the database and use them in the backend.

In addition, another way of implementing web socket communication could be through a dedicated server (e.g. express server) which then could interact with the backend of the project and its specific API endpoints.

### Interacting with the server

When any NodeMcu or device connected to the WebSocket sends a message, the server receives and processes it. Depending on the value of the action field of the message, the server will perform different actions. This implementation was possible using the AWS API Gateway, which allows us to define different routes for different actions. The behavior of the server depends on the action specified and the value passed by the device. The specific actions and their behavior are defined in the API endpoints (src/pages/api) folder.

To handle the calls performed on the API, we use the tRPC library, which is a TypeScript framework for building end-to-end type-safe APIs. In src/server/api/ we define the routers and the procedures used to handle the calls. To communicate the tRPC procedures with the API endpoints, we define specific callers in src/server/api/ApiCallers.ts. Each caller is instantiated with a specific context, which is used when the caller is invoked.

### Useful tools for development

Using the AWS API Gateway implies that endpoints must be deployed to test them. This can be a tedious process, so we use ngrok, which is a tool that allows us to expose a local web server to the internet. This is useful for debugging since we can test the endpoints locally without deploying them.

Using ngrok, we can expose the local server to the internet by running the following command:

```bash
ngrok http http://localhost:8080
```

This will expose the local server to the internet, and provide a URL that can be used to test the endpoints. A full tutorial on how to use ngrok can be found [here](https://ngrok.com/docs/getting-started/?os=windows).

To specify a custom domain to avoid having to change the endpoints in the AWS console every time, the following [tutorial](https://ngrok.com/docs/getting-started/?os=windows#step-4-always-use-the-same-domain) can be followed.

This will result in a command similar to the following:

```bash
ngrok http 8080 --domain jumpy-red-mollusk.ngrok-free.app
```



