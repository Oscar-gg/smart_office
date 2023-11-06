# Smart Office

Iot project to manage office spaces, provide insights and analytics.

This code corresponds to the serverless backend, where web clients make requests to and NodeMcu devices send data to.
For the NodeMcu code, please refer to [this repository](https://github.com/Oscar-gg/smart_office_nodemcu).

## Project explanation

For a detailed explanation of the project, please refer to the [docs folder](./docs/general.md), which elaborates on some of the 
technologies used and the architecture of the project.


## How to run

Run the server on localhost:3000:

```bash
git clone https://github.com/Oscar-gg/smart_office.git
cd smart_office
npm install
npm run dev
```

## Technologies used

- [T3 Stack](https://create.t3.gg/): A fullstack template for TypeScript projects with Next.js, Prisma, and tRPC

  - [Next.js](https://nextjs.org)
  - [NextAuth.js](https://next-auth.js.org)
  - [Prisma](https://prisma.io)
  - [Tailwind CSS](https://tailwindcss.com)
  - [tRPC](https://trpc.io)

- [AWS api gateway](https://aws.amazon.com/api-gateway/): API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

- [Ngrok](https://ngrok.com/docs/getting-started/?os=windows): Expose a local web server to the internet, useful for debugging.

- [Vercel](https://vercel.com/): Used for deployment.

- [Coackroackdb](https://www.cockroachlabs.com/): Used to host the database.

## How to deploy

-
