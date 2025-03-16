import { getDuplicateCheckEmail, getDuplicateCheckId, getDuplicateCheckNickname } from '@apis/auth/signUp.ts';

const apis = {
    id: (value: string) => getDuplicateCheckId(value),
    email: (value: string) => getDuplicateCheckEmail(value),
    nickname: (value: string) => getDuplicateCheckNickname(value),
};

const checkDuplicate = async (value: string | undefined, fieldName: keyof typeof apis) => {
    if (!value) return true;
    const data = await apis[fieldName](value);
    return !data;
};

export { checkDuplicate };
