import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import { getBulleinList } from '@/apis/notice/bulletin';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import CommonReply from '@/common/components/notice/CommonReply';
//Css
import { Typography, Button, Divider, CircularProgress, IconButton, TextField } from '@mui/material';
import CommonPage from '@/common/components/CommonPage';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BulletinDetailPage = () => {
    //Hooks
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [recommend, setRecommend] = useState<number>(0);
    const [down, setDown] = useState<number>(0);
    const bullentData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };
    const addComment = (newComment: { user: string; reply: string }) => {
        setBulletins((prevBulletins) =>
            prevBulletins.map((bulletin) =>
                bulletin.id === Number(id) ? { ...bulletin, comments: [...bulletin.comments, newComment] } : bulletin,
            ),
        );
    };
    const removeComment = (postId: number, commentIndex: number) => {
        setBulletins((prevBulletins) =>
            prevBulletins.map((bulletin) =>
                bulletin.id === postId
                    ? {
                          ...bulletin,
                          comments: bulletin.comments.filter((_, index) => index !== commentIndex),
                      }
                    : bulletin,
            ),
        );
    };
    /* Privates */

    /* Events */
    const handleUpRecommend = (event: ChangeEvent<MouseEvent>) => {
        setRecommend(recommend + 1);
    };

    const handleDownRecommend = (event: ChangeEvent<MouseEvent>) => {
        setDown(down + 1);
    };
    /* Lifecycle */
    useEffect(() => {
        const fetchBulletinDetail = async () => {
            try {
                const data = await getBulleinList(bullentData);
                setBulletins(data);
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBulletinDetail();
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
        <CommonPage width={'100%'} height={'100%'} title=''>
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
            <div>
                <IconButton onClick={handleUpRecommend}>
                    <ThumbUp />
                    {recommend}
                </IconButton>
                <IconButton onClick={handleDownRecommend}>
                    <ThumbDown />
                    {down}
                </IconButton>
            </div>
            <CommonReply comments={bulletin.comments ?? []} addComment={addComment} removeComment={removeComment} postId={bulletin?.id} />
        </CommonPage>
    );
};
export default BulletinDetailPage;
