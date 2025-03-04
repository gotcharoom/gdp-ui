import * as mswUtil from '@/common/utils/mswUtil.ts';
import { HttpHandler } from 'msw';
import { SampleData } from '../datas/sampleData.ts';

const url: { [key: string]: string } = {
    sampletest: '/test',
};

const sampleHandler: HttpHandler[] = [mswUtil.postRest(url.sampletest, SampleData)];

export default sampleHandler;
