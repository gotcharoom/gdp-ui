import useLocalstorage from '@/common/hooks/useLocalStorage.ts';

export const isAuthenticatedKey = 'isAuthenticated';

export const useToken = () => {
    const { value, set, remove } = useLocalstorage(isAuthenticatedKey);

    const setAuth = () => set('true');

    const removeAuth = remove;

    const isAuthenticated = value == 'true';

    return { value, setAuth, removeAuth, isAuthenticated };
};
