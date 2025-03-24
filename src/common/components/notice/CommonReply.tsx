import { useState, ChangeEvent } from 'react';
import { TextField, Button, Stack, Typography, IconButton } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

interface Comment {
    user: string;
    reply: string;
}
interface User {
    userId: number;
    userName: string;
}
interface CommonReplyProps {
    comments: Comment[]; // 댓글 리스트
    users: User[];
    currentUser: User;
    addComment: (newComment: Comment) => void; // 새로운 댓글 추가 함수
    removeComment: (commentIndex: number) => void;
}

// TODO. 현재 사용하지 않는 변수 제거 (removeComment) -> 추후 사용시 추가 필요
const CommonReply = ({ comments, addComment, _users, removeComment, currentUser }: CommonReplyProps) => {
    //Hooks
    const [newComment, setNewComment] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);
    const commentsToShow = 10;

    // TODO. 현재 사용되지 않는 기능 주석처리 -> 추후 사용시 주석 해제 필요

    /* Privates */
    const visibleComments = showAll ? comments : comments.slice(0, commentsToShow);
    /* Events */
    const handleSubmit = () => {
        if (newComment.trim() !== '') {
            addComment({ user: currentUser.userName, reply: newComment });
            setNewComment('');
        }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
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
                {visibleComments.map((comment, index) => {
                    const isAuthor = currentUser.userName === comment.user; // 현재 로그인한 사용자인지 확인

                    return (
                        <div
                            key={index}
                            style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <div>
                                <Typography variant='subtitle2'>{comment.user}</Typography>
                                <Typography variant='body1'>{comment.reply}</Typography>
                            </div>

                            {/* 댓글 삭제 버튼 (작성자 본인만 가능) */}
                            {isAuthor && (
                                <IconButton size='small' onClick={() => removeComment(index)}>
                                    <HighlightOff fontSize='small' />
                                </IconButton>
                            )}
                        </div>
                    );
                })}
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
