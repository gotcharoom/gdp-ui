import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    /* Hooks */
    const location = useLocation();
    const navigate = useNavigate();
    /* Lifecycle */

    useEffect(() => {
        // ✅ `Agreement`를 거치지 않았다면 다시 `Agreement`로 이동
        if (!location.state?.agreed) {
            navigate('/login/agreement', { replace: true });
        }
    }, [location, navigate]);

    return <div></div>;
};

export default SignUpPage;
