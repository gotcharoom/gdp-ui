import { useState, ChangeEvent } from 'react';
import { TextField, Button, Stack, Typography, IconButton } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

interface Comment {
    user?: string;
    reply?: string;
}

interface CommonReplyProps {
    comments: Comment[]; // 댓글 리스트
    addComment: (newComment: Comment) => void; // 새로운 댓글 추가 함수
    removeComment: (postId: number, commentIndex: number) => void;
    userId?: number;
}

const CommonReply = ({ comments, addComment, removeComment }: CommonReplyProps) => {
    //Hooks
    const [newComment, setNewComment] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);
    const commentsToShow = 10;

    /* Privates */
    const visibleComments = showAll ? comments : comments.slice(0, commentsToShow);
    /* Events */
    const handleSubmit = () => {
        if (newComment.trim() !== '') {
            addComment({ user: '사용자', reply: newComment });
            setNewComment('');
        }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };
    const handleDelete = (userId: number, commentIndex: number) => {
        if (userId !== undefined) {
            removeComment(userId, commentIndex);
        }
    };
    /* Lifecycle */

    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <Typography variant='h6'>댓글 {comments.length}개</Typography>

            <TextField
                label='댓글을 작성하세요...'
                variant='outlined'
                fullWidth
                multiline
                rows={2}
                value={newComment}
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant='contained' sx={{ mt: 1 }}>
                등록
            </Button>

            <Stack spacing={2} sx={{ mt: 3 }}>
                {visibleComments.map((comment, index) => (
                    <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                        <Typography variant='subtitle2'>
                            <strong>{comment.user}</strong>
                        </Typography>
                        <Typography variant='body1'>{comment.reply}</Typography>
                        <IconButton onClick={handleDelete} size='small'>
                            <HighlightOff fontSize='small' />
                        </IconButton>
                    </div>
                ))}
            </Stack>

            {comments.length > commentsToShow && (
                <Button onClick={() => setShowAll(!showAll)} style={{ marginTop: '10px' }}>
                    {showAll ? '댓글 숨기기' : `댓글 ${comments.length - commentsToShow}개 더 보기`}
                </Button>
            )}
        </div>
    );
};

export default CommonReply;
