
const menu = [
    {
        label: 'Trang chính',
        to: '/dashboard',
        icon: 'fas fa-briefcase',
        showHome: false
    },
    {
        label: 'Cửa hàng',
        to: '/stores',
        icon: 'fas fa-door-open',
        showHome: true
    },
    {
        label: 'Hoá đơn điện tử',
        to: '/invoice-report',
        icon: 'fas fa-file-invoice-dollar',
        showHome: true
    },
    {
        label: 'Cấu hình xuất HĐĐT',
        to: '/invoice-config',
        icon: 'fas fa-sliders-h',
        showHome: true
    },
    {
        label: 'Xuất dữ liệu',
        to: '/exports',
        icon: 'fas fa-file-download',
        showHome: true
    },
];

export default menu
