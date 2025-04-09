import { IconButton, InputBase, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CSSProperties } from 'react';

interface CommonSearchProps {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    searchType: string;
    searchQuery: string;
    onSearchTypeChange: (event: SelectChangeEvent<string>) => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommonSearch = (props: CommonSearchProps) => {
    return (
        <div style={{ margin: '10px' }}>
            <Select value={props.searchType} onChange={props.onSearchTypeChange} label='제목' sx={{ m: 1, minWidth: 120 }}>
                <MenuItem value='title'>제목</MenuItem>
                <MenuItem value='content'>내용</MenuItem>
                <MenuItem value='both'>제목+내용</MenuItem>
            </Select>
            <InputBase
                sx={{ ml: 1, flex: 1, borderBlockColor: 'grey', border: 1, minHeight: 50 }}
                placeholder='검색어를 입력해주세요'
                value={props.searchQuery}
                onChange={props.onSearchChange}
                onKeyDown={props.onKeyDown}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={props.onSearch}>
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default CommonSearch;
