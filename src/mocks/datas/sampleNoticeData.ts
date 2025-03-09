interface SampleNoticeDataType {
    id: number;
    category: string;
    title: string;
    recommend: number;
    view: number;
    date: string;
}

const SampleNoticeData: SampleNoticeDataType[] = [
    {
        id: 1,
        category: 'test1',
        title: 'testtitle1',
        recommend: 100,
        view: 1000,
        date: 'testdate1',
    },
    {
        id: 2,
        category: 'test2',
        title: 'testtitle2',
        recommend: 50,
        view: 500,
        date: 'testdate2',
    },
    {
        id: 3,
        category: 'test3',
        title: 'testtitle3',
        recommend: 30,
        view: 300,
        date: 'testdate3',
    },
    {
        id: 4,
        category: 'test4',
        title: 'testtitle4',
        recommend: 40,
        view: 400,
        date: 'testdate4',
    },
    {
        id: 5,
        category: 'test5',
        title: 'testtitle5',
        recommend: 36,
        view: 356,
        date: 'testdate5',
    },
    {
        id: 6,
        category: 'test6',
        title: 'testtitle6',
        recommend: 46,
        view: 3564,
        date: 'testdate6',
    },
];

export { SampleNoticeData, type SampleNoticeDataType };
