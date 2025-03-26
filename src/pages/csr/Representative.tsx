import CommonPage from '@/common/components/CommonPage';
import CommonSearch from '@/common/components/notice/CommonSearch';
import { Box, Button, Card, Paper, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import '@styles/csr/csrPage.scss';
import { getCsrList } from '@/apis/csr/csr';
import { SampleCsrData, SampleCsrDataType } from '@/mocks/datas/sampleCsrData';
import NewCsr from '@/types/pages/csr/NewCsrType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setCsr } from '@/stores/slices/csrSlice';
import CsrState from '@/types/pages/csr/CsrState.type';

const Representative = () => {
    /* Hooks */
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [_csrFaq, setCsrFaq] = useState<SampleCsrDataType[]>([]);
    const [_loading, setLoading] = useState<boolean>(true);
    const [_currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const [faqOpenStates, setFaqOpenStates] = useState<{ [key: string]: boolean }>({});
    const { title } = useOutletContext<{ title: string }>();
    const navigate = useNavigate();
    const csrFaqItem: NewCsr = {
        search: '질문사항',
        pagePerItems: 10,
    };
    const _faqClickItem = useSelector((state: RootState) => state.csr.faqClickItem);
    const dispatch = useDispatch();

    /* Privates */

    const mostCsrFaqs = SampleCsrData.sort((a, b) => b.questionCount - a.questionCount).slice(0, 10);
    /* Events */
    const handleSearchTypeChange = (event: SelectChangeEvent<string>) => {
        setSearchType(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };
    const handleNavigate = (str: string) => {
        const item: CsrState = {
            faqClickItem: str,
        };
        dispatch(setCsr(item));
        navigate('/Csr/Faq');
    };
    const handleFaqToggle = (id: string) => {
        setFaqOpenStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // 해당 ID의 상태를 반전시킴
        }));
    };
    /* Lifecycle */
    useEffect(() => {
        const fetchCsrDetail = async () => {
            try {
                const data = await getCsrList(csrFaqItem);
                setCsrFaq(data);
            } catch (error) {
                console.log('고객센터 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCsrDetail();
    }, []);

    return (
        <div className={'csr-page'}>
            <CommonPage width={'100%'} height={'100%'} title={title}>
                <CommonSearch
                    width={'35%'}
                    height={'35%'}
                    searchQuery={searchQuery}
                    searchType={searchType}
                    onKeyDown={handleKeyDown}
                    onSearch={handleSearch}
                    onSearchChange={handleSearchChange}
                    onSearchTypeChange={handleSearchTypeChange}
                />
                <div className={'csr-page__button'}>
                    <Button variant='outlined' onClick={() => handleNavigate('sign')}>
                        회원기능
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('site')}>
                        사이트 이용
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('content')}>
                        콘텐츠
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('achievement')}>
                        도전과제 연동
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('social')}>
                        소셜기능
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('')}>
                        이용약관
                    </Button>
                </div>
                <div>
                    <Typography>자주 찾는 질문</Typography>
                    <Box className={'csr-page__box'}>
                        {mostCsrFaqs.map((csrFaq, index) => (
                            <div key={csrFaq.id}>
                                <Card
                                    className={'.csr-page__card'}
                                    sx={{ display: 'grid', placeItems: 'center', textAlign: 'center', padding: '30px', margin: '5px' }}
                                    key={index}
                                    onClick={() => handleFaqToggle(csrFaq.id)}
                                >
                                    {csrFaq.content}
                                </Card>

                                {faqOpenStates[csrFaq.id] && (
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            marginTop: '8px',
                                            padding: '16px',
                                            backgroundColor: '#f9f9f9',
                                            borderRadius: '8px',
                                        }}
                                        onClick={() => handleFaqToggle(csrFaq.id)}
                                    >
                                        <Typography variant='body1'>
                                            <strong>카테고리:</strong> {csrFaq.category}
                                        </Typography>
                                        <Typography variant='body1'>
                                            <strong>질문내용:</strong> {csrFaq.content}
                                        </Typography>
                                        <Typography variant='body1'>
                                            <strong>질문 횟수:</strong> {csrFaq.questionCount}
                                        </Typography>
                                        <Typography variant='body1'>
                                            <strong>질문에대한답변:</strong> {csrFaq.answer}
                                        </Typography>
                                    </Paper>
                                )}
                            </div>
                        ))}
                    </Box>
                </div>
            </CommonPage>
        </div>
    );
};

export default Representative;
