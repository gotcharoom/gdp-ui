import sampleHandler from '@mocks/handlers/sampleHandler.ts';
import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [...sampleHandler];
