import icon_1 from "@/public/navbar/icon-1.svg";
import icon_2 from '@/public/navbar/icon-2.svg';
import icon_3 from '@/public/navbar/icon-3.svg';
import hero_logo_1 from "@/public/hero-section/nav-icon-1.svg";
import hero_logo_2 from '@/public/hero-section/nav-icon-2.svg';
import hero_logo_3 from '@/public/hero-section/nav-icon-3.svg';
import hero_logo_4 from '@/public/hero-section/nav-icon-4.svg';

export const NavbarItemList = [
    {
        name: 'Products',
        link: '#',
        id: 'our-products',
    },
    {
        name: 'Why LOQO ai',
        link: '#',
        id: 'why-LOQO ai',
    }
];
export const HeroSectionFeatures = [
    {
        name: 'Tech-First Solutions',
        icon: hero_logo_1,
    },
    {
        name: 'AI-Powered Insights',
        icon: hero_logo_2,
    },
    {
        name: 'Agency Automation',
        icon: hero_logo_3,
    },
    {
        name: 'Custom Tools',
        icon: hero_logo_4,
    },
];

export const SocialLinks = [
    {
        title: 'Our Services',
        links: [
            { title: 'Tech-First Solutions', id: '', href: '#', isValid: false },
            { title: 'Agency Automation', id: '', href: '#', isValid: false },
            { title: 'AI-Powered Insights', id: '', href: '#', isValid: false },
            { title: 'Custom Tools', id: '', href: '#', isValid: false },
        ],
    },
];

export const ContactInfo = ['Nimbus The Golden Palm Sector 168', 'Noida, Uttar Pradesh 201301', '(+91) 77959-83243', 'business@loqo.ai'];

export type WhySuperbioListProps = {
    title: string;
    icon: string;
    text: string;
    text2: string;
    button1: string;
    button2: string;
    actionUrl1: string;
    actionUrl2: string;
};
export const WhySuperbioList: WhySuperbioListProps[] = [
    {
        title: 'Campaign \n Performance \n Tracker',
        icon: icon_1,
        text: 'Automate your campaign performance tracking',
        text2: 'Get detailed post metrics & dashboard for you and your brands.',
        button1: 'Try it now',
        button2: 'Book a demo',
        actionUrl1: 'https://calendly.com/deepak-jain-loqo',
        actionUrl2: '/register',
    },
    {
        title: 'Influencer \n Profile \n Analysis',
        icon: icon_2,
        text: 'Trouble choosing the best?',
        text2: 'Get precise profile analytics of hundreds of influencers',
        button1: 'Know More',
        button2: '',
        actionUrl1: 'https://calendly.com/deepak-jain-loqo',
        actionUrl2: '',
    },
    {
        title: 'Custom Tech Solutions',
        icon: icon_3,
        text: 'If you can dream it, LOQO can do it.',
        text2: 'Custom AI powered solutions tailored for your agency processes',
        button1: 'Get in Touch ',
        button2: '',
        actionUrl1: 'https://calendly.com/deepak-jain-loqo',
        actionUrl2: '',
    },
];
