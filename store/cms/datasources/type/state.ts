import { randDarkColor, tr } from '~/classes/globals';
import { InitStateCrudVars } from '~/factories/crud/State';

export default () => ({
    ...InitStateCrudVars(),
    dbTypes: [
        {
            color: randDarkColor(),
            key: 'mysql',
            name: tr('mysql-database'),
            active: true,
        },
        {
            color: randDarkColor(),
            key: 'postgres',
            name: tr('postgres'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'dynamo-db',
            name: tr('dynamo-db'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'elasticsearch',
            name: tr('elasticsearch'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'mongo-db',
            name: tr('mongo-db'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'oracle-db',
            name: tr('oracle-db'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'graph-db',
            name: tr('graph-db'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'graph-ql',
            name: tr('graph-ql'),
            active: false,
        },
        {
            color: randDarkColor(),
            key: 'sql-server',
            name: tr('sql-server'),
            active: false,
        },
    ],
    entities: [
        {
            color: randDarkColor(),
            key: 'rest-service',
            name: tr('rest-service'),
            help: tr('rest-service-help')
        },
        {
            color: randDarkColor(),
            key: 'ws-service',
            name: tr('websocket-service'),
            help: tr('websocket-service-help')
        },
        {
            color: randDarkColor(),
            key: 'Mysql',
            name: tr('mysql-database')
        },
        {
            color: randDarkColor(),
            key: 'FileStorage',
            name: tr('file-storage')
        },
        {
            color: randDarkColor(),
            key: 'SmtpMailService',
            name: tr('smtp-mail-servie'),
        },
        {
            color: randDarkColor(),
            key: 'ws-api-integration',
            name: tr('websocket-api-integration'),
            help: tr('ws-api-integration-help')
        },
        {
            color: randDarkColor(),
            key: 'rest-api-integration',
            name: tr('rest-api-integration'),
            help: tr('rest-api-integration-help')
        },
        {
            color: randDarkColor(),
            key: 'eezze-logger',
            name: tr('eezze-logger'),
            help: tr('eezze-logger-help')
        },
    ]
})