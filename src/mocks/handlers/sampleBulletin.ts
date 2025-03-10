import { getRest } from '@/common/utils/mswUtil';
import { HttpHandler } from 'msw';
import { SampleBulletinData } from '../datas/sampleBulletinData';

const url: { [key: string]: string } = {
    bulletin: '/bulletin',
};
const sampleBulletin: HttpHandler[] = [getRest(url.notice, SampleBulletinData)];

export default sampleBulletin;
