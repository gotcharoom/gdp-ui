import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Notice {
    id: number;
    category: string;
    title: string;
    view: number;
    recommend: number;
    date: string;
}

interface CommonNoticeProps {
    notices: Notice[];
    onNoticeClick: (id: number) => void;
    itemsPerPage: number;
    currentPage: number;
}

const CommonNotice = (props: CommonNoticeProps) => {
    const isRed = (index: number) => {
        return index < 3 ? 'red' : '';
    };
    const indexOfLastNotice = props.currentPage * props.itemsPerPage;
    const indexOfFirstNotice = indexOfLastNotice - props.itemsPerPage;
    const currentNotices = props.notices.slice(indexOfFirstNotice, indexOfLastNotice);
    return (
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
                            <TableRow key={notice.id} onClick={() => props.onNoticeClick(notice.id)} hover sx={{ cursor: 'pointer' }}>
                                <TableCell sx={{ color: isRed(index) }}>{notice.category}</TableCell>
                                <TableCell>{notice.title}</TableCell>
                                <TableCell>{notice.recommend}</TableCell>
                                <TableCell>{notice.view}</TableCell>
                                <TableCell>{notice.date}</TableCell>
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
    );
};

export default CommonNotice;
