import { HttpHandler } from 'msw';
import { SampleNoticeData } from '../datas/sampleNoticeData.ts';
import { getRest } from '@/common/utils/mswUtil.ts';

const url: { [key: string]: string } = {
    notice: '/notice',
};

const sampleNotice: HttpHandler[] = [getRest(url.notice, SampleNoticeData)];

export default sampleNotice;
