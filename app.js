const express = require("express");
const app = express();
const userRouter = require('./routers/user_router');



app.use(express.json());

app.use('/',userRouter)


const PORT = 3000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

