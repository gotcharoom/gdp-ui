interface SampleCsrDataType {
    id: string;
    category: string;
    users: User[];
    content: string;
    questionCount: number;
    answer: string;
}
interface User {
    userId: number;
    userName: string;
}

const SampleCsrData: SampleCsrDataType[] = [
    {
        id: '1',
        category: '회원기능',
        users: [],
        content: '비밀번호를 잊어버렸어요. 어떻게 변경하나요?',
        questionCount: 120,
        answer: "로그인 페이지에서 '비밀번호 찾기'를 클릭한 후, 이메일을 입력하여 비밀번호 재설정을 진행하세요.",
    },
    {
        id: '2',
        category: '회원기능',
        users: [],
        content: '이메일 주소를 변경할 수 있나요?',
        questionCount: 95,
        answer: '계정 설정 페이지에서 이메일 변경이 가능하며, 본인 인증 후 적용됩니다.',
    },
    {
        id: '3',
        category: '사이트 이용',
        users: [],
        content: '사이트 이용 중 오류가 발생했어요. 어떻게 해결하나요?',
        questionCount: 85,
        answer: '캐시 및 쿠키를 삭제한 후 다시 시도해보세요. 지속적인 오류 발생 시 고객센터로 문의 바랍니다.',
    },
    {
        id: '4',
        category: '사이트 이용',
        users: [],
        content: '사이트 접속이 불가능한 경우 어떻게 해야 하나요?',
        questionCount: 70,
        answer: '네트워크 상태를 확인하고, 다른 브라우저에서 접속을 시도해보세요. 문제가 지속되면 고객센터로 문의하세요.',
    },
    {
        id: '5',
        category: '콘텐츠',
        users: [],
        content: '콘텐츠를 다운로드할 수 있나요?',
        questionCount: 60,
        answer: '일부 콘텐츠는 다운로드 가능하며, 해당 옵션이 활성화된 경우에만 가능합니다.',
    },
    {
        id: '6',
        category: '콘텐츠',
        users: [],
        content: '구매한 콘텐츠를 다른 기기에서 볼 수 있나요?',
        questionCount: 110,
        answer: '네, 같은 계정으로 로그인하면 다른 기기에서도 콘텐츠를 이용할 수 있습니다.',
    },
    {
        id: '7',
        category: '도전과제 연동',
        users: [],
        content: '도전과제 연동이 안 되는 경우 어떻게 하나요?',
        questionCount: 130,
        answer: '설정에서 도전과제 연동이 활성화되었는지 확인하고, 네트워크 연결을 점검하세요.',
    },
    {
        id: '8',
        category: '도전과제 연동',
        users: [],
        content: '도전과제 진행 상황을 초기화할 수 있나요?',
        questionCount: 50,
        answer: '일부 도전과제는 초기화가 가능하지만, 특정 도전과제는 진행 상황을 되돌릴 수 없습니다.',
    },
    {
        id: '9',
        category: '소셜기능',
        users: [],
        content: '친구를 추가하는 방법이 궁금해요.',
        questionCount: 125,
        answer: "사용자의 프로필 페이지에서 '친구 추가' 버튼을 클릭하여 친구 요청을 보낼 수 있습니다.",
    },
    {
        id: '10',
        category: '소셜기능',
        users: [],
        content: '채팅 기능을 이용하려면 어떻게 해야 하나요?',
        questionCount: 90,
        answer: '로그인 후 친구 목록에서 상대방을 선택하여 채팅을 시작할 수 있습니다.',
    },
    {
        id: '11',
        category: '이용약관',
        users: [],
        content: '이용약관 변경 사항은 어디에서 확인할 수 있나요?',
        questionCount: 55,
        answer: '이용약관 페이지에서 최신 변경 사항을 확인할 수 있습니다.',
    },
    {
        id: '12',
        category: '이용약관',
        users: [],
        content: '회원 탈퇴 후 데이터는 어떻게 처리되나요?',
        questionCount: 78,
        answer: '회원 탈퇴 시 개인정보는 일정 기간 후 완전히 삭제됩니다. 다만, 일부 법적 보관 정보는 유지될 수 있습니다.',
    },
    {
        id: '13',
        category: '도전과제 연동',
        users: [],
        content: '도전과제 달성 보상을 받을 수 없는 경우 어떻게 하나요?',
        questionCount: 105,
        answer: '보상 수령 조건을 만족했는지 확인하고, 문제가 지속될 경우 고객센터에 문의하세요.',
    },
    {
        id: '14',
        category: '사이트 이용',
        users: [],
        content: '사이트에서 다크 모드를 사용할 수 있나요?',
        questionCount: 89,
        answer: '네, 설정 페이지에서 다크 모드를 활성화할 수 있습니다.',
    },
    {
        id: '15',
        category: '콘텐츠',
        users: [],
        content: '콘텐츠가 재생되지 않는 경우 어떻게 해야 하나요?',
        questionCount: 98,
        answer: '브라우저 캐시 삭제 후 다시 시도하거나, 최신 버전의 브라우저를 사용해보세요.',
    },
];
export { SampleCsrData, type SampleCsrDataType };
