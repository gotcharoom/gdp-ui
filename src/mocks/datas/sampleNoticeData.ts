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
        category: 'test',
        title: 'test',
        recommend: 100,
        view: 1000,
        date: 'test',
    },
    {
        id: 2,
        category: 'test',
        title: 'test',
        recommend: 50,
        view: 500,
        date: 'test',
    },
    {
        id: 3,
        category: 'test',
        title: 'test',
        recommend: 30,
        view: 300,
        date: 'test',
    },
    {
        id: 4,
        category: 'test',
        title: 'test',
        recommend: 40,
        view: 400,
        date: 'test',
    },
    {
        id: 5,
        category: 'test',
        title: 'test',
        recommend: 36,
        view: 356,
        date: 'test',
    },
];

export { SampleNoticeData, type SampleNoticeDataType };
