import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

/*
 * TODO. [TR-YOO] Material Icon 라이브러리 변경시 icon 수정하기
 * */
export interface MenuItem {
    title: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    children: MenuItem[];
}
