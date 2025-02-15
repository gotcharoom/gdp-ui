import { createBrowserRouter } from 'react-router-dom';

// Routes
import UserRoutes from '@routes/user/UserRoutes.tsx';
import AdminRoutes from '@routes/admin/AdminRoutes.tsx';

const CustomRouter = createBrowserRouter([...UserRoutes, ...AdminRoutes]);

export default CustomRouter;
