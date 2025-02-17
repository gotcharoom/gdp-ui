import sampleHandler from './handlers/sampleHandler.ts';
import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [...sampleHandler];
