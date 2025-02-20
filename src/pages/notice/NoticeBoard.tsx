import { SampleNoticeDataType } from '@/mocks/datas/sampleNoticeData';
import NewNotice from '@/types/pages/notice/NewNotice.type';
import { getNoticeList } from '@apis/notice/notice';
import { useEffect, useState } from 'react';

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
    const [notice, setNotice] = useState<SampleNoticeDataType>(initBoard);
    const noticeData: NewNotice = {
        search: '게시판',
        pagePerItems: 10,
    };
    /* Privates */

    /* Event */

    /* Lifecycle */

    useEffect(() => {
        async function fetchAndSetNotice() {
            const data = await getNoticeList(noticeData);
            setNotice(data);
        }
        fetchAndSetNotice();
    }, []);

    return (
        <div>
            <h1>공지사항</h1>
            <li>{notice.id}</li>
        </div>
    );
};

export default NoticeBoard;
