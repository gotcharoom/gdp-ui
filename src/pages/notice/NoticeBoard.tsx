import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { getNoticeList } from '@apis/notice/notice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//csss
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const initBoard: SampleNoticeDataType = {
    category: '',
    date: '',
    id: 1,
    recommend: 1,
    title: '',
    view: 10,
};

const NoticeBoard = () => {
    /* Hooks */
    const [notices, setNotices] = useState<SampleNoticeDataType[]>([initBoard]);
    const navigate = useNavigate();
    const noticeData: NewNotice = {
        search: '게시판',
        pagePerItems: 10,
    };
    /* Privates */
    const isRed = (index: number) => {
        return index < 3 ? 'red' : '';
    };
    /* Event */
    const handleNoticeClick = (id: number) => () => {
        navigate(`/notice/${id}`);
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
                </Table>
            </TableContainer>
            {notices.map((notice, index) => {
                return (
                    <>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <li key={index + notice.category}>{notice.category}</li>
                                        </TableCell>
                                        <TableCell>
                                            <li key={index + notice.title}>{notice.title}</li>
                                        </TableCell>

                                        <TableCell>
                                            <li key={index + notice.view}>{notice.view}</li>
                                        </TableCell>
                                        <TableCell>
                                            <li key={index + notice.recommend}>{notice.recommend}</li>
                                        </TableCell>
                                        <TableCell>
                                            <li key={index + notice.date}>{notice.date}</li>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                );
            })}
        </div>
    );
};

export default NoticeBoard;
