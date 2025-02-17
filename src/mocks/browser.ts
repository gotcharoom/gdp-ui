import { setupWorker } from 'msw/browser';
import { handlers } from './handlers'; // 요청 핸들러들을 불러옴

export const worker = setupWorker(...handlers); // 서버 설정
