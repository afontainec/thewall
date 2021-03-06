## CLI Tutorial Chinchay + Angular

### Overview

  For this tutorial we will have to servers running at the same time. One with the backend and another running the Angular app. 

## Backend Server

  For the backend server, follow [the cli tutorial](https://afontainec.github.io/chinchay/clitutorial). The only difference, is when running the chinchay new command, you can add the flag `--frontend disable` as follows:

```
$ chinchay new coffee --frontend disable
```

  This will not create the ejs files. We will not be needing them, we are going to do the frontend with Angular.

  The only new difference, its we need to configure so we do not get blocked by CORS. If you do not know what this is you can read [this blog](https://www.codecademy.com/articles/what-is-cors), but in short, by default the server will block any request that coming from another app. Therefore, it will block the requests of the frontend. On the backend, we add the following to our app.js. Its important that this should be defined *BEFORE* we indicate the app to use the coffeeAPI routes.

  ```javascript
    app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  ``` 

  Lets go and run the backend, run the following command on the backend directory:

```
$ npm start
```


## Angular App

Next, we need to create an Angular app. We need to install the [Angular cli](https://angular.io/cli).
If you do not have it go and run: 

```
$ npm install -g @angular/cli
```

*NOTE*: You will need to have [npm](https://www.npmjs.com/get-npm) installed.

Then we simply create the angular app called testChinchayAngular

```
$ ng new testChinchayAngular && cd testChinchayAngular
```


A prompt asking if you like to add the angular routing will show, press y to confirm we will like to add it and then select the stylesheet format of your preference. We will use CSS.

Next, we will add couple of modules. In the app.module.ts file, found within the src/app directory we will add the `FormsModule` and the `HttpClientModule` to the imports:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

We are now ready to run our chinchay command.


## Chinchay

We install chinchay:
```
$ npm install chinchay -s
$ npm install chinchay -g
```

Then we simply run the command to create all the views and logic to work with the `coffee` relation of the backend:

```
$ chinchay new coffee --frontend angular --backend disable
```

Note we are indicating the frontend is angular and that no backend files should be created.

This will create a coffee directory within src/app. This will include:

* Index component: Where a list of all the coffees will display.
* New component: To create a new coffee.
* Edit component: To edit an existing coffee.
* Show component: To view a coffee and its properties.
* Service: For connecting with the backend, to create, edit or retrieve data.
* Router: Configuration for the routes.

<br>

## Connecting Backend and Frontend

To connect the backend to the frontend we need to configure one more thing. In the file src/environments/environment.ts we need to add the variable `backend = http://localhost:3000`. This will indicate that the backend is running in the port 3000 of our machine.

```javascript
export const environment = {
  production: false,
  backend: 'http://localhost:3000'
};
```

Last, but not least we need to add the routes to the router. The router is in `src/app/app-routing.module.ts`. We import the routes generated by chinchay and concatenate them to the end of our routes. Note, the routes variable must not be a constant.

```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { coffeeRoutes }  from './coffee/router';


let routes: Routes = [];

routes = routes.concat(coffeeRoutes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```



## Running the app

Now we are ready to run our app! We run:


```
$ ng serve
```

This will make our app run on [localhost:4200](localhost:4200).

Well, when you visit your app you get a Angular default webpage... To remove it, we go to `src/app/app.component.html` and leave only the router-outlet.

```html
<router-outlet></router-outlet>
```

Now we reload, and get an empty page. But lets navigate to [localhost:4200/coffee](localhost:4200) and we will see all our coffees! Go ahead and create more coffees!

Important: remember that the backend must be running!

Enjoy!

For more information to work around Chinchay CLI:

[See the Command Line Interface Documentation!](https://afontainec.github.io/chinchay/clidocs)
