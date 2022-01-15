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
};
