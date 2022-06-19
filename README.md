
<p align="center">
    <img width="30"  alt="ammarahmed.ca Website Logo" src="./images/LogoIcon.png?raw=true">
</p>
<h1 align="center">ammarahmed.ca</h1>
<p align="center">
    <img width="1423" alt="ammarahmed.ca landing page" src="./images/HomePage.png?raw=true">
</p>
<p align="center">After re-making and re-designing my personal website hundreds of times, I have finally arrived at a design which I quite enjoy. Take a scroll at <a href="https://ammarahmed.ca">ammarahmed.ca</a></p>


## 👨‍💻 Tech Stack

A high-level overview of the tech stack this website uses: 

**Front-end**
- [React](https://reactjs.org/) is used for the functionality of the website.
- [ChakraUI](https://chakra-ui.com/) is used to create the standardized and aesthetic UI. 
- [Apollo Client](https://www.apollographql.com/docs/react/) is used to simplify making GraphQL requests.

**Back-end**
- [Node.js](https://nodejs.org/en/) is used for the server environment.
- [Notion](https://www.notion.so/product?fredir=1) is used to persist web content (database).
- [Notion API](https://developers.notion.com/) is used to connect the server to Notion 
- [GraphQL](https://graphql.org/) is used to structure the API for data retrieval
- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express) is used to serve the GraphQL API

**Hosting**
- [Google Firebase](https://firebase.google.com/) is used for the client-side hosting
- [Heroku](https://www.heroku.com/what) is used for the server-side hosting 

## 🔧 Features

| Feature | Description |
| ------- | ----------- |
| **Content Management** | Web content such as blog posts, project content, skills etc. are written, edited and persisted in Notion. Automatically updated whenever changed in Notion |
| **Light/Dark Mode** | Switching between light and dark mode. Default is set according to your system settings. |
| **Skill Charts** | Aesthetic radar charts created for skills using [recharts](https://recharts.org/en-US). |


#### 🚧 Roadmap

| Feature | Description | Current Progress | 
| ------- | ----------- | ---------------- |
| 1-day time limit Chess game | <ul><li>Play a game of 1-day time limit Chess against me</li><li>Players create an account and are notified by e-mail when it is their turn to play. </li><li>All game logic and functionality written myself as a learning exercise.</li><li>Player and game data persisted in MongoDB database</li><li>Chess game state is sent and persisted as FEN string</li><li>Players can register and login with Google as well as custom authentication flow.</li></ul> | <ul><li>Custom authentication flow implemented.</li><li>Google OAuth2 flow implemented.</li><li>Chess game board can be rendered using FEN strings</li><li>Simple pieces such as pawn, bishop, queen and rook can move with the correct rules.</li><li>Game state can be converted to FEN string</li><li>Server can send e-mails for forgetten and reset password</li></ul> |

## 🎨 Design Reference
#### Colors

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Light Mode Primary | ![#a10010](https://via.placeholder.com/10/a10010?text=+) #A10010 |
| Dark Mode Primary | ![#9c414a](https://via.placeholder.com/10/9c414a?text=+) #9C414A |
| Dark Color | ![#1a202c](https://via.placeholder.com/10/1a202c?text=+) #1A202C |
| Light Color| ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #FFFFFF |

#### Fonts
| Type | Font |
| ---- | ---- |
| Heading | [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display), *serif* |
| Body | [Manrope](https://fonts.google.com/specimen/Manrope), *sans-serif* | 

## 💬 Feedback

If you have any feedback, please reach out to me at ammar.ahmed1@uwaterloo.ca.

## 📋 Articles/References

#### Docs
- [Chakra UI](https://chakra-ui.com/docs/components/overview)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Notion API](https://developers.notion.com/reference/intro)

#### Chess (Coming soon...)

- [JWT Frontend Token Authentication](https://medium.com/ovrsea/token-authentication-with-react-and-apollo-client-a-detailed-example-a3cc23760e9)
- [Google Authentication](https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del)
- [Backend Authentication with Google](https://developers.google.com/identity/sign-in/web/backend-auth)
- [Google Sign-In Button Style Guide](https://developers.google.com/identity/branding-guidelines)
- [GraphQL Authentication](https://www.youtube.com/watch?v=dBuU61ABEDs)
- [FEN Strings for Chess games](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)





