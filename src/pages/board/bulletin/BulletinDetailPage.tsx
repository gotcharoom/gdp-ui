import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Divider, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import { getBulleinList } from '@/apis/notice/bulletin';

const BulletinDetailPage = () => {
    //Hooks
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const noticeData: NewNotice = {
        search: '게시판',
        pagePerItems: 10,
    };
    /* Privates */

    /* Events */

    /* Lifecycle */
    useEffect(() => {
        const fetchNoticeDetail = async () => {
            try {
                const data = await getBulleinList(noticeData);
                setBulletins(data);
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticeDetail();
    }, []);

    const bulletin = bulletins.find((n) => n.id === Number(id));

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!bulletin) {
        return (
            <Typography align='center' sx={{ mt: 5 }}>
                해당 공지를 찾을 수 없습니다.
            </Typography>
        );
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto', mt: 5 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/board/bulletin')} sx={{ mb: 2 }}>
                뒤로 가기
            </Button>

            <Typography variant='h4' gutterBottom>
                {bulletin.title}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                카테고리: {bulletin.category} | 조회수: {bulletin.view} | 추천: {bulletin.recommend}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='body1'>{bulletin.content || '내용이 없습니다.'}</Typography>
        </Paper>
    );
};

export default BulletinDetailPage;
