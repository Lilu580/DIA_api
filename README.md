# DIA_api
Test task where you can registrate new user and autorize, deployed on render.

# Technologies
* JS
* Node.js
* Nodemon
* MongoDB
* Express
* JWT
* Zod
* Bcryptjs
* body-parser

# Usage
* sending POST request on https://dia-test.onrender.com/auth/registration with data {"email", "phone", "login", "name", "password"} you can register new user
* sendng POST request on https://dia-test.onrender.com/auth/authorization width data { ("email" | "phone" | "login"), "password"} you can get acces token for auth
* additionaly you can get arr of users sending GET request on https://dia-test.onrender.com/auth/authorization you can get array of users.

# Author 
- [Linkedin](https://www.linkedin.com/in/bogdan-maliuta-217048274/)
- [Telegram](https://t.me/lilu580)
- [Email](bogdanmaliutawork@gmail.com)
