import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@stores/slices/userSlice.ts';
import { getLoginUserInfo, postTokenCheck } from '@apis/auth/login.ts';
import { RootState } from '@stores/store.ts';
import { setAuth } from '@stores/slices/authSlice.ts';

const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const hasFetched = useRef(false);
    const hasCheckedToken = useRef(false);

    const checkToken = useCallback(async () => {
        if (hasCheckedToken.current) return;
        hasCheckedToken.current = true;

        try {
            const isChecked = await postTokenCheck();

            if (isChecked) {
                dispatch(setAuth());
            }
        } catch (e) {
            console.log('Token Validation Error : ', e);
        }
    }, [dispatch]);

    const fetchUserData = useCallback(async () => {
        if (!isAuthenticated || hasFetched.current) return;

        try {
            const data = await getLoginUserInfo();
            dispatch(setUser(data));
            hasFetched.current = true;
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        void checkToken();
    }, [checkToken]);

    useEffect(() => {
        void fetchUserData();
    }, [fetchUserData]);
};

export default useAuth;
