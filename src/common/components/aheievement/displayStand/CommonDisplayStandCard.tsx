import { Grid2, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
    title: string;
    create_date: string;
}

const CommonDisplayStandCard = (props: Props) => {
    /** Dropdown controll */
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <Grid2 width='100%'>
                <div style={{ margin: '20px', height: '100px', backgroundColor: 'gray' }}></div>
            </Grid2>
            <Grid2>
                <Typography color='red'>{props.title}</Typography>
            </Grid2>
            <Grid2 container alignItems='center' justifyContent='space-between' width='100%'>
                <Grid2>
                    <Typography color='red'>{props.create_date}</Typography>
                </Grid2>
                <Grid2>
                    <span
                        className='material-symbols-outlined'
                        onClick={handleClick}
                        style={{ color: 'black', fontSize: '40px', userSelect: 'none' }}
                    >
                        more_vert
                    </span>
                    {/** Dropdown */}
                    <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>
                            <span className='material-symbols-outlined' style={{ marginRight: 10 }}>
                                sim_card_download
                            </span>
                            내보내기 (PDF)
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <span className='material-symbols-outlined' style={{ marginRight: 10 }}>
                                sim_card_download
                            </span>
                            내보내기 (JSON)
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <span className='material-symbols-outlined' style={{ marginRight: 10 }}>
                                delete
                            </span>
                            삭제
                        </MenuItem>
                    </Menu>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default CommonDisplayStandCard;
