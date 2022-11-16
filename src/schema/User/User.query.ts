import {
  Resolver, Query, Arg,
} from 'type-graphql';

// Models
import { User } from '~/schema/User/User.model';

// Utils
import { countNonWorkingDaysOfMonth, getNonWorkingDaysOfYear, getNonWorkingDaysOfMonth } from '~/utils/NonWorkingDays/NonWorkingDays';

// Types
import { NonWorkingDays } from '~/utils/NonWorkingDays/NonWorkingDays.type';

@Resolver(User)
export class UserQueryResolver {
  @Query(() => Number)
  public async getQuantityOfNonWorkingDaysOfMonth(@Arg('year') year: number, @Arg('month') month: number) {
    try {
      const nonWorkingDaysQuantity = await countNonWorkingDaysOfMonth(year, month);
      return nonWorkingDaysQuantity;
    } catch(error: any) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Error on getQuantityOfNonWorkingDaysOfMonth');
    }
  }

  @Query(() => [NonWorkingDays])
  public async getNonWorkingDaysOfYear(@Arg('year') year: number) {
    try {
      const nonWorkingDaysOfYear = await getNonWorkingDaysOfYear(year);
      return nonWorkingDaysOfYear;
    } catch(error: any) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Error on getNonWorkingDaysOfYear');
    }
  }

  @Query(() => [NonWorkingDays])
  public async getNonWorkingDaysOfMonth(@Arg('year') year: number, @Arg('month') month: number) {
    try {
      const nonWorkingDaysOfMonth = await getNonWorkingDaysOfMonth(year, month);
      return nonWorkingDaysOfMonth;
    } catch(error: any) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Error on getNonWorkingDaysOfMonth');
    }
  }
}
