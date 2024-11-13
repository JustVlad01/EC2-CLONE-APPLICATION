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
        tables: [
            'ManageTables',
            'ViewTables',
            'UpdateTable',
            'DeleteTable'
        ],
        rooms: [
            'ManageRooms',
            'ViewRooms',
            'UpdateRooms',
            'DeleteRooms'
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
