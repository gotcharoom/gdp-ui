import CommonEditor from '@/common/components/CommonEditor';
import CommonPage from '@/common/components/CommonPage';
import useNavigationGuard from '@/common/hooks/useNavigationGuard';
import { Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const BulletinBoardWrite = () => {
    /*Hooks*/
    const { title } = useOutletContext<{ title: string }>();
    const [text, setText] = useState('게시물을 작성해주세요');
    const navigate = useNavigate();

    useNavigationGuard();
    /*Privates*/
    /*Event*/
    const handleBack = () => {
        navigate(-1);
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(text);
        alert(`제출된 값:${text}`);
    };
    /*Lifecycle*/
    return (
        <div>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <CommonEditor text={text} setText={setText} />
                <Button onSubmit={handleSubmit}>제출하기</Button>
                <Button onClick={handleBack}>취소</Button>
            </CommonPage>
        </div>
    );
};

export default BulletinBoardWrite;
