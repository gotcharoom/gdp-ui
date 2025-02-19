import sampleHandler from './handlers/sampleHandler.ts';
import { HttpHandler } from 'msw';
import sampleNotice from './handlers/sampleNotice.ts';

export const handlers: HttpHandler[] = [...sampleHandler, ...sampleNotice];
