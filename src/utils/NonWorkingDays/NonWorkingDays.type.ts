import { Field, ObjectType } from 'type-graphql';

import { NonWorkingDaysType } from '~/utils/NonWorkingDays/NonWorkingDays.enum';

@ObjectType()
export class NonWorkingDays {
  @Field()
  motivo: string;
  
  @Field()
  tipo: NonWorkingDaysType;
  
  @Field()
  info: string;
  
  @Field()
  id: string;

  @Field()
  mes: number;

  @Field()
  dia: string;
}