import { getBulleinList } from '@/apis/notice/bulletin';
import CommonNotice from '@/common/components/notice/CommonNotice';
import CommonSearch from '@/common/components/notice/CommonSearch';
import CommonPage from '@/common/components/CommonPage';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
import { Button, Pagination, PaginationItem, SelectChangeEvent, Stack, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import '@styles/notice/bulletin/bulletinPage.scss';

const ITEMS_PER_PAGE = 5;

const BulletinBoard = () => {
    /*Hooks*/
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const bulletinData: NewBulletin = {
        search: '게시판',
        pagePerItems: 10,
    };

    /*Privates*/
    const filterBulletins = useMemo(() => {
        if (!searchQuery) return bulletins;

        const lowerSearchQuery = searchQuery.toLowerCase();
        return bulletins.filter((bulletin) => {
            if (searchType === 'title') {
                return bulletin.title.toLowerCase().includes(lowerSearchQuery);
            } else if (searchType === 'content') {
                return bulletin.category?.toLowerCase().includes(lowerSearchQuery);
            } else if (searchType === 'both') {
                return (
                    bulletin.title.toLowerCase().includes(lowerSearchQuery) || bulletin.category?.toLowerCase().includes(lowerSearchQuery)
                );
            }
            return false;
        });
    }, [bulletins, searchQuery, searchType]);

    const paginatedBulletins = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filterBulletins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filterBulletins, currentPage]);

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
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            setSearchQuery(event.target.value);
        }, 1000);
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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleWrite = () => {
        navigate('/board/bulletin/write');
    };

    /*Lifecycle*/
    useEffect(() => {
        const fetchAndSetNotice = async () => {
            try {
                const data = await getBulleinList(bulletinData);
                setBulletins(data);
                setError(null);
            } catch (error) {
                console.error('게시판 데이터를 불러오지 못했습니다:', error);
                setError('게시판 데이터를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchAndSetNotice();
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

    return (
        <CommonPage width={'100%'} height={'100%'} title={'자유게시판'}>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CommonSearch
                                searchType={searchType}
                                searchQuery={inputText}
                                onSearchTypeChange={handleSearchTypeChange}
                                onSearchChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                onSearch={handleSearch}
                            />
                            <Button variant='contained' startIcon={<AddIcon />} onClick={handleWrite} sx={{ minWidth: '120px' }}>
                                글쓰기
                            </Button>
                        </Box>

                        <CommonNotice
                            notices={paginatedBulletins}
                            onNoticeClick={handleNoticeClick}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                        />

                        <Stack spacing={2} sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                            <Pagination
                                count={Math.ceil(filterBulletins.length / ITEMS_PER_PAGE)}
                                page={currentPage}
                                showFirstButton
                                showLastButton
                                onChange={handlePageChange}
                                renderItem={(item) => (
                                    <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                                )}
                            />
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </CommonPage>
    );
};

export default BulletinBoard;
