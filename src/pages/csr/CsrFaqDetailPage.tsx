import { getCsrList } from '@/apis/csr/csr';
import CommonPage from '@/common/components/CommonPage';
import { SampleCsrDataType } from '@/mocks/datas/sampleCsrData';
import NewCsr from '@/types/pages/csr/NewCsrType';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CsrFaqDetailPage = () => {
    /* Hooks */
    const [csrFaqDetailItem, setCsrFaqDetailItem] = useState<SampleCsrDataType[]>([]);
    const [_loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { title } = useOutletContext<{ title: string }>();
    const csrFaqItem: NewCsr = {
        search: '질문사항',
        pagePerItems: 10,
    };

    /* Privates */
    const filterCsrFaqDetailItem = csrFaqDetailItem.find((item) => item.id === String(id));
    /* Events */
    /* Lifecycle */
    useEffect(() => {
        const fetchCsrFaqDetail = async () => {
            try {
                const data = await getCsrList(csrFaqItem);
                setCsrFaqDetailItem(data);
            } catch (error) {
                console.log('고객센터 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCsrFaqDetail();
    }, []);

    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            {filterCsrFaqDetailItem ? (
                <div>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/Csr/Faq')} sx={{ mb: 2 }}>
                        뒤로 가기
                    </Button>
                    <Typography variant='h4' gutterBottom>
                        {filterCsrFaqDetailItem.title}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        카테고리: {filterCsrFaqDetailItem.category} | 질문수: {filterCsrFaqDetailItem.questionCount}
                    </Typography>
                    <Typography>답변: {filterCsrFaqDetailItem.answer}</Typography>
                </div>
            ) : (
                <p>FAQ 데이터를 찾을 수 없습니다.</p>
            )}
        </CommonPage>
    );
};

export default CsrFaqDetailPage;
