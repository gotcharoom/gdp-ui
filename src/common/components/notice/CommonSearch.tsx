import { Divider, IconButton, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CommonSearchProps {
    searchType: string;
    searchQuery: string;
    onSearchTypeChange: (event: SelectChangeEvent<string>) => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommonSearch = (props: CommonSearchProps) => {
    return (
        <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <Select value={props.searchType} onChange={props.onSearchTypeChange} label='제목'>
                <MenuItem value='title'>제목</MenuItem>
                <MenuItem value='content'>내용</MenuItem>
                <MenuItem value='both'>제목+내용</MenuItem>
            </Select>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='검색어를 입력해주세요'
                value={props.searchQuery}
                onChange={props.onSearchChange}
                onKeyDown={props.onKeyDown}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={props.onSearch}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        </Paper>
    );
};

export default CommonSearch;
