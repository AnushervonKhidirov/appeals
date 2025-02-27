import { FindManyOptions, MoreThanOrEqual, Between, LessThanOrEqual } from 'typeorm';
import { AppealEntity } from './entity/appeals.entity';

export class AppealsHelper {
  getDateFilters({ from, to, date }: { from?: string; to?: string; date?: string }) {
    const dateFilters: FindManyOptions<AppealEntity> = {};

    if (typeof from === 'string' && typeof to === 'string') {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      dateFilters.where = { createdAt: Between(fromDate, toDate) };
    }

    if (typeof from === 'string' && !to) {
      const fromDate = new Date(from);
      dateFilters.where = { createdAt: MoreThanOrEqual(fromDate) };
    }

    if (typeof to === 'string' && !from) {
      const toDate = new Date(to);
      dateFilters.where = { createdAt: LessThanOrEqual(toDate) };
    }

    if (typeof date === 'string') {
      const oneDay = 60 * 60 * 24 * 1000;
      const fromDate = new Date(date);
      const toDate = new Date(fromDate.getTime() + oneDay);
      dateFilters.where = { createdAt: Between(fromDate, toDate) };
    }

    return dateFilters;
  }
}
