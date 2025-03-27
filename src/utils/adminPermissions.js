const adminPermissions = {
    roles: {
      SUPER_ADMIN: 'super_admin',
      ADMIN: 'admin',
      MODERATOR: 'moderator',
      VIEWER: 'viewer'
    },
    
    permissions: {
      USERS: {
        VIEW: 'users:view',
        EDIT: 'users:edit',
        BAN: 'users:ban',
        DELETE: 'users:delete'
      },
      GAMES: {
        VIEW: 'games:view',
        ADD: 'games:add',
        EDIT: 'games:edit',
        DELETE: 'games:delete'
      },
      ORDERS: {
        VIEW: 'orders:view',
        MANAGE: 'orders:manage'
      }
    },
  
    checkPermission: (userRole, requiredPermission) => {
      const roleHierarchy = {
        [adminPermissions.roles.SUPER_ADMIN]: [
          ...Object.values(adminPermissions.permissions.USERS),
          ...Object.values(adminPermissions.permissions.GAMES),
          ...Object.values(adminPermissions.permissions.ORDERS)
        ],
        [adminPermissions.roles.ADMIN]: [
          adminPermissions.permissions.USERS.VIEW,
          adminPermissions.permissions.USERS.EDIT,
          adminPermissions.permissions.GAMES.ADD,
          adminPermissions.permissions.GAMES.EDIT,
          adminPermissions.permissions.ORDERS.VIEW
        ],
        [adminPermissions.roles.MODERATOR]: [
          adminPermissions.permissions.USERS.VIEW,
          adminPermissions.permissions.GAMES.VIEW,
          adminPermissions.permissions.ORDERS.VIEW
        ],
        [adminPermissions.roles.VIEWER]: [
          adminPermissions.permissions.USERS.VIEW,
          adminPermissions.permissions.GAMES.VIEW
        ]
      };
  
      return roleHierarchy[userRole]?.includes(requiredPermission) || false;
    }
  };
  
  export default adminPermissions;