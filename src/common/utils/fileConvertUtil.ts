export const objectToFormData = <T extends object>(obj: T, formData: FormData = new FormData(), parentKey = ''): FormData => {
    if (obj && typeof obj === 'object' && !(obj instanceof File)) {
        Object.keys(obj).forEach((key) => {
            const typedKey = key as keyof T;
            const value = obj[typedKey];
            const fullKey = parentKey ? `${parentKey}[${String(typedKey)}]` : String(typedKey);

            if (value instanceof File) {
                formData.append(fullKey, value);
            } else if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value) || value instanceof Date) {
                    formData.append(fullKey, JSON.stringify(value)); // 배열이나 Date 객체는 JSON으로 변환
                } else {
                    // ✅ 중첩 객체를 JSON Blob으로 변환하여 추가
                    const blob = new Blob([JSON.stringify(value)], { type: 'application/json' });
                    formData.append(fullKey, blob);
                }
            } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                formData.append(fullKey, String(value));
            }
        });
    }
    return formData;
};
