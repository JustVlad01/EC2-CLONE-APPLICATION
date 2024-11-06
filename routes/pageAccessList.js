module.exports = {
    actions: {
        pageAccess: [
            'PageAccessCreate',
            'PageAccessList',
            'PageAccessUpdate',
            'PageAccessDelete'
        ],
        menu: [
            'CreateMenu',
            'UpdateMenu',
            'DeleteMenu',
            'ViewMenu',
            'ViewMenuAdmin'
        ],
        hotel: [
            'CreateHotel',
            'UpdateHotel',
            'DeleteHotel'
        ],
        image: [
            'UploadImage'
        ],
    },
    pages: [
        'Dashboard',
        'Users',
        'PageAccess',
        'Menu',
        'Tables',
        'Statistics',
        'Orders',
        'Roles',
        'Settings'
    ]
};
