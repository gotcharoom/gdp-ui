import { getDisplayStandList } from '@/apis/achievement/displayStand/displayStand';
import DisplayStandCard from '@/common/components/aheievement/displayStand/DisplayStandCard';
import CommonPage from '@/common/components/CommonPage';
import DisplayStandType from '@/types/pages/achievement/displayStand/DisplayStand.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';
import { Button, Grid2, Pagination, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DisplayStandBoard = () => {
    /** hook */
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();

    /** 일반 로직 */
    const currentPage = Number(searchParams.get('page')); // 페이지 초기 입장 시 null(0으로 처리됨)

    const lsatDate = '2025-02-09';
    const [tableRows, setTableRows] = useState<DisplayStandType[]>([]);
    const [pageData, setPageData] = useState<PageObjectType>({
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    // 페이지 변경 함수
    /** 제어 함수 */

    /** 검색 로직
     * 1. handleChange 작동 혹은 페이지 진입 -> url 파라미터 변경
     * 2. url 파라미터 변경 감지 -> searchData(검색 함수) 실행 후 데이터(tableRows, pageData) 변경
     * 3. 데이터 변경 감지 -> 테이블에 반영
     */
    const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams({ page: value.toString() });
    }, []);

    const searchData = async (pageNo: number) => {
        // if (loading) {
        // return;
        // }
        // setLoading(true);

        try {
            const data = await getDisplayStandList({ page_no: pageNo });

            setTableRows(data.content);
            setPageData(data.page);
        } catch (error) {
            alert(error);
        } finally {
            // setLoading(false);
        }
    };

    /** useEffect */
    useEffect(() => {
        searchData(currentPage);
    }, [currentPage]);
    useEffect(() => {
        console.log(pageData);
    }, [pageData]);

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
                            Total: {pageData.totalElements}개 | Last Update {lsatDate}
                        </span>
                    </Grid2>
                    <Grid2>
                        <TextField size='small' style={{ marginRight: 5 }}></TextField>
                        <Button variant='contained'>검색</Button>
                    </Grid2>
                </Grid2>
                {/** list */}
                {/* <Grid2 container justifyContent='center' columnSpacing={6} rowSpacing={3}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <Grid2 key={index}>
                            <DisplayStandCard title='merong' create_date='2002/02/02' />
                        </Grid2>
                    ))}
                </Grid2> */}
                <Grid2 container justifyContent='center' columnSpacing={6} rowSpacing={3}>
                    {tableRows.map((column) => (
                        <Grid2 key={column.id}>
                            <DisplayStandCard title={column.title} create_date={column.create_date.toString()} />
                        </Grid2>
                    ))}
                </Grid2>

                {/** paging */}
                {/* <Grid2 container justifyContent='center'>
                    <Pagination
                        count={total}
                        page={currentPage}
                        onChange={handleChange}
                        variant='outlined'
                        shape='rounded'
                        style={{ justifyContent: 'center' }}
                    />
                </Grid2> */}

                <Grid2 container justifyContent='center'>
                    <Pagination
                        count={pageData.totalPages}
                        page={currentPage}
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
