export const MENU_ITEMS = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    { key: 'validator', label: 'Validator', isTitle: false, icon: 'mdi mdi-vote-outline', url: '/dashboard/validator' },
    { key: 'miner', label: 'Miner', isTitle: false, icon: 'mdi mdi-pickaxe', url: '/dashboard/miner' },
    { key: 'validators-list', label: 'Validators list', isTitle: false, icon: 'mdi mdi-format-list-bulleted', url: '/validators' },
    { key: 'validators-metrics', label: 'Validators metrics', isTitle: false, icon: 'mdi mdi-format-list-bulleted', url: '/metrics/view' },
    { key: 'status-page', label: 'TON Status', isTitle: false, icon: 'mdi mdi-speedometer-medium', url: '/status' },
    { key: '2fa', label: 'Security', isTitle: false, icon: 'uil uil-shield-check', url: '/2fa' },
    { key: 'updates', label: 'Update center', isTitle: false, icon: 'mdi mdi-download', url: '/updates' },

];

export const MENU_ITEMS_WITHOUT_LOGIN = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    { key: 'validators-metrics', label: 'Validators metrics', isTitle: false, icon: 'mdi mdi-format-list-bulleted', url: '/metrics/view' },
    { key: 'status-page', label: 'Status page', isTitle: false, icon: 'mdi mdi-speedometer-medium', url: '/status' },
    // { key: 'authorization', label: 'Authorization', isTitle: false, icon: 'mdi mdi-account-circle-outline', url: '/account/login' },
]
