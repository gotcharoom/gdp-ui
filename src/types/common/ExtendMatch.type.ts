import { UIMatch } from 'react-router-dom';

export interface Handle {
    title: string;
}

export type ExtendedMatch = UIMatch<unknown, Handle>;
