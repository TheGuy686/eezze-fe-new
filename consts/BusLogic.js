const MYSQL_KEY = 'Mysql';
const SMTP_EMAIL_KEY = 'SmtpMailService';
const REST_SERVICE_KEY = 'rest-service';
const WS_SERVICE_KEY = 'ws-service';

module.exports = {
    FILE_STORAGE_KEY: 'FileStorage',
    SMTP_EMAIL_KEY,
    DB_KEY: 'database',
    MYSQL_KEY,
    REST_SERVICE_KEY,
    WS_SERVICE_KEY,
    DB_TYPES: [ MYSQL_KEY ],
    SERVER_TYPES: [ REST_SERVICE_KEY, WS_SERVICE_KEY ],
    EMAIL_TYPES: [ SMTP_EMAIL_KEY ],
}