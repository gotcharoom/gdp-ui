import { deleteAlbum } from '@/apis/achievement/album/album';
import { Box, Button, Grid2, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    id: number;
    title: string;
    create_date: string;
}

const CommonAlbumCard = (props: Props) => {
    const navigate = useNavigate();

    /** Dropdown Controll */
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    /** Modal Controll */
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => setModalOpen(false);

    /** Delete */
    const [inputValue, setInputValue] = useState<string>('');
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value); // 입력값 업데이트
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleDelete(props.id);
    };

    const handleDelete = (id: number) => {
        if (inputValue == props.title) {
            deleteData(id);
        } else {
            alert('똑띠 입력해라잉');
        }
    };

    const deleteData = async (id: number) => {
        try {
            const data = await deleteAlbum(id);
            console.log(data);
            navigate(`/achievement/album`, { replace: true });
        } catch (error) {
            alert(`오류 발생 ${error}`);
        } finally {
            alert(`삭제되었습니다.`);
        }
    };

    return (
        <Grid2
            container
            direction='column'
            alignItems='center'
            height={260}
            width={250}
            m='20px'
            mb='40px'
            p='2px'
            sx={{
                borderRadius: 2,
                color: 'white',
                border: `3px solid #686e6b`,
                '&:hover': {
                    border: `3px solid blue`,
                    cursor: `pointer`,
                },
                display: 'inline-block',
            }}
        >
            <Grid2 alignSelf='flex-start' pt='10px' pl='10px'>
                <Typography color='red'>{props.title}</Typography>
            </Grid2>
            <Grid2 width='100%'>
                <div style={{ margin: '20px', height: '120px', backgroundColor: 'gray' }}></div>
            </Grid2>
            <Grid2 container alignItems='center' justifyContent='space-between' width='100%' pl='10px'>
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
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                handleModalOpen();
                            }}
                        >
                            <span className='material-symbols-outlined' style={{ marginRight: 10 }}>
                                delete
                            </span>
                            삭제
                        </MenuItem>
                    </Menu>
                    <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={modalStyle}>
                            <Typography id='modal-modal-title' variant='h5' component='h2'>
                                정말 삭제하시겠습니까?
                            </Typography>
                            <Typography id='modal-modal-description' sx={{ my: 2 }}>
                                해당 앨범 명을 정확히 입력해주세요.
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                선택된 앨범명 : <span style={{ color: 'red' }}>{props.title}</span>
                            </Typography>
                            <TextField
                                variant='outlined'
                                size='small'
                                sx={{ mr: 5 }}
                                onChange={handleTextChange}
                                onKeyDown={(e) => handleEnterKey(e)}
                            />
                            <Button variant='contained' color='warning' onClick={() => handleDelete(props.id)}>
                                삭제
                            </Button>
                        </Box>
                    </Modal>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default CommonAlbumCard;
