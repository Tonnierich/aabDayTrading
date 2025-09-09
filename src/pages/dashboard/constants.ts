import { localize } from '@deriv-com/translations';

export type TSidebarItem = {
    label: string;
    content: { data: string; faq_id?: string }[];
    link: boolean;
};

export const SIDEBAR_INTRO = (): TSidebarItem[] => [
    {
        label: localize('Welcome to Day Trading 🚀'),
        content: [
            {
                data: localize(
                    'Unlock the power of smart trading with Day Trading – your hub for strategies, insights, and automated tools to grow with confidence!'
                ),
            },
        ],
        link: false,
    },
    {
        label: localize('Quick Start Guide'),
        content: [
            { data: localize('Day Trading Bot – your trusted partner for consistent and seamless trading success') },
        ],
        link: true,
    },
];
