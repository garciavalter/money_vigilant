import 'reflect-metadata';
import app from './express';
const port = process.env.PORT || 3131;
app.listen(port, () => console.log('Server is running'));


