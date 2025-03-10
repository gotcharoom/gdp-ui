import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { getNoticeList } from '@apis/notice/notice';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//csss
import { Pagination, Stack, PaginationItem, SelectChangeEvent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CommonNotice from '@/common/components/notice/CommonNotice';
import CommonSearch from '@/common/components/notice/CommonSearch';

const initBoard: SampleNoticeDataType = {
    category: '',
    date: '',
    id: 1,
    recommend: 1,
    title: '',
    view: 10,
    content: '',
};

const itemsPerPage = 5; // 페이지당 게시판 갯수

const NoticeBoard = () => {
    /* Hooks */
    const [notices, setNotices] = useState<SampleNoticeDataType[]>([initBoard]);
    const [searchType, setSearchType] = useState<string>('title');
    const [searchSession, setSeactSession] = useState<string>(''); // 입력중인 검색어 상태
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const navigate = useNavigate();
    const noticeData: NewNotice = {
        search: '게시판',
        pagePerItems: 10,
    };

    /* Privates */

    const filterNotices = notices.filter((notice) => {
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
            navigate(`/notice/${id}`);
        },
        [navigate],
    );

    const handleSearchTypeChange = (event: SelectChangeEvent<string>) => {
        setSearchType(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeactSession(event.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchSession);
        setCurrentPage(1);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
        <div>
            <h1 style={{ fontSize: 50 }}>공지사항</h1>
            <CommonNotice notices={filterNotices} onNoticeClick={handleNoticeClick} itemsPerPage={itemsPerPage} currentPage={currentPage} />

            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(filterNotices.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                />
            </Stack>

            <CommonSearch
                searchType={searchType}
                searchQuery={searchQuery}
                onKeyDown={handleKeyDown}
                onSearch={handleSearch}
                onSearchChange={handleSearchChange}
                onSearchTypeChange={handleSearchTypeChange}
            />
        </div>
    );
};

export default NoticeBoard;
