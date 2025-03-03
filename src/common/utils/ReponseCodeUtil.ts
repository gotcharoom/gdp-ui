export const ResponseCode = {
    SUCCESS: { code: 1001, message: '성공' },
    INVALID_INPUT: { code: 1, message: '입력 값이 올바르지 않습니다.' },
} as const;

export type ResponseCodeType = keyof typeof ResponseCode;

export const getErrorMessage = (code: ResponseCodeType): string => {
    return `${ResponseCode[code].code} - ${ResponseCode[code].message}`;
};
