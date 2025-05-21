import { getBulleinList } from '@/apis/notice/bulletin';
import CommonPage from '@/common/components/CommonPage';
import useNavigationGuard from '@/common/hooks/useNavigationGuard';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import { Button, TextField, Paper, Box, Stack, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { BOARD_CONSTANTS } from '@/constants/board';

interface ModifiedBulletin extends SampleBulletinDataType {
    title: string;
    content: string;
}

const BulletinBoardModify = () => {
    /* Hooks */
    const { title } = useOutletContext<{ title: string }>();
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    useNavigationGuard();
    const initialBulletin = location.state?.bulletin;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modifiedBulletin, setModifiedBulletin] = useState<ModifiedBulletin | null>(initialBulletin);
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: BOARD_CONSTANTS.BULLETIN.ITEMS_PER_PAGE,
    };

    /* Events */
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (modifiedBulletin) {
            setModifiedBulletin({ ...modifiedBulletin, title: event.target.value });
        }
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (modifiedBulletin) {
            setModifiedBulletin({ ...modifiedBulletin, content: event.target.value });
        }
    };

    const handleSave = () => {
        if (!modifiedBulletin) return;

        setBulletins((prev: SampleBulletinDataType[]) =>
            prev.map((b) => (b.id === modifiedBulletin.id ? { ...b, ...modifiedBulletin } : b)),
        );
        navigate(-1);
    };

    const handleBack = () => {
        navigate(-1);
    };

    /* Lifecycle */
    useEffect(() => {
        const fetchBulletinDetail = async () => {
            try {
                const data = await getBulleinList(bulletinData);
                setBulletins(data);
                setError(null);
            } catch (error) {
                console.error('게시판 데이터를 불러오지 못했습니다:', error);
                setError('게시판 데이터를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchBulletinDetail();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h6' color='error'>
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!modifiedBulletin) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h6' color='text.secondary'>
                    수정할 게시글을 찾을 수 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Button variant='outlined' onClick={handleBack} sx={{ alignSelf: 'flex-start' }}>
                            취소
                        </Button>

                        <TextField label='제목' variant='outlined' fullWidth value={modifiedBulletin.title} onChange={handleTitleChange} />

                        <TextField
                            label='내용'
                            variant='outlined'
                            fullWidth
                            multiline
                            rows={10}
                            value={modifiedBulletin.content}
                            onChange={handleContentChange}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button variant='contained' onClick={handleSave} sx={{ minWidth: '120px' }}>
                                저장
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </CommonPage>
    );
};

export default BulletinBoardModify;
