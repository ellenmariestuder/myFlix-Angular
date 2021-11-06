# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

![](./src/assets/myflix-angular.mov)

# Description
myFlix is a web application where users can create an account, view detailed movie, genre, and director information, and save movies to their list of favorites. It utilizes the myFlix [Movie API](https://github.com/ellenmariestuder/movie_api)-- follow link for API repo and documentation. 

# Technologies
This app was built using the MEAN stack. Technologies used include:   
* MongoDB
* Express.js
* Angular
* Node.js
* Angular Material

# Features
* Welcome screen 
  - Registration dialog where new users can create an account
  - Login dialog where existing users can log in
* Movie view
  - Movie cards displaying movie title, image, and a button for adding the movie to user's list of favorites; as well as links to movie genre, director, and description dialogs
    - Genre dialog: displays genre name and description
    - Director dialog: displays director name and bio
    - Synopsis dialog: displays movie description
* User profile view 
  - Displays user data, including username, password, email, and birthday
  - Displays user's favorite movies (including buttons for removing a movie from a user's list of favorites)  
  - Update Info button where users can update their personal data
  - Delete Account button where users can deregister their account 

# 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
