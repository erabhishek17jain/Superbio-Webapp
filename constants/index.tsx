export const ANALYTICS_FILTERS = [
    {
        name: 'Dates',
        key: 'postedAt',
    },
    {
        name: 'Sheets',
        key: 'internalSheetId',
    },
    {
        name: 'Platform',
        key: 'platform',
    },
    {
        name: 'Types',
        key: 'postType',
    },
    {
        name: 'Phases',
        key: 'phase',
    },
    {
        name: 'Category',
        key: 'category',
    },
    {
        name: 'Sub Category',
        key: 'subCategory',
    },
];

export const USER_ROLES = [
    {
        name: 'Admin',
        value: 'admin',
        title: 'Would be able to see/edit all campaign for an organisation',
    },
    {
        name: 'User',
        value: 'user',
        title: 'Would be able to see only campaigns created by himself/herself and campaigns that are shared by other users.',
    },
    {
        name: 'Brand',
        value: 'brand',
        title: 'Brand Role will be able to view only campaigns shared with brand by the user. The Brand can only view - no edit access.',
    },
];

export const SUMMARY_ICONS: { [key: string]: JSX.Element } = {
    'views': (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' id='Comment' width='28' height='28' fill='transparent'>
            <path
                fill='#fff'
                d='m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='colorf2f2f2 svgShape'></path>
            <path
                fill='#fff'
                d='M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='color231f20 svgShape'></path>
        </svg>
    ),
    'comments': (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='transparent' id='bar-graph'>
            <path
                fill='#fff'
                fillRule='evenodd'
                d='M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm12 3a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Zm-5 4a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm-6 5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Z'
                clipRule='evenodd'></path>
        </svg>
    ),
    'likes': (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='like' width='24' height='24' fill='transparent'>
            <path fill='#fff' d='M0,1v8c0,0.552246 0.447693,1 1,1h3v-10h-3c-0.552307,8.88178e-16 -1,0.447693 -1,1Z' transform='translate(0 5)'></path>
            <path
                fill='#fff'
                d='M9.15332,5.02979h-2.9541c-0.258301,0 -0.387695,-0.172363 -0.431152,-0.246582c-0.043457,-0.0737305 -0.131348,-0.270508 -0.0063477,-0.496094l1.0415,-1.87549c0.228516,-0.410645 0.251953,-0.893555 0.0649414,-1.32471c-0.187012,-0.43164 -0.556152,-0.744629 -1.0127,-0.858398l-0.734375,-0.183594c-0.178711,-0.0449219 -0.368164,0.0122071 -0.492676,0.150391l-3.9873,4.42969c-0.413574,0.460449 -0.641113,1.0542 -0.641113,1.67236v5.23242c0,1.37842 1.12158,2.5 2.5,2.5l4.97412,-0.0004883c1.12305,0 2.11475,-0.756348 2.41113,-1.83887l1.06738,-4.89844c0.03125,-0.13623 0.0473633,-0.275879 0.0473633,-0.415527c0,-1.01807 -0.828613,-1.84668 -1.84668,-1.84668Z'
                transform='translate(5 .97)'></path>
        </svg>
    ),
    'followers': (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='like' width='24' height='24' fill='transparent'>
            <path fill='#fff' d='M0,1v8c0,0.552246 0.447693,1 1,1h3v-10h-3c-0.552307,8.88178e-16 -1,0.447693 -1,1Z' transform='translate(0 5)'></path>
            <path
                fill='#fff'
                d='M9.15332,5.02979h-2.9541c-0.258301,0 -0.387695,-0.172363 -0.431152,-0.246582c-0.043457,-0.0737305 -0.131348,-0.270508 -0.0063477,-0.496094l1.0415,-1.87549c0.228516,-0.410645 0.251953,-0.893555 0.0649414,-1.32471c-0.187012,-0.43164 -0.556152,-0.744629 -1.0127,-0.858398l-0.734375,-0.183594c-0.178711,-0.0449219 -0.368164,0.0122071 -0.492676,0.150391l-3.9873,4.42969c-0.413574,0.460449 -0.641113,1.0542 -0.641113,1.67236v5.23242c0,1.37842 1.12158,2.5 2.5,2.5l4.97412,-0.0004883c1.12305,0 2.11475,-0.756348 2.41113,-1.83887l1.06738,-4.89844c0.03125,-0.13623 0.0473633,-0.275879 0.0473633,-0.415527c0,-1.01807 -0.828613,-1.84668 -1.84668,-1.84668Z'
                transform='translate(5 .97)'></path>
        </svg>
    ),
    'reposts': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z'></path>
            </g>
        </svg>
    ),
    'medias': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z'></path>
            </g>
        </svg>
    ),
    'quotes': (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' id='Comment' width='28' height='28' fill='transparent'>
            <path
                fill='#fff'
                d='m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='colorf2f2f2 svgShape'></path>
            <path
                fill='#fff'
                d='M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='color231f20 svgShape'></path>
        </svg>
    ),
    'bookmarks': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'></path>
            </g>
        </svg>
    ),
    'frequency': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'></path>
            </g>
        </svg>
    ),
    'shares': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'></path>
            </g>
        </svg>
    ),
    'following': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'></path>
            </g>
        </svg>
    ),
    'saves': (
        <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='#fff'>
            <g>
                <path d='M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z'></path>
            </g>
        </svg>
    ),
    'estimatedReach': (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='transparent' id='bar-graph'>
            <path
                fill='#fff'
                fillRule='evenodd'
                d='M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm12 3a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Zm-5 4a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm-6 5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Z'
                clipRule='evenodd'></path>
        </svg>
    ),
    'engagements': (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='transparent' id='bar-graph'>
            <path
                fill='#fff'
                fillRule='evenodd'
                d='M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm12 3a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1Zm-5 4a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm-6 5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Z'
                clipRule='evenodd'></path>
        </svg>
    ),
    'Posts': (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' id='Comment' width='28' height='28' fill='transparent'>
            <path
                fill='#fff'
                d='m23.751 21.127.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='colorf2f2f2 svgShape'></path>
            <path
                fill='#fff'
                d='M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z'
                className='color231f20 svgShape'></path>
        </svg>
    ),
};

export const SUMMARY_COLORS: { [key: string]: string } = {
    'views': 'bg-posts',
    'comments': 'bg-views',
    'likes': 'bg-likes',
    'reposts': 'bg-reposts',
    'quotes': 'bg-quotes',
    'bookmarks': 'bg-bookmarks',
    'shares': 'bg-quotes',
    'saves': 'bg-bookmarks',
    'estimatedReach': 'bg-views',
    'Posts': 'bg-posts',
    'followers': 'bg-posts',
    'medias': 'bg-views',
    'engagements': 'bg-reposts',
    'frequency': 'bg-quotes',
    'following': 'bg-bookmarks',
};
