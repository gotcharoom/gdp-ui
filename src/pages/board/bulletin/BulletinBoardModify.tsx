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
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    // TODO. 현재 사용하지 않는 변수명 변경 (loading -> _loading) -> 추후 사용 시 변경 필요
    const [_loading, setLoading] = useState<boolean>(true);
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [modifiedBulletin, setModifiedBulletin] = useState<SampleBulletinDataType | null>(null);
    const navigate = useNavigate();
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    /* Privates */

    /* Events */
    const handleBack = () => {
        navigate(-1);
    };

    // TODO. 현재 사용하지 않는 변수명 변경 (event -> _event) -> 추후 사용 시 변경 필요
    const handleModify = (_event: FormEvent, id: number) => {
        const bulletinToModify = bulletins.find((b) => b.id === id);
        if (bulletinToModify) {
            setIsModifying(true);
            setModifiedBulletin({ ...bulletinToModify });
        }
    };
    const handleSave = () => {
        if (!modifiedBulletin) return; // 수정할 데이터가 없으면 종료

        setBulletins((prev) => prev.map((b) => (b.id === modifiedBulletin.id ? { ...b, ...modifiedBulletin } : b)));
        setIsModifying(false);
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
            {isModifying ? (
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
                    <Button variant='outlined' onClick={() => setIsModifying(false)}>
                        취소
                    </Button>
                </div>
            ) : (
                bulletins.map((bulletin) => (
                    <div key={bulletin.id}>
                        <Typography variant='h4'>{bulletin.title}</Typography>
                        <Typography variant='body1'>{bulletin.content}</Typography>
                        <Button variant='contained' onClick={(event) => handleModify(event, bulletin.id)}>
                            수정하기
                        </Button>
                    </div>
                ))
            )}
            <Button variant='outlined' onClick={handleBack}>
                취소
            </Button>
        </CommonPage>
    );
};
export default BulletinBoardModify;
