import { getCsrList } from '@/apis/csr/csr';
import CommonPage from '@/common/components/CommonPage';
import { SampleCsrDataType } from '@/mocks/datas/sampleCsrData';
import NewCsr from '@/types/pages/csr/NewCsrType';
import { Button, Divider, Typography, Paper, Box, Stack, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const CsrFaqDetailPage = () => {
    /* Hooks */
    const [csrFaqDetailItem, setCsrFaqDetailItem] = useState<SampleCsrDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { title } = useOutletContext<{ title: string }>();
    const csrFaqItem: NewCsr = {
        search: '질문사항',
        pagePerItems: 10,
    };

    /* Privates */
    const filterCsrFaqDetailItem = csrFaqDetailItem.find((item) => item.id === String(id));

    /* Lifecycle */
    useEffect(() => {
        const fetchCsrFaqDetail = async () => {
            try {
                const data = await getCsrList(csrFaqItem);
                setCsrFaqDetailItem(data);
                setError(null);
            } catch (error) {
                console.error('고객센터 불러오기 실패:', error);
                setError('데이터를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchCsrFaqDetail();
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

    if (!filterCsrFaqDetailItem) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h6' color='text.secondary'>
                    해당 FAQ를 찾을 수 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/Csr/Faq')}
                            sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}
                        >
                            목록으로
                        </Button>

                        <Typography variant='h4' component='h1' gutterBottom>
                            {filterCsrFaqDetailItem.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            <Typography variant='subtitle1'>
                                카테고리: {filterCsrFaqDetailItem.category} | 질문수: {filterCsrFaqDetailItem.questionCount}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <HelpOutlineIcon color='primary' sx={{ mt: 0.5 }} />
                            <Typography variant='h6' color='primary'>
                                질문
                            </Typography>
                        </Box>
                        <Typography variant='body1' sx={{ pl: 4, whiteSpace: 'pre-wrap' }}>
                            {filterCsrFaqDetailItem.question}
                        </Typography>

                        <Divider />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <QuestionAnswerIcon color='success' sx={{ mt: 0.5 }} />
                            <Typography variant='h6' color='success.main'>
                                답변
                            </Typography>
                        </Box>
                        <Typography variant='body1' sx={{ pl: 4, whiteSpace: 'pre-wrap' }}>
                            {filterCsrFaqDetailItem.answer}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </CommonPage>
    );
};

export default CsrFaqDetailPage;
