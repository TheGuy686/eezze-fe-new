function tr(key) {
  return key;
}

/**
 * All Routes object
 *
 * key: menu key (vue router key)
 * label: menu label
 * icon: menu icon name for <a-icon /> component
 */
export const adminUserRoutes = [
  {
    key: 'home',
    label: tr('home'),
    disabled: false,
    icon: 'home',
    activeIcon: 'hove-sld-w'
  },
  {
    key: 'connection',
    label: tr('connections'),
    disabled: false,
    icon: 'server',
    activeIcon: 'server-sld-w'
  },
  {
    key: 'vault',
    label: tr('vault'),
    disabled: false,
    icon: 'vault',
    activeIcon: 'vault-sld-w'
  },
  {
    key: 'datasource',
    label: tr('datasource'),
    disabled: false,
    icon: 'datasource',
    activeIcon: 'datasource-sld-w'
  },
  {
    key: 'role',
    label: tr('roles'),
    disabled: false,
    icon: 'role',
    activeIcon: 'role-sld-w'
  },
  {
    key: 'service-configurables',
    label: tr('service-configurables'),
    disabled: false,
    icon: 'paperclip-db',
    activeIcon: 'paperclip-db-sld-w'
  },
  {
    key: 'service-configurables-j',
    oKey: 'service-configurables',
    label: 'Server Configurables J',
    disabled: false,
    icon: 'paperclip-db',
    activeIcon: 'paperclip-db-sld-w',
    isNew: true,
    path: '/server-configurables'
  },
  {
    key: 'entity',
    label: tr('entity'),
    disabled: false,
    icon: 'entity',
    activeIcon: 'entity-sld-w'
  },
  {
    key: 'entity-j',
    oKey: 'entity',
    label: 'Entity J',
    disabled: false,
    icon: 'entity',
    activeIcon: 'entity-sld-w',
    isNew: true,
  },
  {
    key: 'service-groups',
    label: tr('service-groups'),
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w'
  },
  {
    key: 'service-groups-j',
    oKey: 'service-groups',
    label: 'Service Groups J',
    disabled: false,
    icon: 'service',
    activeIcon: 'service-sld-w',
    isNew: true,
  },
  {
    key: 'cms',
    label: tr('cms', {toUpper: true} ),
    disabled: false,
    icon: 'cms',
    activeIcon: 'cms-sld-w',
    children: [
      {
        key: 'datasource-types',
        label: tr('datasource-type'),
        disabled: false,
        icon: 'role',
      },
      {
        key: 'responsecode',
        label: tr('response-code'),
        disabled: false,
        icon: 'cms',
      },
      {
        key: 'service-configurable-type',
        label: tr('service-configurable-types'),
        disabled: false,
        icon: 'cms',
      },
      {
        key: 'linters',
        label: tr('linters'),
        disabled: false,
        icon: 'cms',
      },
      {
        key: 'create-bl-action-types',
        label: tr('bl-action-types'),
        disabled: false,
        icon: 'cms',
      },
      {
        key: 'bl-action-response-types',
        label: tr('bl-action-response-types'),
        disabled: false,
        icon: 'cms',
      },
    ]
  }
]

export default {
  ADMIN_USER_ROLE: adminUserRoutes,
}
