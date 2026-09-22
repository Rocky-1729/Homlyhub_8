import express from 'express';
import { getProperties, getProperty } from '../contollers/propertyControllor.js';

const PropertyRouter = express.Router();

PropertyRouter.route('/').get(getProperties);
PropertyRouter.route('/:id').get(getProperty);
export{PropertyRouter};