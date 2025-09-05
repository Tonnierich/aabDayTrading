import { localize } from '@deriv-com/translations';

export type TSidebarItem = {
    label: string;
    content: { data: string; faq_id?: string }[];
    link: boolean;
};

export const SIDEBAR_INTRO = (): TSidebarItem[] => [
    {
        label: localize('Welcome to Tradeprofxofficial 🚀'),
        content: [
            {
                data: localize(
                    'Empowering traders with smarter tools and automated strategies. Together, we grow wealth with confidence!'
                ),
            },
        ],
        link: false,
    },
    {
        label: localize('Quick Start Guide'),
        content: [
            { data: localize('Tradeprofx Bot – your trusted partner for seamless trading success') },
        ],
        link: true,
    },
];
