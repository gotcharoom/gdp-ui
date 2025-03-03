import { useOutletContext } from 'react-router-dom';
import { postSample } from '@apis/sample/sample.ts';
import ApiResponse from '@/types/utils/ApiResponse.type.ts';
import { useState } from 'react';
import { Alert, AlertColor, Button, Snackbar } from '@mui/material';
const SampleUserMain = () => {
    const { title } = useOutletContext<{ title: string }>();
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success'); // 'success' | 'error' | 'warning' | 'info'

    const handleClick = async () => {
        try {
            const response: ApiResponse = await postSample();

            if (response.status === 200) {
                setAlertMessage('요청 성공! 🎉');
                setAlertSeverity('success');
            } else {
                setAlertMessage('예상과 다른 응답이 도착했습니다. 🤔');
                setAlertSeverity('warning');
            }
        } catch (error) {
            setAlertMessage('요청 실패! 😢\n' + (error.response?.data?.message || error.message));
            setAlertSeverity('error');
        } finally {
            setLoading(false);
            setAlertOpen(true);
        }
    };

    return (
        <>
            <div>{title}</div>
            <div>test</div>
            <div>
                <Button variant='contained' color='primary' onClick={handleClick} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'API 요청'}
                </Button>
            </div>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
                <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SampleUserMain;
