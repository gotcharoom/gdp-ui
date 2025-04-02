import { getAlbumList } from '@/apis/achievement/album/album';
import CommonAlbumCard from '@/common/components/aheievement/album/CommonAlbumCard';
import CommonExportButton from '@/common/components/aheievement/CommonExportButton';
import CommonPage from '@/common/components/CommonPage';
import DisplayStandType from '@/types/pages/achievement/displayStand/DisplayStand.type';
import PageObjectType from '@/types/pages/achievement/PageObject.type';
import { Button, Grid2, Pagination, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DragScrollBox from '@/common/components/aheievement/album/DragScrollBox';

const AlbumBoard = () => {
    /** hook */
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();

    /** Data */
    const currentPage = Number(searchParams.get('page')); // 페이지 초기 입장 시 null(0으로 처리됨)
    const lsatDate = '2025-02-09';
    const [tableRows, setTableRows] = useState<DisplayStandType[]>([]);
    const [pageData, setPageData] = useState<PageObjectType>({
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

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
            const data = await getAlbumList({ display_stand_id: 1, page_no: pageNo });

            setTableRows(data.content);
            setPageData(data.page);
        } catch (error) {
            alert(error);
        } finally {
            // setLoading(false);
        }
    };

    /** Handler */
    const onClickHandler = () => {
        console.log('메롱메롱');
        return;
    };

    /** useEffect */
    useEffect(() => {
        searchData(currentPage);
    }, [currentPage]);
    useEffect(() => {
        console.log(pageData);
    }, [pageData]);

    return (
        <CommonPage width={'100%'} height={'100%'} title={'전시대 앨범 목록'}>
            <Grid2 container rowSpacing={5} direction='column'>
                {/** Bottun */}
                <CommonExportButton
                    container
                    columnSpacing={1}
                    ml='auto'
                    fullExportHandler={onClickHandler}
                    exportHandler={onClickHandler}
                    createHandler={onClickHandler}
                />
                {/** Total & Search */}
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
            </Grid2>
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '50px',
                }}
            >
                {/** Data List */}
                <DragScrollBox>
                    {tableRows.map((column) => (
                        <CommonAlbumCard key={column.id} title={column.title} create_date={column.create_date.toString()} />
                    ))}
                </DragScrollBox>

                {/** Paging */}
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
            </div>
        </CommonPage>
    );
};

export default AlbumBoard;
