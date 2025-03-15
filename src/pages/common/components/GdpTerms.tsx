import '@styles/pages/common/AgreementPage.scss';

const GdpTerms = () => {
    return (
        <>
            <div className='terms__title'>제1조 (목적)</div>
            <div className='terms__contents'>
                {`이 약관은 [서비스명] (이하 "회사")이 제공하는 서비스(이하 "서비스")를 이용하는
        회원(이하 "회원")과 회사 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.`}
            </div>

            <div className='terms__title'>제2조 (회원가입 및 이용계약)</div>
            <div className='terms__list'>
                <ol>
                    <li>회원가입은 이용자가 본 약관에 동의하고, 회사가 정한 절차에 따라 가입을 신청한 후 승인을 받으면 완료됩니다.</li>
                    <li>
                        회사는 다음과 같은 경우 회원가입을 거부하거나 취소할 수 있습니다.
                        <ul className='terms__sub-list'>
                            <li>허위 정보를 기재한 경우</li>
                            <li>타인의 정보를 도용한 경우</li>
                            <li>기타 회사가 정한 기준에 부합하지 않는 경우</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div className='terms__title'>제3조 (회원의 의무)</div>
            <div className='terms__list'>
                <ol>
                    <li>회원은 본 약관 및 관련 법령을 준수해야 합니다.</li>
                    <li>회원은 본인의 계정 정보를 보호할 책임이 있으며, 타인에게 공유하거나 양도할 수 없습니다.</li>
                    <li>
                        서비스 이용 시 다음과 같은 행위를 해서는 안 됩니다.
                        <ul className='terms__sub-list'>
                            <li>불법적인 행위 또는 범죄와 관련된 행위</li>
                            <li>회사 또는 제3자의 권리를 침해하는 행위</li>
                            <li>기타 공공질서 및 미풍양속에 반하는 행위</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div className='terms__title'>제4조 (서비스 제공 및 변경)</div>
            <div className='terms__contents'>
                회사는 회원에게 원활한 서비스 제공을 위해 노력하며, 필요에 따라 서비스의 일부 또는 전부를 변경할 수 있습니다. 서비스 변경 시
                회원에게 사전 공지하며, 변경된 서비스 이용에 동의하지 않을 경우 회원 탈퇴가 가능합니다.
            </div>

            <div className='terms__title'>제5조 (회원 탈퇴 및 이용 제한)</div>
            <div className='terms__list'>
                <ol>
                    <li>회원은 언제든지 회사가 정한 절차에 따라 탈퇴할 수 있습니다.</li>
                    <li>
                        회사는 다음과 같은 경우 회원의 서비스 이용을 제한하거나 해지할 수 있습니다.
                        <ul className='terms__sub-list'>
                            <li>본 약관을 위반한 경우</li>
                            <li>타인의 서비스 이용을 방해한 경우</li>
                            <li>기타 회사가 서비스 운영에 필요하다고 판단하는 경우</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div className='terms__title'>제6조 (개인정보 보호)</div>
            <div className='terms__contents'>
                회사는 회원의 개인정보를 보호하며, 관련 법령을 준수합니다. 회원의 개인정보 수집 및 이용에 대한 상세 내용은
                <a href='#' className='terms__link'>
                    개인정보처리방침
                </a>
                에서 확인할 수 있습니다.
            </div>

            <div className='terms__title'>제7조 (면책조항)</div>
            <div className='terms__list'>
                <ol>
                    <li>
                        회사는 서비스 장애, 데이터 손실 등으로 인해 발생한 손해에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
                    </li>
                    <li>회원이 본인의 계정 정보를 관리하지 못해 발생한 문제에 대한 책임은 회원 본인에게 있습니다.</li>
                </ol>
            </div>
            <div className='terms__title'>제8조 (기타)</div>
            <div className='terms__list'>
                <li>본 약관은 관련 법령의 변경 또는 회사의 정책 변경에 따라 개정될 수 있으며, 변경 사항은 사전에 공지됩니다.</li>
                <li>본 약관에 명시되지 않은 사항은 관련 법령 및 일반적인 상관례에 따릅니다.</li>
            </div>

            <div className='terms__contents'>
                <strong>부칙</strong>: 본 약관은 <span id='date'>YYYY년 MM월 DD일</span>부터 적용됩니다.
            </div>
        </>
    );
};

export default GdpTerms;
