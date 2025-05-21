import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '@styles/notice/noticeLayout.scss';

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
    const indexOfLastNotice = props.currentPage * props.itemsPerPage;
    const indexOfFirstNotice = indexOfLastNotice - props.itemsPerPage;
    const currentNotices = props.notices.slice(indexOfFirstNotice, indexOfLastNotice);
    const isRed = (notice: Notice, index: number) => {
        return notice.category === '공지사항' && index < 3 ? 'red' : '';
    };
    return (
        <TableContainer>
            <Table className={'notice-layout'}>
                <TableHead>
                    <TableRow>
                        <TableCell className={'notice-layout__title'}>카테고리</TableCell>
                        <TableCell className={'notice-layout__title'} align='left'>
                            제목
                        </TableCell>
                        <TableCell className={'notice-layout__title'} align='left'>
                            추천
                        </TableCell>
                        <TableCell className={'notice-layout__title'} align='left'>
                            조회
                        </TableCell>
                        <TableCell className={'notice-layout__title'} align='left'>
                            날짜
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentNotices.length > 0 ? (
                        currentNotices.map((notice, index) => (
                            <TableRow
                                key={notice.id}
                                onClick={() => props.onNoticeClick(notice.id)}
                                hover
                                sx={{
                                    cursor: 'pointer',
                                    backgroundColor: notice.category === '공지사항' && index < 3 ? '#f5f5f5' : 'transparent',
                                }}
                            >
                                <TableCell className={'notice-layout__table'} sx={{ color: isRed(notice, index) }}>
                                    {notice.category}
                                </TableCell>
                                <TableCell className={'notice-layout__table'}>{notice.title}</TableCell>
                                <TableCell className={'notice-layout__table'}>{notice.recommend}</TableCell>
                                <TableCell className={'notice-layout__table'}>{notice.view}</TableCell>
                                <TableCell className={'notice-layout__table'}>{notice.date}</TableCell>
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
