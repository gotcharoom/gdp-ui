import { useForm, UseFormProps } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { GlobalFormContext } from '@/common/contexts/GlobalFormContext.ts';
import FormName from '@/common/constants/FormName.ts';

interface GlobalFormProps<T extends object> extends UseFormProps<T> {
    name: FormName;
}

export const useGlobalForm = <T extends object>(props: GlobalFormProps<T>) => {
    const { setDirty, deleteDirty } = useContext(GlobalFormContext);
    const method = useForm<T>(props);
    const name = props.name;

    // 폼 상태 감지 후 dirty 상태 업데이트
    useEffect(() => {
        setDirty(name, method.formState.isDirty);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [method.formState.isDirty]);

    // 언마운트될 때 dirty 상태 삭제
    useEffect(() => {
        return () => {
            deleteDirty(name);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return method;
};
