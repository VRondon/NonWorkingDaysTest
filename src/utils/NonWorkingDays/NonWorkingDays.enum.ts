import { registerEnumType } from 'type-graphql';

export enum NonWorkingDaysType {
  INAMOVIBLE = 'inamovible',
  TRASLADABLE = 'trasladable',
  NO_LABORABLE = 'nolaborable',
  PUENTE = 'puente',
}

export interface NonWorkingDays {
  motivo: string;
  tipo: NonWorkingDaysType;
  info: string;
  id: string;
  dia?: string;
  mes?: number;
}

export interface NonWorkingMonth {
  data: [{
    [key: string]: NonWorkingDays
  }]
}

registerEnumType(NonWorkingDaysType, { name: 'NonWorkingDaysType' });