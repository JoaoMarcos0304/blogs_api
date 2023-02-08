const express = require('express');
const routersLogin = require('./routers/loginRouter');
const routersUser = require('./routers/userRouters');
const routersCategory = require('./routers/categoryRouter');
const routersPost = require('./routers/postRouter');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', routersLogin);
app.use('/user', routersUser);
app.use('/categories', routersCategory);
app.use('/post', routersPost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
