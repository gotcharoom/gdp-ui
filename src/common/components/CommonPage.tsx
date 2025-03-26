import { Paper } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import '@styles/common/components/CommonPage.scss';

interface CommonPageProp {
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    maxWidth?: CSSProperties['maxWidth'];
    maxHeight?: CSSProperties['maxHeight'];

    title: string;
    children: ReactNode;
}

const CommonPage = (props: CommonPageProp) => {
    return (
        <Paper
            className={'common-page'}
            elevation={3}
            sx={{
                // width: props.width,
                // height: props.height,
                minWidth: props.width,
                minHeight: props.height,
                maxWidth: props.maxWidth,
                maxHeight: props.maxHeight,
            }}
        >
            <div className={'common-page__title'}>{props.title}</div>
            <div className={'common-page__contents'}>{props.children}</div>
        </Paper>
    );
};
export default CommonPage;
