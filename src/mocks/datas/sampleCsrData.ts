interface SampleCsrDataType {
    id: string;
    category: string;
    users: User[];
    content: string;
}
interface User {
    userId: number;
    userName: string;
}

const SampleCsrData: SampleCsrDataType[] = [
    {
        category: '회원기능',
        id: 'Csr1',
        users: [
            {
                userId: 132,
                userName: 'ASZ132',
            },
        ],
        content: '비밀번호를 까먹었어요 어떻게 하죠?',
    },
    {
        category: '사이트 이용',
        id: 'Csr2',
        users: [
            {
                userId: 133,
                userName: 'ASZ133',
            },
        ],
        content: '도전과제 연동을 어떻게 해야할까요?',
    },
    {
        category: '콘텐츠',
        id: 'Csr3',
        users: [
            {
                userId: 134,
                userName: 'ASZ134',
            },
        ],
        content: '콘텐츠가 너무 부족해요 더 추가해주세요',
    },
];

export { SampleCsrData, type SampleCsrDataType };
