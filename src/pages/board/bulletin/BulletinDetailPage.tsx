import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import { getBulleinList } from '@/apis/notice/bulletin';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import CommonReply from '@/common/components/notice/CommonReply';
import { Typography, Button, Divider, CircularProgress, IconButton, Paper, Box, Stack } from '@mui/material';
import CommonPage from '@/common/components/CommonPage';
import { ThumbDown, ThumbUp, ArrowBack, Edit } from '@mui/icons-material';

interface Comment {
    user: string;
    reply: string;
}

interface User {
    userId: number;
    userName: string;
}

const BulletinDetailPage = () => {
    /*Hooks*/
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recommend, setRecommend] = useState<number>(0);
    const [down, setDown] = useState<number>(0);
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    // 임시 사용자 데이터 (실제로는 로그인된 사용자 정보를 사용해야 함)
    const currentUser: User = {
        userId: 1,
        userName: 'test',
    };

    const addComment = (newComment: Comment) => {
        setBulletins((prevBulletins) =>
            prevBulletins.map((bulletin) =>
                bulletin.id === Number(id) ? { ...bulletin, comments: [...(bulletin.comments || []), newComment] } : bulletin,
            ),
        );
    };

    const removeComment = (commentIndex: number) => {
        setBulletins((prevBulletins) =>
            prevBulletins.map((bulletin) =>
                bulletin.id === Number(id)
                    ? {
                          ...bulletin,
                          comments: (bulletin.comments || []).filter((_, index) => index !== commentIndex),
                      }
                    : bulletin,
            ),
        );
    };

    /* Events */
    const handleUpRecommend = () => {
        setRecommend((prev) => prev + 1);
    };

    const handleDownRecommend = () => {
        setDown((prev) => prev + 1);
    };

    const handleModify = () => {
        const bulletin = bulletins.find((n) => n.id === Number(id));
        if (bulletin) {
            navigate(`/board/bulletin/${id}/modify`, { state: { bulletin } });
        }
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
                console.error('공지사항 불러오기 실패:', error);
                setError('게시글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchBulletinDetail();
    }, []);

    const bulletin = bulletins.find((n) => n.id === Number(id));

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

    if (!bulletin) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h6' color='text.secondary'>
                    해당 게시글을 찾을 수 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={'자유게시판'}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
                            목록으로
                        </Button>

                        <Typography variant='h4' component='h1' gutterBottom>
                            {bulletin.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            <Typography variant='subtitle1'>
                                작성자: {bulletin.writer} | 작성일: {bulletin.date} | 조회수: {bulletin.view}
                            </Typography>
                        </Box>

                        <Divider />

                        <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
                            {bulletin.content}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <IconButton onClick={handleUpRecommend} color='primary'>
                                <ThumbUp />
                                <Typography variant='body2' sx={{ ml: 1 }}>
                                    {recommend}
                                </Typography>
                            </IconButton>
                            <IconButton onClick={handleDownRecommend} color='error'>
                                <ThumbDown />
                                <Typography variant='body2' sx={{ ml: 1 }}>
                                    {down}
                                </Typography>
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant='outlined' startIcon={<Edit />} onClick={handleModify} sx={{ minWidth: '120px' }}>
                                수정
                            </Button>
                        </Box>

                        <Divider />

                        <CommonReply
                            comments={bulletin.comments || []}
                            users={bulletin.users || []}
                            currentUser={currentUser}
                            addComment={addComment}
                            removeComment={removeComment}
                        />
                    </Stack>
                </Paper>
            </Box>
        </CommonPage>
    );
};

export default BulletinDetailPage;
