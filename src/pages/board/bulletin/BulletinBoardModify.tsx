import { getBulleinList } from '@/apis/notice/bulletin';
import CommonPage from '@/common/components/CommonPage';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import { Button, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const BulletinBoardModify = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const [_bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const navigate = useNavigate();
    // TODO. 현재 사용하지 않는 변수명 변경 (loading -> _loading) -> 추후 사용 시 변경 필요
    const [_loading, setLoading] = useState<boolean>(true);
    const [_isModifying, setIsModifying] = useState<number | null>(null);
    const [modifiedBulletin, setModifiedBulletin] = useState<SampleBulletinDataType | null>(null);
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    /* Privates */

    /* Events */

    // TODO. 현재 사용하지 않는 변수명 변경 (event -> _event) -> 추후 사용 시 변경 필요
    // const handleModify = (_event: FormEvent, id: number) => {
    //     // 해당 ID의 게시글 찾기
    //     const bulletinToModify = bulletins.find((b) => b.id === id);

    //     // 게시글이 존재하고, 해당 게시글의 writer가 users 배열에 있는지 확인
    //     if (bulletinToModify) {
    //         const isWriter = bulletinToModify.users.some((user) => user.userName === bulletinToModify.writer);

    //         if (isWriter) {
    //             setIsModifying(id);
    //             setModifiedBulletin({ ...bulletinToModify });
    //         } else {
    //             alert('수정 권한이 없습니다.');
    //         }
    //     }
    // };
    const handleSave = () => {
        if (!modifiedBulletin) return;

        setBulletins((prev) => prev.map((b) => (b.id === modifiedBulletin.id ? { ...b, ...modifiedBulletin } : b)));

        setIsModifying(null); // ⭐ 수정 완료 후 모드 해제
        setModifiedBulletin(null);
    };
    const handleBack = () => {
        navigate(-1);
    };
    /* Lifecycle */
    useEffect(() => {
        async function fetchAndBulletin() {
            try {
                const data = await getBulleinList(bulletinData);
                setBulletins(data);
            } catch (error) {
                console.log('수정할 게시판 데이터를 찾아오지 못했습니다.', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAndBulletin();
    }, []);

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            <div>
                <TextField
                    label='제목'
                    value={modifiedBulletin?.title || ''}
                    onChange={(e) => setModifiedBulletin((prev) => ({ ...prev!, title: e.target.value }))}
                    fullWidth
                />
                <TextField
                    label='내용'
                    value={modifiedBulletin?.content || ''}
                    onChange={(e) => setModifiedBulletin((prev) => ({ ...prev!, content: e.target.value }))}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button variant='contained' onClick={handleSave}>
                    저장
                </Button>
                <Button variant='outlined' onClick={handleBack}>
                    취소
                </Button>
            </div>
        </CommonPage>
    );
};

export default BulletinBoardModify;
