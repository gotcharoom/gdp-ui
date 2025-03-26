import CommonPage from '@/common/components/CommonPage';
import CommonSearch from '@/common/components/notice/CommonSearch';
import { Button, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '@styles/csr/csrFaqPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setCsr } from '@/stores/slices/csrSlice';
import CsrState from '@/types/pages/csr/CsrState.type';
import NewCsr from '@/types/pages/csr/NewCsrType';
import { getCsrList } from '@/apis/csr/csr';

const CsrFAQPage = () => {
    /* Hooks */
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [_currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const [_csrFaq, setCsrFaq] = useState<SampleCsrDataType[]>([]);
    const [_loading, setLoading] = useState<boolean>(true);
    const { title } = useOutletContext<{ title: string }>();
    const faqClickItem = useSelector((state: RootState) => state.csr.faqClickItem);
    const dispatch = useDispatch();
    const csrFaqItem: NewCsr = {
        search: '질문사항',
        pagePerItems: 10,
    };
    /* Privates */
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
                    <Button variant='outlined'>회원기능</Button>
                    <Button variant='outlined'>사이트 이용</Button>
                    <Button variant='outlined'>콘텐츠</Button>
                    <Button variant='outlined'>도전과제 연동</Button>
                    <Button variant='outlined'>소셜기능</Button>
                    <Button variant='outlined'>이용약관</Button>
                </div>
                {}
            </CommonPage>
        </div>
    );
};

export default CsrFAQPage;
