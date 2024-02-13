
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```



---

# NestJS Project with Prisma and GraphQL

## Description

This project is a NestJS application that utilizes Prisma as the ORM and GraphQL for API endpoints. It provides mutations for user sign up and sign in functionality.

## Features

- User sign up mutation
- User sign in mutation
- Integration with Prisma for database operations
- GraphQL API for user authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ocee1/auth-assessment
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   
   - Create a `.env` file in the root directory of the project.
   - Add environment variables such as database connection URL, JWT secret, etc.
   
   Example `.env` file:
   ```plaintext
   DATABASE_URL=your_database_connection_url
   JWT_SECRET=your_jwt_secret
   ```

5. Run the migration to initialize the database schema:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run start:dev
   ```

## Usage

### Sign Up Mutation

- Endpoint: `/graphql`
- Method: `POST`
- Query:
  ```graphql
  mutation {
    signin(SignInInput: {
      email: "example@email.com",
      username: "john-Doe",
      password: "password123"
    }) {
      accessToken
      refreshToken
      user {
        email
        username
      }
    }
  }
  ```
- Description: Creates a new user with the provided username, email, and password.

### Sign In Mutation

- Endpoint: `/graphql`
- Method: `POST`
- Query:
  ```graphql
  mutation {
    signin(SignInInput: {
      email: "example@email.com",
      password: "password123"
    }) {
      accessToken
      refreshToken
      user {
        username
      }
    }
  }
  ```
- Description: Logs in a user with the provided email and password and returns an authentication token along with user information.


## License

This project is licensed under the [MIT License](LICENSE).

---



## License

Nest is [MIT licensed](LICENSE).
