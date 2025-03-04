import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { store } from '@stores/store.ts';
import { enableMocking } from '@/common/utils/mswUtil.ts';

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
});
