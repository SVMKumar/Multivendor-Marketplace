### multivendor-marketplace

This is a full-stack application for a multivendor marketplace. It consists of a frontend built with Angular and a backend using Node.js, Express, and MongoDB.

### Getting Started

#### Prerequisites

* Node.js (LTS version recommended)
* MongoDB installed and running, or a MongoDB Atlas connection string.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd <path_to_frontend_folder>
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    ng serve
    ```
    The application will be accessible at `http://localhost:4200/`.

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd <path_to_backend_folder>
    ```
2.  Create a `.env` file in the root of the backend folder with the following variables:
    ```
    MONGO_URI="your_mongodb_connection_string"
    JWT_KEY="your_secret_key_for_jwt"
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```
4.  Start the backend server. You can choose one of the following methods:
    * **Development mode (with hot-reloading)**:
        ```bash
        nodemon app.js
        ```
    * **Production mode**:
        ```bash
        node app.js
        ```
    The backend server will run on port `3000` by default.

### Development Information (from original README)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

#### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

#### Further help
To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
