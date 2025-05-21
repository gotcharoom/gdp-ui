import CommonPage from '@/common/components/CommonPage';
import CommonSearch from '@/common/components/notice/CommonSearch';
import { Button, Pagination, PaginationItem, SelectChangeEvent, Stack, TableCell, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import '@styles/csr/csrFaqPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setCsr } from '@/stores/slices/csrSlice';

import NewCsr from '@/types/pages/csr/NewCsrType';
import { getCsrList } from '@/apis/csr/csr';
import { SampleCsrDataType } from '@/mocks/datas/sampleCsrData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const CsrFAQPage = () => {
    /* Hooks */
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const [csrFaq, setCsrFaq] = useState<SampleCsrDataType[]>([]);
    const [_loading, setLoading] = useState<boolean>(true);
    const { title } = useOutletContext<{ title: string }>();
    const faqClickItem = useSelector((state: RootState) => state.csr.faqClickItem);
    const dispatch = useDispatch();
    const csrFaqItem: NewCsr = {
        search: '질문사항',
        pagePerItems: 10,
    };
    const itemsPerPage = 10;
    const navigate = useNavigate();
    /* Privates */

    const indexOfLastCsrFaq = currentPage * itemsPerPage;
    const indexOfFirstCsrFaq = indexOfLastCsrFaq - itemsPerPage;
    const filterCsrFaqs = csrFaq.filter((item) => item.category === faqClickItem);
    const currentCsrFaqs = filterCsrFaqs.slice(indexOfFirstCsrFaq, indexOfLastCsrFaq);
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
    const handleNavigate = (category: string) => {
        dispatch(setCsr({ faqClickItem: category }));
    };
    const handleNaviDetailPage = useCallback(
        (id: string) => {
            navigate(`/Csr/Faq/${id}`);
        },
        [navigate],
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
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
        <div className={'csr-faq-Page'}>
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
                <div className={'csr-faq-Page__button'}>
                    <Button variant='outlined' onClick={() => handleNavigate('회원기능')}>
                        회원기능
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('사이트 이용')}>
                        사이트 이용
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('콘텐츠')}>
                        콘텐츠
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('도전과제 연동')}>
                        도전과제 연동
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('소셜기능')}>
                        소셜기능
                    </Button>
                    <Button variant='outlined' onClick={() => handleNavigate('이용약관')}>
                        이용약관
                    </Button>
                </div>
                {currentCsrFaqs.map((csrFaq, index) => (
                    <TableRow key={index} onClick={() => handleNaviDetailPage(csrFaq.id)}>
                        <TableCell>{csrFaq.id}</TableCell>
                        <TableCell>{csrFaq.category}</TableCell>
                        <TableCell>{csrFaq.title}</TableCell>
                        <TableCell>{csrFaq.questionCount}</TableCell>
                    </TableRow>
                ))}
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(currentCsrFaqs.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        showFirstButton
                        showLastButton
                        renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                    />
                </Stack>
            </CommonPage>
        </div>
    );
};

export default CsrFAQPage;
