enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

type RoleType = Record<Role, string>;

const RoleName: RoleType = {
  [Role.ADMIN]: 'Адміністратор',
  [Role.USER]: 'Користувач',
  [Role.MODERATOR]: 'Модератор',
};

export { Role, RoleName };
