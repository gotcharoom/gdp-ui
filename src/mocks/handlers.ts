import sampleHandler from './handlers/sampleHandler.ts';
import { HttpHandler } from 'msw';
import sampleNotice from './handlers/sampleNotice.ts';
import sampleBulletin from './handlers/sampleBulletin.ts';
import sampleCsr from './handlers/sampleCsr.ts';

export const handlers: HttpHandler[] = [...sampleHandler, ...sampleNotice, ...sampleBulletin, ...sampleCsr];
