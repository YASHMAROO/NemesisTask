const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/users');
const detailRoutes=require('./routes/screen2');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('DB connected');
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', userRoutes);
app.use('/', detailRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
})