import { Button, Grid2 } from '@mui/material';

// Grid2 컴포넌트의 속성을 프롭스로 상속 받고 추가로 다른 프롭스 타입을 지정
type Props = React.ComponentProps<typeof Grid2> & {
    fullExportHandler: () => void;
    exportHandler: () => void;
    createHandler: () => void;
};

const CommonExportButton = ({ fullExportHandler, exportHandler, createHandler, ...gridProps }: Props) => {
    return (
        <Grid2 {...gridProps}>
            <Button
                component='label'
                variant='contained'
                startIcon={<span className='material-symbols-outlined icon'>add</span>}
                onClick={() => {
                    fullExportHandler();
                }}
            >
                전체 내보내기
            </Button>
            <Button
                component='label'
                variant='contained'
                startIcon={<span className='material-symbols-outlined icon'>add</span>}
                onClick={() => {
                    exportHandler();
                }}
            >
                가져오기
            </Button>
            <Button
                component='label'
                variant='contained'
                startIcon={<span className='material-symbols-outlined icon'>add</span>}
                onClick={() => {
                    createHandler();
                }}
            >
                생성
            </Button>
        </Grid2>
    );
};

export default CommonExportButton;
