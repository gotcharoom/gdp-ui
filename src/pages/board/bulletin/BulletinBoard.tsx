import { getBulleinList } from '@/apis/notice/bulletin';
import CommonNotice from '@/common/components/notice/CommonNotice';
import CommonSearch from '@/common/components/notice/CommonSearch';
import { SampleBulletinDataType } from '@/mocks/datas/sampleBulletinData';
import NewBulletin from '@/types/pages/notice/NewBulletin.type';
//Css
import { Button, Pagination, PaginationItem, SelectChangeEvent, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const itemsPerPage = 5; // 페이지당 게시판 갯수

const BulletinBoard = () => {
    /*Hooks*/
    const [bulletins, setBulletins] = useState<SampleBulletinDataType[]>([]);
    const [searchType, setSearchType] = useState<string>('title');
    const [searchSession, setSearchSession] = useState<string>(''); // 입력중인 검색어 상태
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어
    const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const [loading, setLoading] = useState<boolean>(true);
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
        setSearchSession(event.target.value);
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
    const handleWrite = () => {
        navigate('/board/write');
    };

    /*Lifecycle*/
    useEffect(() => {
        async function fetchAndSetNotice() {
            try {
                const data = await getBulleinList(bulletinData);
                setBulletins(data || []); // 🔹 null 방지
            } catch (error) {
                console.error('게시판 데이터를 불러오지 못했습니다:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAndSetNotice();
    }, []);
    return (
        <div>
            <h1 style={{ fontSize: 50 }}>자유게시판</h1>
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
            <Button variant='contained' onClick={handleWrite}>
                작성하기
            </Button>
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

export default BulletinBoard;
