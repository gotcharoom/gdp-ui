import { getBulleinList } from '@/apis/notice/bulletin';
import CommonPage from '@/common/components/CommonPage';
import useNavigationGuard from '@/common/hooks/useNavigationGuard';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';

const BulletinBoardModify = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const [_bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    useNavigationGuard();
    const initialBulletin = location.state?.bulletin;
    // TODO. 현재 사용하지 않는 변수명 변경 (loading -> _loading) -> 추후 사용 시 변경 필요
    const [_loading, setLoading] = useState<boolean>(true);
    const [_isModifying, setIsModifying] = useState<number | null>(null);
    const [modifiedBulletin, setModifiedBulletin] = useState(initialBulletin);
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    /* Privates */

    /* Events */

    const handleSave = () => {
        if (!modifiedBulletin) return;

        setBulletins((prev) => prev.map((b) => (b.id === modifiedBulletin.id ? { ...b, ...modifiedBulletin } : b)));
        console.log('수정된 내용', modifiedBulletin);
        setIsModifying(null); // ⭐ 수정 완료 후 모드 해제
        setModifiedBulletin(null);
        navigate(-1);
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
