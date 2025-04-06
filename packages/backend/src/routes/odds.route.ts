import { Router } from 'express';
import { calculateOdds } from '../controllers/odds.controller';

const oddsRouter: Router = Router();

oddsRouter.post('/', calculateOdds);

export default oddsRouter;
