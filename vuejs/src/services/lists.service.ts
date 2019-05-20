import { ListsDao } from '@/data/lists.dao';
import { List } from '@/domain/list.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class ListsService {
  readonly listsDao: ListsDao;

  constructor() {
    this.listsDao = new ListsDao();
    this.getLists().subscribe();
  }

  getLists() {
    return this.listsDao.getLists().pipe(tap(lists => store.dispatch('setLists', lists)));
  }
  addList(listData: List) {
    return this.listsDao.addList(listData).pipe(tap(list => store.dispatch('addList', list)));
  }
}
export const listsService = new ListsService();
