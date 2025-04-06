import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const healthRouter: Router = Router();

healthRouter.get('/', healthCheck);

export default healthRouter;
