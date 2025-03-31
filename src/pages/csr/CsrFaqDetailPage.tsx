import CommonPage from '@/common/components/CommonPage';
import { useOutletContext } from 'react-router-dom';

const CsrFaqDetailPage = () => {
    const { title } = useOutletContext<{ title: string }>();
    return (
        <CommonPage width={'100%'} height={'100%'} title={title}>
            <div></div>
        </CommonPage>
    );
};

export default CsrFaqDetailPage;
