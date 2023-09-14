<p align="center">
    <img width="30"  alt="ammarahmed.ca Website Logo" src="./images/LogoIcon.png?raw=true">
</p>
<h1 align="center">ammarahmed.ca</h1>
<p align="center">
    <img width="1423" alt="ammarahmed.ca landing page" src="./images/HomePageGIFv2.gif?raw=true">
</p>
<p align="center">After re-making and re-designing my personal website hundreds of times, I have finally arrived at a design which I quite enjoy. Take a scroll at <a href="https://ammarahmed.ca">ammarahmed.ca</a></p>

## 👨‍💻 Tech Stack

A high-level overview of the tech stack this website uses:

**Front-end**

- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) is used for the functionality of the website.
- [ChakraUI](https://chakra-ui.com/) is used to create the standardized and aesthetic UI.
- [Apollo Client](https://www.apollographql.com/docs/react/) is used to handle making GraphQL requests.

**[Back-end](https://github.com/ammar-ahmed22/ammarahmedca-server)**

- [Node.js](https://nodejs.org/en/) with [TypeScript](https://www.typescriptlang.org/) is used for the server environment.
- [Notion](https://www.notion.so/product?fredir=1) is used to persist web content (database).
- [Notion API](https://developers.notion.com/) is used to connect the server to Notion
- [TypeGraphQL](https://typegraphql.com/docs/getting-started.html) is used to structure the [GraphQL](https://graphql.org/) API with TypeScript.
- [MongoDB](https://www.mongodb.com/) is used to persist user and game data.
- [Typegoose](https://typegoose.github.io/typegoose/) is used to structure MongoDB data.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) is used to serve the GraphQL API

**Hosting**

- [Google Firebase](https://firebase.google.com/) is used for the client-side hosting
- [Fly.io](https://fly.io/docs/) is used for the server-side hosting.

## 🔧 Notable Features

### Content Management

Web content such as blog posts, project content, skills etc. are written, edited and persisted in Notion. Automatically updated whenever changed in Notion

### Light/Dark Mode

Switching between light and dark mode. Default is set according to your system settings.

### Continous Deployment

Client-side and server-side deployment is set-up automatically with `production` branch pushes. SMS Notifications are sent to me after deployment finishes using Twilio.

### Skill Charts

Aesthetic radar charts created for skills using [recharts](https://recharts.org/en-US)

<!-- ## 🚧 Roadmap

### Feature: Chess Game

#### Description

- Play a game of no time limit Chess against me
- Players create an account and are notified by e-mail when it is their turn to play.
- All game logic and functionality written myself as a learning exercise.
- Player and game data persisted in MongoDB database
- Chess game state is sent and persisted as FEN string
- Players can register and login with custom authentication flow

#### Current Progress

- Chess game board can be rendered using FEN strings
- Game state can be converted to FEN string
- All game moves implemented including check guarding (edge cases not done yet: castling, en passant)
- Email sending implemented using SMTP and Gmail
- Authentication backend setup complete
- Authentication frontend complete
- Game database design complete
- Creating game, adding moves, querying game API implemented -->

## 🎨 Design Reference

#### Colors

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Blue | ![#667EEA](https://placehold.co/15x15/667EEA/667EEA.png) #667EEA |
| Purple | ![#764BA2](https://placehold.co/15x15/764BA2/764BA2.png) #764BA2 |
| Dark Color | ![#1A202C](https://placehold.co/15x15/1a202c/1a202c.png) #1A202C |
| Light Color| ![#FFFFFF](https://placehold.co/15x15/ffffff/ffffff.png) #FFFFFF |

#### Fonts

| Type    | Font                                                                            |
| ------- | ------------------------------------------------------------------------------- |
| Heading | [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display), _serif_ |
| Body    | [Manrope](https://fonts.google.com/specimen/Manrope), _sans-serif_              |

## 💬 Feedback

If you have any feedback, please reach out to me at ammar.ahmed1@uwaterloo.ca. If you find any bugs/issues with the Chess game, please create an issue or feel free to make a PR with a fix.

## 📋 Articles/References

#### Docs

- [Chakra UI](https://chakra-ui.com/docs/components/overview)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Notion API](https://developers.notion.com/reference/intro)
- [TypeGraphQL](https://typegraphql.com/docs/getting-started.html)
- [Typegoose](https://typegoose.github.io/typegoose/)

<!-- #### Chess (Coming soon...)

- [JWT Frontend Token Authentication](https://medium.com/ovrsea/token-authentication-with-react-and-apollo-client-a-detailed-example-a3cc23760e9)
- [GraphQL Authentication](https://www.youtube.com/watch?v=dBuU61ABEDs)
- [FEN Strings for Chess games](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
- [FEN Generator for testing](http://www.netreal.de/Forsyth-Edwards-Notation/index.php) -->
<!-- - [Google Authentication](https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del)
- [Backend Authentication with Google](https://developers.google.com/identity/sign-in/web/backend-auth) -->
