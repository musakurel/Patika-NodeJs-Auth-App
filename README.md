# Node.js JWT Authentication App 

## About Project

### Simple Homepage
![Simple Homepage](https://cdn.hashnode.com/res/hashnode/image/upload/v1642942334789/IwI1XCmDF.png)

### Signup Page

![Signup Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1642942401445/3aA8i4eeG.png)

When you signup to the app, go to login page
### Login Page

![Login Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1642942440499/9-FECoZ4x.png)

Fill out your credentials and boom! You've signed in.


![Screen Shot 2022-01-23 at 15.56.24.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642942614562/f8yQJKXum.png)
If you check your browser's application tab, you'll see your JWT Token


## How to use

Firstly you have to install dependencies

```
npm install
``` 
After you install all dependencies, you should create .env file to your root directory and add your MongoDB connect credentials and Token Key


```
dbURI = mongodb+srv://<username>:<userpassword>@cluster0.laqok.mongodb.net/<Your database name>?retryWrites=true&w=majority
TOKEN_KEY="Enter your secret key"
``` 



Now, you can start your Auth app!
```
npm start
``` 

[Link of github repo](https://github.com/musakurel/Patika-NodeJs-JWT-Auth-App-TS-version-)



