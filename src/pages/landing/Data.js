
import image1 from '../../assets/images/features-1.svg';
import image2 from '../../assets/images/features-2.svg';

const services = [
    {
        icon: 'uil uil-desktop',
        title: 'Validator Administration',
        description: 'Manage your validator parameters.',
    },
    {
        icon: 'uil uil-vector-square',
        title: 'Blockchain Status',
        description: 'Monitor statistics like TPS, Hashrate, Complexity and more.',
    },
    {
        icon: 'uil uil-check',
        title: 'Election Status',
        description: 'See current elections and complaints',
    },
    {
        icon: 'uil uil-exchange',
        title: 'Bridge Status',
        description: 'See which TON bridges are operating right now',
    },
    {
        icon: 'uil uil-server-network',
        title: 'DHT Servers List',
        description: 'Et harum quidem rerum as expedita distinctio nam libero tempore cum soluta nobis est cumque quo.',
    },
    {
        icon: 'uil uil-server-alt',
        title: 'Lite Servers List',
        description: 'Et harum quidem rerum as expedita distinctio nam libero tempore cum soluta nobis est cumque quo.',
    },
];


const features = [
    {
        id: 1,
        title: 'Inbuilt applications and pages',
        desc: 'Hyper comes with a variety of ready-to-use applications and pages that help to speed up the development',
        image: image1,
        features: [
            'Real-time data',
            'Advanced Statistics',
            'Easy to use',
        ],
    },
    {
        id: 2,
        title: 'Simply beautiful design',
        desc: 'The simplest and fastest way to build dashboard or admin panel. Hyper is built using the latest tech and tools and provide an easy way to customize anything, including an overall color schemes, layout, etc.',
        image: image2,
        features: [
            'Built with latest Bootstrap',
            'Extensive use of SCSS variables',
            ' Well documented and structured code',
            'Detailed Documentation',
        ],
    }
];

const plans = [
    {
        id: 1,
        name: 'Standard License',
        icon: 'dripicons-user',
        price: '$49',
        duration: 'License',
        features: ['10 GB Storage', '500 GB Bandwidth', 'No Domain', '1 User', 'Email Support', '24x7 Support'],
        isRecommended: false,
    },
    {
        id: 2,
        name: 'Multiple License',
        icon: 'dripicons-briefcase',
        price: '$99',
        duration: 'License',
        features: ['50 GB Storage', '900 GB Bandwidth', '2 Domain', '10 User', 'Email Support', '24x7 Support'],
        isRecommended: true,
    },
    {
        id: 3,
        name: 'Extended License',
        icon: 'dripicons-store',
        price: '$599',
        duration: 'License',
        features: [
            '100 GB Storage',
            'Unlimited Bandwidth',
            '10 Domain',
            'Unlimited Users',
            'Email Support',
            '24x7 Support',
        ],
        isRecommended: false,
    },
];

const rawFaqs = [
    {
        id: 1,
        question: 'What is TON?',
        answer: 'TODO',
        titleClass: 'text-body',
        textClass: 'pb-1 text-muted',
    },
    {
        id: 2,
        question: 'What is TONAdmin?',
        answer: 'TODO',
        titleClass: 'text-body',
        textClass: 'pb-1 text-muted',
    },
    {
        id: 3,
        question: 'How do I use TONAdmin?',
        answer: 'TODO',
        titleClass: 'text-body',
        textClass: 'pb-1 text-muted',
    },
    {
        id: 4,
        question: 'How do I install a validator?',
        answer: 'TODO',
        titleClass: 'text-body',
        textClass: 'pb-1 text-muted',
    },
];

export { services, features, plans, rawFaqs };
