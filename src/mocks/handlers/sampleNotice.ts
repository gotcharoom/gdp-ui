import * as mswUtil from '@utils/mswUtil.ts';
import { HttpHandler } from 'msw';
import { SampleNoticeData } from '../datas/sampleNoticeData.ts';

const url: { [key: string]: string } = {
    notice: '/notice',
};

const sampleNotice: HttpHandler[] = [mswUtil.getRest(url.notice, SampleNoticeData)];

export default sampleNotice;
