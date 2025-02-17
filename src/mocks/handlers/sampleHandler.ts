import * as mswUtil from '@utils/mswUtil.ts';
import { HttpHandler } from 'msw';
import SampleData from '@mocks/datas/sampleData.ts';

const url: { [key: string]: string } = {
    sampletest: '',
};

const sampleHandler: HttpHandler[] = [mswUtil.postRest(url.sampletest, SampleData)];

export default sampleHandler;
