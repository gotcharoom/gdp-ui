import { getRest } from '@/common/utils/mswUtil';
import { HttpHandler } from 'msw';
import { SampleCsrData } from '../datas/sampleCsrData';

const url: { [key: string]: string } = {
    csr: '/Csr',
};
const sampleCsr: HttpHandler[] = [getRest(url.csr, SampleCsrData)];

export default sampleCsr;
