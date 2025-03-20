interface SampleBulletinDataType {
    id: number;
    category: string;
    title: string;
    recommend: number;
    view: number;
    date: string;
    content: string;
    comments: Comments[];
    commnetsIndex: number;
    users: User[];
    writter: string;
}
interface Comments {
    user: string;
    reply: string;
}
interface User {
    userId: number;
    userName: string;
}
const SampleBulletinData: SampleBulletinDataType[] = [
    {
        id: 11,
        category: 'test1',
        title: 'testtitle1',
        recommend: 100,
        view: 1000,
        date: 'testdate1',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '찰리',
                reply: '이거 재밌네요',
            },
            {
                user: '릴리',
                reply: '이거 존나 재미없네요',
            },
        ],
        commnetsIndex: 1,
        users: [
            {
                userId: 1322,
                userName: 'gaile',
            },
        ],
        writter: 'gaile',
    },
    {
        id: 12,
        category: 'test2',
        title: 'testtitle2',
        recommend: 50,
        view: 500,
        date: 'testdate2',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '빌리',
                reply: '이거 참 재밌네요',
            },
        ],
        commnetsIndex: 2,
        users: [
            {
                userId: 1323,
                userName: 'gorry',
            },
        ],
        writter: 'gerry',
    },
    {
        id: 13,
        category: 'test3',
        title: 'testtitle3',
        recommend: 30,
        view: 300,
        date: 'testdate3',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '길리',
                reply: '이거 너무 재밌네요',
            },
        ],
        commnetsIndex: 3,
        users: [
            {
                userId: 1324,
                userName: 'OeweO',
            },
        ],
        writter: 'OeweO',
    },
    {
        id: 14,
        category: 'test4',
        title: 'testtitle4',
        recommend: 40,
        view: 400,
        date: 'testdate4',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '쉬리',
                reply: '이거 쉽고 재밌네요',
            },
        ],
        commnetsIndex: 4,
        users: [
            {
                userId: 1325,
                userName: 'Reesd',
            },
        ],
        writter: 'gerqry',
    },
    {
        id: 15,
        category: 'test5',
        title: 'testtitle5',
        recommend: 36,
        view: 356,
        date: 'testdate5',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '아리',
                reply: '이거 진짜 재밌네요',
            },
        ],
        commnetsIndex: 5,
        users: [
            {
                userId: 1326,
                userName: 'Wrath',
            },
        ],
        writter: 'gerrey',
    },
    {
        id: 16,
        category: 'test6',
        title: 'testtitle6',
        recommend: 46,
        view: 3564,
        date: 'testdate6',
        content: '몬헌 업적을 만들었습니다. 몬헌 시간 1000시간 업적',
        comments: [
            {
                user: '고리',
                reply: '이거 겁나 재밌네요',
            },
        ],
        commnetsIndex: 6,
        users: [
            {
                userId: 1326,
                userName: 'Earta',
            },
        ],
        writter: 'gerryy',
    },
];

export { SampleBulletinData, type SampleBulletinDataType };
