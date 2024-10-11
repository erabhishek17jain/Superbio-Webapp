import { BookHeart, BookHeartIcon, BookMarkedIcon, ChartNoAxesColumnIncreasingIcon, Clock4Icon, EyeIcon, HeartIcon, MessageCircleIcon, QuoteIcon, Repeat2Icon, Share2Icon, StickyNoteIcon, TvMinimalPlayIcon, UserRoundCheckIcon, UserRoundPlusIcon } from 'lucide-react';

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
    }
];

export const ANALYTICS_PROFILES_FILTERS = [
    {
        name: 'Followers',
        key: 'profileTypeByFollowers',
    },
    {
        name: 'Frequency Per Day',
        key: 'postFrequencyPerDay',
    },
    {
        name: 'Niche',
        key: 'niche',
    },
    {
        name: 'Engagement Rate',
        key: 'engagementRate',
    },
];

export const ANALYTICS_FILTERS_FROM_SHEETS = [
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
    // {
    //     name: 'Brand',
    //     value: 'brand',
    //     title: 'Brand Role will be able to view only campaigns shared with brand by the user. The Brand can only view - no edit access.',
    // },
];

export const SUMMARY_ICONS: { [key: string]: JSX.Element } = {
    views: <EyeIcon color='#fff' size={20} />,
    comments: <MessageCircleIcon color='#fff' size={20} />,
    likes: <HeartIcon color='#fff' size={20} />,
    followers: <UserRoundPlusIcon color='#fff' size={20} />,
    reposts: <Repeat2Icon color='#fff' size={20} />,
    medias: <TvMinimalPlayIcon color='#fff' size={20} />,
    quotes: <QuoteIcon color='#fff' size={20} />,
    bookmarks: <BookMarkedIcon color='#fff' size={20} />,
    frequency_per_day: <Clock4Icon color='#fff' size={20} />,
    shares: <Share2Icon color='#fff' size={20} />,
    following: <UserRoundCheckIcon color='#fff' size={20} />,
    saves: <BookMarkedIcon color='#fff' size={20} />,
    estimatedReach: <ChartNoAxesColumnIncreasingIcon color='#fff' size={20} />,
    engagements: <BookHeartIcon color='#fff' size={20} />,
    posts: <StickyNoteIcon color='#fff' size={20} />,
    profiles: <StickyNoteIcon color='#fff' size={20} />,
};