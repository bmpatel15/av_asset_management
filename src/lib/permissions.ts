import { UserRole } from '@prisma/client'

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: [
    'VIEW_EQUIPMENT',
    'ADD_EQUIPMENT',
    'EDIT_EQUIPMENT',
    'DELETE_EQUIPMENT',
    'CHECKOUT_EQUIPMENT',
    'CHECKIN_EQUIPMENT',
    'VIEW_REPORTS',
    'MANAGE_USERS',
    'ACCESS_ADMIN_PANEL'
  ],
  MANAGER: [
    'VIEW_EQUIPMENT',
    'ADD_EQUIPMENT',
    'EDIT_EQUIPMENT',
    'CHECKOUT_EQUIPMENT',
    'CHECKIN_EQUIPMENT',
    'VIEW_REPORTS'
  ],
  STAFF: [
    'VIEW_EQUIPMENT',
    'CHECKOUT_EQUIPMENT',
    'CHECKIN_EQUIPMENT'
  ],
  BASIC: [
    'VIEW_EQUIPMENT',
    'CHECKOUT_EQUIPMENT',
    'CHECKIN_EQUIPMENT'
  ]
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
} 