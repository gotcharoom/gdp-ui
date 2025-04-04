import { getBulleinList } from '@/apis/notice/bulletin';
import CommonNotice from '@/common/components/notice/CommonNotice';
import CommonSearch from '@/common/components/notice/CommonSearch';
import CommonPage from '@/common/components/CommonPage';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
//Css
import { Button, Pagination, PaginationItem, SelectChangeEvent, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '@styles/notice/bulletin/bulletinPage.scss';

const itemsPerPage = 5; // 페이지당 게시판 갯수

const BulletinBoard = () => {
    /*Hooks*/
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [inputText, setInputText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    // TODO. 현재 사용하지 않는 변수명 변경 (loading -> _loading) -> 추후 사용 시 변경 필요
    const [_loading, setLoading] = useState<boolean>(true);
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();
    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    /*Privates*/
    const filterBulletins = (bulletins || []).filter((bulletin) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        if (!searchQuery) return true;

        if (searchType === 'title') {
            return bulletin.title.toLowerCase().includes(lowerSearchQuery);
        } else if (searchType === 'content') {
            return bulletin.category?.toLowerCase().includes(lowerSearchQuery);
        } else if (searchType === 'both') {
            return bulletin.title.toLowerCase().includes(lowerSearchQuery) || bulletin.category.toLowerCase().includes(lowerSearchQuery);
        }
        return false;
    });

    /*Event*/
    const handleNoticeClick = useCallback(
        (id: number) => {
            navigate(`/board/bulletin/${id}`);
        },
        [navigate],
    );

    const handleSearchTypeChange = (event: SelectChangeEvent<string>) => {
        setSearchType(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
        if (debounceTimeout) {
            clearTimeout(debounceTimeout); // 기존 타이머 제거 (디바운스)
        }

        const timeout = setTimeout(() => {
            setSearchQuery(event.target.value);
        }, 1000); // 1초 후 실행
        setDebounceTimeout(timeout);
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
    // TODO. 현재 사용하지 않는 변수명 변경 (event -> _event) -> 추후 사용 시 변경 필요
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const handleWrite = () => {
        navigate('/board/bulletin/write');
    };

    /*Lifecycle*/
    useEffect(() => {
        async function fetchAndSetNotice() {
            try {
                const data = await getBulleinList(bulletinData);
                setBulletins(data);
            } catch (error) {
                console.error('게시판 데이터를 불러오지 못했습니다:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAndSetNotice();
    }, []);
    return (
        <CommonPage width={'100%'} height={'100%'} title={'자유게시판'}>
            <div>
                <CommonNotice
                    notices={filterBulletins}
                    onNoticeClick={handleNoticeClick}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />

                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(filterBulletins.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                    />
                </Stack>
                <div style={{ display: 'flex', marginTop: '5px' }}>
                    <Button style={{ width: '100px', height: '50px' }} variant='contained' onClick={handleWrite}>
                        작성하기
                    </Button>
                    <CommonSearch
                        searchType={searchType}
                        searchQuery={inputText}
                        onKeyDown={handleKeyDown}
                        onSearch={handleSearch}
                        onSearchChange={handleSearchChange}
                        onSearchTypeChange={handleSearchTypeChange}
                    />
                </div>
            </div>
        </CommonPage>
    );
};

export default BulletinBoard;
