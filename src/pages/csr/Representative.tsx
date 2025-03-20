import CommonPage from '@/common/components/CommonPage';
import CommonSearch from '@/common/components/notice/CommonSearch';
import { Button, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Representative = () => {
    /* Hooks */
    const [searchType, setSearchType] = useState<string>('title');
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 실행 시 적용될 검색어

    // TODO. 현재 사용하지 않는 변수명 변경 (currentPage -> _currentPage) -> 추후 사용 시 변경 필요
    const [_currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 상태
    const { title } = useOutletContext<{ title: string }>();
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

    /* Lifecycle */

    return (
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
            ></CommonSearch>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                <Button variant='outlined'>회원기능</Button>
                <Button variant='outlined'>사이트 이용</Button>
                <Button variant='outlined'>콘텐츠</Button>
                <Button variant='outlined'>도전과제 연동</Button>
                <Button variant='outlined'>소셜기능</Button>
                <Button variant='outlined'>이용약관</Button>
            </div>
        </CommonPage>
    );
};

export default Representative;
