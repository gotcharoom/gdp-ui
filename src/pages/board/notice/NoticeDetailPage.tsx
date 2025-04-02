import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Divider, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getNoticeList } from '@apis/notice/notice';
import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import CommonPage from '@/common/components/CommonPage';

const NoticeDetail = () => {
    //Hooks
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [notices, setNotices] = useState<SampleNoticeDataType[]>([]);
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
                const data = await getNoticeList(noticeData);
                setNotices(data);
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticeDetail();
    }, []);
    const notice = notices.find((n) => n.id === Number(id));

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!notice) {
        return (
            <Typography align='center' sx={{ mt: 5 }}>
                해당 공지를 찾을 수 없습니다.
            </Typography>
        );
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={'공지사항'}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/board/notice')} sx={{ mb: 2 }}>
                뒤로 가기
            </Button>

            <Typography variant='h4' gutterBottom>
                {notice.title}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
                카테고리: {notice.category} | 조회수: {notice.view} | 추천: {notice.recommend}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='body1'>{notice.content || '내용이 없습니다.'}</Typography>
        </CommonPage>
    );
};

export default NoticeDetail;
