import { tr } from '~/classes/globals';

/**
 * All Routes object
 *
 * key: menu key (vue router key)
 * label: menu label
 * icon: menu icon name for <a-_prIdicon /> component
 */
export const adminUserRoutes = [
  {
    path: '/_prId/home',
    key: 'home',
    label: tr('home'),
    disabled: false,
    icon: 'home',
    activeIcon: 'hove-sld-w'
  },
  {
    path: '/_prId/connection',
    key: 'connection',
    label: tr('connections'),
    disabled: false,
    icon: 'server',
    activeIcon: 'server-sld-w'
  },
  {
    path: '/_prId/value-store',
    key: 'value-store',
    label: tr('value-store'),
    disabled: false,
    icon: 'vault',
    activeIcon: 'vault-sld-w'
  },
  {
    path: '/_prId/vault',
    key: 'vault',
    label: tr('vault'),
    disabled: false,
    icon: 'vault',
    activeIcon: 'vault-sld-w'
  },
  {
    path: '/_prId/datasource',
    key: 'datasource',
    label: tr('datasource'),
    disabled: false,
    icon: 'datasource',
    activeIcon: 'datasource-sld-w'
  },
  {
    path: '/_prId/role',
    key: 'role',
    label: tr('roles'),
    disabled: false,
    icon: 'role',
    activeIcon: 'role-sld-w'
  },
  {
    path: '/_prId/service-configurables',
    key: 'service-configurables',
    label: tr('service-configurables'),
    disabled: false,
    icon: 'paperclip-db',
    activeIcon: 'paperclip-db-sld-w'
  },
  // {
  //   key: 'service-configurables-j',
  //   oKey: 'service-configurables',
  //   label: 'Server Configurables J',
  //   disabled: false,
  //   icon: 'paperclip-db',
  //   activeIcon: 'paperclip-db-sld-w',
  //   isNew: true,
  //   path: '/server-configurables'
  // },
  {
    path: '/_prId/entity',
    key: 'entity',
    label: tr('entity'),
    disabled: false,
    icon: 'entity',
    activeIcon: 'entity-sld-w'
  },
  // {
  //   key: 'entity-j',
  //   oKey: 'entity',
  //   label: 'Entity J',
  //   disabled: false,
  //   icon: 'entity',
  //   activeIcon: 'entity-sld-w',
  //   isNew: true,
  // },
  {
    path: '/_prId/service-groups',
    key: 'service-groups',
    label: tr('service-groups'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w'
  },
  // {
  //   key: 'service-groups-j',
  //   oKey: 'service-groups',
  //   label: 'Service Groups J',
  //   disabled: false,
  //   icon: 'service',
  //   activeIcon: 'service-sld-w',
  //   isNew: true,
  // },
  // {
  //   key: 'cms',
  //   label: tr('cms', {toUpper: true} ),
  //   disabled: false,
  //   icon: 'cms',
  //   activeIcon: 'cms-sld-w',
  //   children: [
  //     {
  //       path: '/cms/datasource-types',
  //       key: 'datasource-types',
  //       label: tr('datasource-type'),
  //       disabled: false,
  //       icon: 'role',
  //     },
  //     {
  //       path: '/cms/responsecode',
  //       key: 'responsecode',
  //       label: tr('response-code'),
  //       disabled: false,
  //       icon: 'cms',
  //     },
  //     {
  //       path: '/cms/service-configurable-type',
  //       key: 'service-configurable-type',
  //       label: tr('service-configurable-types'),
  //       disabled: false,
  //       icon: 'cms',
  //     },
  //     {
  //       path: '/cms/linters',
  //       key: 'linters',
  //       label: tr('linters'),
  //       disabled: false,
  //       icon: 'cms',
  //     },
  //     {
  //       path: '/cms/create-bl-action-types',
  //       key: 'create-bl-action-types',
  //       label: tr('bl-action-types'),
  //       disabled: false,
  //       icon: 'cms',
  //     },
  //     {
  //       path: '/cms/bl-action-response-types',
  //       key: 'bl-action-response-types',
  //       label: tr('bl-action-response-types'),
  //       disabled: false,
  //       icon: 'cms',
  //     },
  //   ]
  // }
]

const managementRoutes = [
  {
    key: 'tasks',
    path: '/_prId/management/tasks',
    oKey: 'kanban-board',
    label: tr('tasks'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
  },
];

const collaborationRoutes = [
  {
    key: 'docs-api',
    path: '/_prId/collaboration/docs/api',
    oKey: 'collaboration-docs-api',
    label: tr('docs-api'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
  },
];

const adminRoutes = [
  {
    key: 'store-publications',
    path: '/admin/store-publications',
    oKey: 'admin-store-publications',
    label: tr('store-publications'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
  },
];

const userStoreRoutes = [
  {
    key: 'store-publications',
    path: '/store/publications',
    oKey: 'user-store-publications',
    label: tr('store-publications'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
  },
];

const userInternalRoutes = [
  {
    key: 'modules',
    path: '/internal/modules',
    oKey: 'modules',
    label: tr('modules'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
  },
];

export default {
  ADMIN_USER_ROLE: adminUserRoutes,
  MANAGEMENT_ROUTES: managementRoutes,
  COLLABORATION_ROUTES: collaborationRoutes,
  ADMIN_ROUTES: adminRoutes,
  USER_STORE_ROUTES: userStoreRoutes,
  USER_INTERNAL_ROUTES: userInternalRoutes,
}
