import { Outlet } from 'react-router-dom';
import { RoutesContext } from '@/common/contexts/RoutesContext.ts';

const CommonChildrenLayout = () => {
    return <Outlet context={RoutesContext} />;
};

export default CommonChildrenLayout;
