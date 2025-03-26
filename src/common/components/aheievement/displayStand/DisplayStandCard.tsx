import { Grid2, Typography } from '@mui/material';

interface DisplayStandCardProps {
    title: string;
    create_date: string;
}

const DisplayStandCard = (props: DisplayStandCardProps) => {
    return (
        <Grid2
            container
            direction='column'
            alignItems='center'
            rowSpacing={2}
            sx={{
                alignItems: 'center',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
                color: 'white',
                border: `1px solid #686e6b`,
                '&:hover': {
                    border: `1px solid blue`,
                    cursor: `pointer`,
                },
            }}
        >
            <Grid2>
                <div style={{ margin: '20px', width: '200px', height: '100px', backgroundColor: 'gray' }}></div>
            </Grid2>
            <Grid2>
                <Typography color='red'>{props.title}</Typography>
            </Grid2>
            <Grid2>
                <Typography color='red'>{props.create_date}</Typography>
            </Grid2>
        </Grid2>
    );
};

export default DisplayStandCard;
