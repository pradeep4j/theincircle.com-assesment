Features implemented:-
•	Formik and yup validations support
•	Error handling with JavaScript error method
•	Winston logger to put logs in log file in local for debugging made easy
•	Try and catch fully implemented
•	Proper indentation
•	Storing states of whole app with redux, react-redux and thunk middleware
•	Awesome React-toastify alerts are implemented.
•	Jwt token implemented via jsonwebtoken
•	Bcryptjs is used to encrypt passwords before saving to database.
•	For securing senstive informations .env folder implemented.
•	@mui/material inbuilt components are implanted throughout 
•	Jwt token created via openssl>rand –base64 32 method 


For backend setup:-
npm init –y       it will initialize an empty package.json
then start following
1. npm i body-parser cors 

2. npm i -s express
 Next one express is a node js web framework for routing the application and creating SPA, MPA and hybrid web application as well as web and mobile applications and 
3. npm i mongoose - create models for create for the posts, is an Object Data Modeling (ODM) library for MongoDB and Node.js, also it is ORM for mangodb) 
I have given two prefernces for implementing mongoDB atlas cloud or local.

4. npm i nodemon(nodemon is a tool that helps develop Node. js based applications by automatically restarting the node application when file changes in the directory are detected. Prevent to start server manaully).
5. npm i bcryptjs
What is Bcryptjs used for?
js uses “bcryptjs”. This module enables storing of passwords as hashed passwords instead of plaintext

6. JWT – npm i jsonwebtoken
What is JSON Web Token used for?
JWT, or JSON Web Token, is an open standard used to share information between two parties securely — a client and a server. In most cases, it's an encoded JSON containing a set of claims and a signature

7. npm i cookie-parser
What is a cookie parser?
cookie-parser is a middleware which parses cookies attached to the client request object. 

8. npm i dotenv
What is dotenv used for?
Dotenv is a zero-dependency module that loads environment variables from a . env file into process. env . Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology
9.  npm install winston --legacy-peer-deps
winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage.

Backend dependency installation ends

For frontend setup:-
1.	npm i react-router-dom 
2.	npm i axios is javascript library in react (for sending request to the server as get, post, put, delete etc)
3.	npm i react-notifications (gives excellent alerts after CRUD operations. We can also use sweetalert library)
4.	npm i moment (used for time and date)  
5.	npm install redux react-redux
6.	npm i jwt-decode
7.	npm i react-stripe-checkout
8.	npm i react-toastify
This tool allows you to add toast notifications or snackbars to your application with ease and can also be used to set notifications and alerts.
9.	For mui/material all dependencies use 
npm install @mui/material @emotion/react @emotion/styled

Material UI uses Emotion as its default styling engine. If you want to use styled-components instead, run one of the following commands:
10. npm install @mui/material @mui/styled-engine-sc styled-components

To use the font Icon component or the prebuilt SVG Material Icons
11. npm install @mui/icons-material

Material UI is designed to use the Roboto font by default
12. npm install @fontsource/roboto

13. npm install react-bootstrap --force

14.	npm install formik 
formik is third party React form library. It provides basic form programming and validation. It is based on controlled component and greatly reduces the time to do form programming. Let us recreate the expense form using Formik library. 

15.	npm install yup
Yup is a JavaScript object schema validator with formik.

16.	Npm install redux-devtools-extension
Redux DevTools is used for debugging application's state changes on chrome extension. Also used for adding thunk with composeWithDevTools

17.	npm install --save react-spinners  for Cliploader component

Now run in frontend folder
npm start
Frontend dependency installation ends

Authentication RESTFull API's decription:-
a) For authenticating users I have taken jwt token management for authentication. There are 6 API's for users login, register,logout, edit, update and delete.
b) For students records we have also six API's showing all students, create,edit,update,delete and search students.
c) All API's are protected from frontend as well as backend via jwt tokens protection.










