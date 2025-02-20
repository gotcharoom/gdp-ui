import { useOutletContext } from 'react-router-dom';
const SampleUserMain = () => {
    const { title } = useOutletContext<{ title: string }>();

    return (
        <>
            <div>{title}</div>
            <div>test</div>
        </>
    );
};

export default SampleUserMain;
