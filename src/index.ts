import 'dotenv/config';
import validateEnv from './utils/validateEnv'
import App from './app';

validateEnv();

const app = new App(Number(process.env.PORT) || 3000);

app.listen();

export default app