import { TodoDTO } from '~types/todo.types';

export const getKeyExtractor = (item: TodoDTO) => String(item.id);
