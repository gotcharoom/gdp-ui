import { Grid2, Typography } from '@mui/material';

interface Props {
    title: string;
    create_date: string;
}

const CommonDisplayStandCard = (props: Props) => {
    return (
        <Grid2
            container
            direction='column'
            alignItems='center'
            rowSpacing={2}
            minHeight={250}
            minWidth={250}
            p={1}
            sx={{
                borderRadius: 2,
                color: 'white',
                border: `3px solid #686e6b`,
                '&:hover': {
                    border: `3px solid blue`,
                    cursor: `pointer`,
                },
            }}
        >
            <Grid2 width={'100%'}>
                <div style={{ margin: '20px', height: '100px', backgroundColor: 'gray' }}></div>
            </Grid2>
            <Grid2>
                <Typography color='red'>{props.title}</Typography>
            </Grid2>
            <Grid2 container alignItems='center' justifyContent='space-between' width={'100%'}>
                <Grid2>
                    <Typography color='red'>{props.create_date}</Typography>
                </Grid2>
                <Grid2>
                    <span className='material-symbols-outlined' style={{ color: 'black', fontSize: '40px' }}>
                        more_vert
                    </span>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default CommonDisplayStandCard;
