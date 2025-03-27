import DisplayStandCard from '@/common/components/aheievement/displayStand/DisplayStandCard';
import CommonPage from '@/common/components/CommonPage';
import { Button, Grid2, Pagination, TextField } from '@mui/material';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const DisplayStandBoard = () => {
    /** hook */
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();

    /** 일반 로직 */
    // 현재 페이지 번호를 가져오기 (없으면 기본값 1)
    const page: number = Number(searchParams.get('page')) || 1;
    const total = 12;
    const lsatDate = '2025-02-09';

    // 페이지 변경 함수
    const goToPage = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    /** useEffect */
    const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        goToPage(value);
        console.log(value);
    }, []);

    return (
        <CommonPage width={'100%'} height={'100%'} title={'도전과제 전시대'}>
            <Grid2 container rowSpacing={5} direction='column'>
                {/** bottun */}
                <Grid2 container columnSpacing={1} ml='auto'>
                    <Button component='label' variant='contained' startIcon={<span className='material-symbols-outlined icon'>add</span>}>
                        전체 내보내기
                    </Button>
                    <Button component='label' variant='contained' startIcon={<span className='material-symbols-outlined icon'>add</span>}>
                        가져오기기
                    </Button>
                    <Button component='label' variant='contained' startIcon={<span className='material-symbols-outlined icon'>add</span>}>
                        생성
                    </Button>
                </Grid2>
                {/** total & search */}
                <Grid2 container justifyContent='space-between' alignItems='center'>
                    <Grid2>
                        <span>
                            Total: {total}개 | Last Update {lsatDate}
                        </span>
                    </Grid2>
                    <Grid2>
                        <TextField size='small' style={{ marginRight: 5 }}></TextField>
                        <Button variant='contained'>검색</Button>
                    </Grid2>
                </Grid2>
                {/** list */}
                <Grid2 container justifyContent='center' columnSpacing={6} rowSpacing={3}>
                    {/* <Grid2 size={{ xs: 12, md: 4 }}> */}
                    {Array.from({ length: 8 }, (_, index) => (
                        <Grid2 key={index}>
                            <DisplayStandCard title='merong' create_date='2002/02/02' />
                        </Grid2>
                    ))}
                </Grid2>
                {/** paging */}
                <Grid2 container justifyContent='center'>
                    <Pagination
                        count={total}
                        page={page}
                        onChange={handleChange}
                        variant='outlined'
                        shape='rounded'
                        style={{ justifyContent: 'center' }}
                    />
                </Grid2>
            </Grid2>
        </CommonPage>
    );
};

export default DisplayStandBoard;
