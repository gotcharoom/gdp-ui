// validationMessages.js
const validationMessages = {
    required: (field) => `${field}는 필수 입력 항목입니다.`,
    min: (field, min) => `${field}는 최소 ${min}자 이상이어야 합니다.`,
    max: (field, max) => `${field}는 최대 ${max}자까지 입력 가능합니다.`,
    email: () => `유효한 이메일 주소를 입력해주세요.`,
    matches: (field, patternDesc) => `${field}는 ${patternDesc} 형식이어야 합니다.`,
};

export default validationMessages;
