import { ComponentType } from 'react';
import SocialType from '@/common/constants/SocialType.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/store.ts';
import { Navigate } from 'react-router-dom';
import { useAlert } from '@/common/hooks/useAlert.ts';
import { AlertConfigProps } from '@/common/contexts/AlertContext.ts';

interface WithProtectOptions {
    isCheckLogin?: true;
    allowSocialType?: SocialType | SocialType[];
}

const withProtect = <P extends object>(Component: ComponentType<P>, options: WithProtectOptions = {}) => {
    // 본래 해당 컴포넌트에서 사용되는 Props를 전달하기 위해서 필요함
    return (props: P) => {
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
        const socialType = useSelector((state: RootState) => state.user.socialType);
        const { isCheckLogin = false, allowSocialType } = options;
        const { openAlert } = useAlert();

        if (isCheckLogin && !isAuthenticated) {
            return <Navigate to='/login' state={{ from: location }} replace />;
        }

        if (allowSocialType && socialType) {
            const allowed = Array.isArray(allowSocialType) ? allowSocialType.includes(socialType) : allowSocialType === socialType;

            if (!allowed) {
                const config: AlertConfigProps = {
                    severity: 'warning',
                    contents: '접근할 수 없는 페이지 입니다',
                };
                openAlert(config);

                return <Navigate to='/' replace />;
            }
        }

        return <Component {...props} />;
    };
};

export default withProtect;
