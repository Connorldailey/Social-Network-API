# Social Network API

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

The Social Network API is a backend application designed to support a social network web application. Users can share their thoughts, react to friends' thoughts, and create a friend list. Built with Express.js, a MongoDB database, and the Mongoose ODM, this project demonstrates the power of RESTful APIs and database management in creating dynamic and scalable applications.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install the project locally, follow the steps below:

1. Clone the repository:

    ```git clone git@github.com:Connorldailey/Social-Network-API.git```

2. Navigate to the project directory:

    ```cd Social-Network-API```

3. Install dependencies:

    ```npm install```

4. Start the server

    ```npm start```

## Usage

[Demonstration and Usage Overview](https://drive.google.com/file/d/1s-gHZk_9C94Q72FKt1rD8f3SYQCCOy4-/view?usp=drive_link)

- Use an API testing tool like **Insomnia** or **Postman** to interact with the API.
- Key Features:
    - **Users:** Create, update, delete users, and manage their friend lists.
    - **Thoughts:** Share, update, and delete thoughts.
    - **Reactions:** Add and remove reactions to thoughts.

### API Endpoints:

- User Routes:
    - GET /api/users - Get all users.
    - GET /api/users/:userId - Get a single user by ID.
    - POST /api/users - Create a new user.
    - PUT /api/users/:userId - Update a user.
    - DELETE /api/users/:userId - Delete a user.
    - POST /api/users/:userId/friends/:friendId - Add a friend.
    - DELETE /api/users/:userId/friends/:friendId - Remove a friend.

- Thought Routes:
    - GET /api/thoughts - Get all thoughts.
    - GET /api/thoughts/:thoughtId - Get a single thought by ID.
    - POST /api/thoughts - Create a new thought.
    - PUT /api/thoughts/:thoughtId - Update a thought.
    - DELETE /api/thoughts/:thoughtId - Delete a thought.
    - POST /api/thoughts/:thoughtId/reactions - Add a reaction.
    - DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction.

## Credits

This project was inspired by the practical needs of creating dynamic social networking applications. Special thanks to resources from The Ohio State University Coding Bootcamp.

## License

This project is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details. 

## Contributing

Contributions are welcome. Please fork the repository and create pull requests for any suggestions.

## Tests

No automated test suite is included, but endpoints were manually tested with **Insomnia**. You can follow these steps to verify functionality:
  1. Start the server using `npm start`.
  2. Use an API client to interact with the routes as documented above.
  3. Ensure proper request bodies and response codes for each route.

## Questions

If you have any questions about this project, feel free to reach out: 

- **GitHub:** [connorldailey](https://github.com/connorldailey)
- **Email:** connorldailey@gmail.com