export enum SortTypes {
  DEFAULT = 'DEFAULT',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  STATUS_ASC = 'STATUS_ASC',
  STATUS_DESC = 'STATUS_DESC',
  SELECT_ASC = 'SELECT_ASC',
  SELECT_DESC = 'SELECT_DESC',
}

export enum TodosColumns {
  ID = 'ID',
  NAME = 'NAME',
  STATUS = 'STATUS',
  SELECT = 'SELECT',
}

export type TodoDAO = {
  userId: number;
  title: string;
};

export type TodoDTO = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  important: ImportantEnum;
};

export type TodoButtonsNameType =
  | 'plus-circle'
  | 'delete-circle'
  | 'content-save'
  | 'cancel'
  | 'checkbox-multiple-marked-circle'
  | 'circle-off-outline'
  | 'menu-down'
  | 'menu-up'
  | 'checkbox-blank-circle-outline'
  | 'check-circle'
  | 'filter'
  | 'filter-menu-outline'
  | 'bookmark'
  | 'bookmark-outline';

export enum CompletenceFilter {
  DEFAULT = '',
  COMPLETED = 'complete',
  UNCOMPLETED = 'uncomplete',
}

export enum ImportantEnum {
  DEFAULT = '',
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

export type IconsNames =
  | 'add'
  | 'delete'
  | 'save'
  | 'cancel'
  | 'select-all'
  | 'default-hide'
  | 'filter-opened'
  | 'filter-closed'
  | 'down'
  | 'up'
  | 'circle-outline'
  | 'check'
  | 'high-priority'
  | 'normal-priority'
  | 'low-priority'
  | 'none-priority';
