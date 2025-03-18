interface SampleNoticeDataType {
    id: number;
    category: string;
    title: string;
    recommend: number;
    view: number;
    date: string;
    content: string;
}

const SampleNoticeData: SampleNoticeDataType[] = [
    {
        id: 1,
        category: '공지사항',
        title: 'testtitle1',
        recommend: 100,
        view: 1000,
        date: 'testdate1',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
    {
        id: 2,
        category: '공지사항',
        title: 'testtitle2',
        recommend: 50,
        view: 500,
        date: 'testdate2',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
    {
        id: 3,
        category: '공지사항',
        title: 'testtitle3',
        recommend: 30,
        view: 300,
        date: 'testdate3',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
    {
        id: 4,
        category: '공지사항',
        title: 'testtitle4',
        recommend: 40,
        view: 400,
        date: 'testdate4',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
    {
        id: 5,
        category: '공지사항',
        title: 'testtitle5',
        recommend: 36,
        view: 356,
        date: 'testdate5',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
    {
        id: 6,
        category: '공지사항',
        title: 'testtitle6',
        recommend: 46,
        view: 3564,
        date: 'testdate6',
        content: '공지 내용입니다 이 서비스를 이용하면 필요한 공지들입니다.',
    },
];

export { SampleNoticeData, type SampleNoticeDataType };
