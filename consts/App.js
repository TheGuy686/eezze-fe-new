module.exports = {
    memberRoles: {
        admin: {
            id: 'admin',
            name: tr('admin'),
            color: randDarkColor(),
        },
        member: {
            id: 'member',
            name: tr('member'),
            color: randDarkColor(),
        },
    },
    defaultConUserkey: 'DEFAULT_CON_USER',
    defaultConPasskey: 'DEFAULT_CON_PASSWORD',
    defaultConRsaKeykey: 'DEFAULT_CON_RSA_KEY',
    defaultDbUserKey: 'DEFAULT_DB_USER',
    defaultDbPassKey: 'DEFAULT_DB_PASSWORD',
}