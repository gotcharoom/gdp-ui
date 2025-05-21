import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { getNoticeList } from '@apis/notice/notice';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack, PaginationItem, SelectChangeEvent, Paper, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CommonNotice from '@/common/components/notice/CommonNotice';
import CommonSearch from '@/common/components/notice/CommonSearch';
import CommonPage from '@/common/components/CommonPage';

const initBoard: SampleNoticeDataType = {
    category: '',
    date: '',
    id: 1,
    recommend: 1,
    title: '',
    view: 10,
    content: '',
};

const itemsPerPage = 10; // 페이지당 게시판 갯수

const NoticeBoard = () => {
    /* Hooks */
    const [notices, setNotices] = useState<SampleNoticeDataType[]>([initBoard]);
    const [searchType, setSearchType] = useState<string>('title');
    const [inputText, setInputText] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();
    const noticeData: NewNotice = {
        search: '게시판',
        pagePerItems: 10,
    };

    /* Privates */

    const filterNotices = (notices || []).filter((notice) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        if (!searchQuery) return true;

        if (searchType === 'title') {
            return notice.title.toLowerCase().includes(lowerSearchQuery);
        } else if (searchType === 'content') {
            return notice.category.toLowerCase().includes(lowerSearchQuery);
        } else if (searchType === 'both') {
            return notice.title.toLowerCase().includes(lowerSearchQuery) || notice.category.toLowerCase().includes(lowerSearchQuery);
        }
        return false;
    });

    /* Events */
    const handleNoticeClick = useCallback(
        (id: number) => {
            navigate(`/board/notice/${id}`);
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
    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        console.log(event);
        setCurrentPage(value);
    };

    /* Lifecycle */

    useEffect(() => {
        async function fetchAndSetNotice() {
            const data = await getNoticeList(noticeData);
            setNotices(data);
        }
        fetchAndSetNotice();
    }, []);

    return (
        <CommonPage width={'100%'} height={'100%'} title={'공지사항'}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Typography variant='h6' sx={{ mb: 3, color: 'text.secondary' }}>
                        총 {filterNotices.length}개의 공지사항이 있습니다.
                    </Typography>

                    <CommonNotice
                        notices={filterNotices}
                        onNoticeClick={handleNoticeClick}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                    />

                    <Stack spacing={2} sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                        <Pagination
                            count={Math.ceil(filterNotices.length / itemsPerPage)}
                            showFirstButton
                            showLastButton
                            page={currentPage}
                            onChange={handlePageChange}
                            renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                        />
                    </Stack>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <CommonSearch
                        searchType={searchType}
                        searchQuery={inputText}
                        onSearchChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        onSearch={handleSearch}
                        onSearchTypeChange={handleSearchTypeChange}
                    />
                </Box>
            </Box>
        </CommonPage>
    );
};

export default NoticeBoard;
