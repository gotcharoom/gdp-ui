import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { getNoticeList } from '@apis/notice/notice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//csss
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Stack,
    PaginationItem,
    Paper,
    IconButton,
    InputBase,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';

const initBoard: SampleNoticeDataType = {
    category: '',
    date: '',
    id: 1,
    recommend: 1,
    title: '',
    view: 10,
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
    const isRed = (index: number) => {
        return index < 3 ? 'red' : '';
    };
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
    const indexOfLastNotice = currentPage * itemsPerPage;
    const indexOfFirstNoitce = indexOfLastNotice - itemsPerPage;
    const currentNotices = filterNotices.slice(indexOfFirstNoitce, indexOfLastNotice);
    /* Event */
    const handleNoticeClick = (id: number) => () => {
        navigate(`/notice/${id}`);
    };

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>카테고리</TableCell>
                            <TableCell align='right'>제목</TableCell>
                            <TableCell align='right'>추천</TableCell>
                            <TableCell align='right'>조회</TableCell>
                            <TableCell align='right'>날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentNotices.length > 0 ? (
                            currentNotices.map((notice, index) => (
                                <TableRow onClick={handleNoticeClick(notice.id)} hover key={`row-${index}`} sx={{ cursor: 'pointer' }}>
                                    <TableCell key={`category-${index}`} sx={{ color: isRed(index) }}>
                                        {notice.category}
                                    </TableCell>
                                    <TableCell key={`title-${index}`}>{notice.title}</TableCell>
                                    <TableCell key={`view-${index}`}>{notice.view}</TableCell>
                                    <TableCell key={`recommend-${index}`}>{notice.recommend}</TableCell>
                                    <TableCell key={`date-${index}`}>{notice.date}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align='center'>
                                    검색 결과가 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(filterNotices.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                />
            </Stack>

            <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                <Select value={searchType} onChange={handleSearchTypeChange} label='제목'>
                    <MenuItem value={'title'}>제목</MenuItem>
                    <MenuItem value={'content'}>내용</MenuItem>
                    <MenuItem value={'both'}>제목+내용</MenuItem>
                </Select>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='검색어를 입력해주세요'
                    value={searchSession}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
            </Paper>
        </div>
    );
};

export default NoticeBoard;
