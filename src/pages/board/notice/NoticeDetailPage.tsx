import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Divider, CircularProgress, Paper, Box, Stack } from '@mui/material';
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
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!notice) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h6' color='text.secondary'>
                    해당 공지를 찾을 수 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={'공지사항'}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/board/notice')}
                            sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}
                        >
                            목록으로
                        </Button>

                        <Typography variant='h4' component='h1' gutterBottom>
                            {notice.title}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'text.secondary' }}>
                            <Typography variant='subtitle1'>
                                카테고리: {notice.category} | 조회수: {notice.view} | 추천: {notice.recommend} | 날짜: {notice.date}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ minHeight: '200px', py: 2 }}>
                            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
                                {notice.content || '내용이 없습니다.'}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </CommonPage>
    );
};

export default NoticeDetail;
