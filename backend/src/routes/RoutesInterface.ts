import { Router } from 'express';

export interface RoutesInterface {
  routes(): Router;
}
