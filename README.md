# Skrrible

A multiplayer drawing and guessing game built with React, Socket.io, and Node.js. It's basically a clone of Skribbl.io where you can hang out with friends in private rooms, take turns drawing, and try to guess the word to earn points.

## Features

- **Real-time multiplayer:** Everything is synced up via WebSockets so the drawing and guessing happens instantly.
- **Drawing tools:** The current drawer gets a canvas with a bunch of colors and an eraser. If it's not your turn, you just get to watch!
- **Turn-based gameplay:** The game automatically rotates the drawer. Everyone else tries to guess the word in the chat.
- **Smart chat:** Type your guesses in the chatbox. If you get it right, it hides the word from others and awards you points instead of spoiling the answer.
- **Word hints:** Guessers see masked words (like `A _ _ L E`) to give them a fighting chance.
- **Synced game state:** Timers, rounds, and scores are handled on the backend and kept perfectly in sync on the frontend using Zustand.
- **Lobby system:** Create a private room, share the code, and wait for your friends to join and ready up before starting.
- **Accounts:** Basic auth setup to keep track of usernames and profiles.

## Tech Stack

Here's what I used to build it:

**Frontend:**
- React
- Tailwind for styling
- Zustand for state management
- Socket.io-client to talk to the server
- React Router DOM for page navigation

**Backend:**
- Node.js & Express
- Socket.io for all the real-time event handling
- MongoDB (with Mongoose) for the database
- JWT & bcrypt for authentication
- Zod for validating API requests