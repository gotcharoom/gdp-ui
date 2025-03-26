import DisplayStandCard from '@/common/components/aheievement/displayStand/DisplayStandCard';
import CommonPage from '@/common/components/CommonPage';
import { Grid2 } from '@mui/material';

const DisplayStandBoard = () => {
    /** hook */

    /** useEffect */

    return (
        <CommonPage width={'100%'} height={'100%'} title={'도전과제 전시대'}>
            <Grid2 container justifyContent='center' columnSpacing={6} rowSpacing={3} columns={16}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <DisplayStandCard title='merong' create_date='2002/02/02' />
                </Grid2>
            </Grid2>
        </CommonPage>
    );
};

export default DisplayStandBoard;
