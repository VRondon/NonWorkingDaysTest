import { ApolloError } from 'apollo-server-core';
import axios from 'axios';
import moment from 'moment';

// Utils
import { Logger } from '~/utils/logger';

// Enums
import { NonWorkingDays, NonWorkingMonth } from '~/utils/NonWorkingDays/NonWorkingDays.enum';

// Errors
import { NonWorkingDaysError } from '~/utils/NonWorkingDays/NonWorkingDays.error';

const apiUrl = process.env.NON_WORKING_DAYS_API_URL || 'http://nolaborables.com.ar/api/v2/feriados';

const serviceName = 'NonWorkingDays';
const logger = new Logger(serviceName);

/**
 * Get all non working days for a year
 * @param year            year
 */
export const getNonWorkingDaysOfYear = async(year: number): Promise<NonWorkingDays[]> => {
  try {
    if (year > moment().year() + 5 || year < 2010) throw new ApolloError(NonWorkingDaysError.INVALID_YEAR);

    const response = await axios.get(`${apiUrl}/${year}`);
    const data: NonWorkingDays[] = response.data;
    return data;
  } catch(error: any) {
    if (error instanceof Error) throw new Error(error.message);
    logger.error(`[getNonWorkingDaysOfYear] ${error.message}`, error);
    throw new Error(NonWorkingDaysError.ERROR_GETTING_NON_WORKING_DAYS_OF_YEAR);
  }
}

/**
 * Get all non working days for a month in a year
 * @param year            year
 * @param month           month
 */
export const getNonWorkingDaysOfMonth = async(year: number, month: number): Promise<NonWorkingDays[]> => {
  try {
    if (year > moment().year() + 5 || year < 2010) throw new ApolloError(NonWorkingDaysError.INVALID_YEAR);
    if (month < 0 || month >= 12) throw new ApolloError(NonWorkingDaysError.INVALID_MONTH);

    const response: NonWorkingMonth = await axios.get(`${apiUrl}/${year}?formato=mensual`);
    const { data } = response;

    const nonWorkingDaysOfMonth = data[month];
    const days = Object.keys(nonWorkingDaysOfMonth);
    const result: NonWorkingDays[] = days.map(day => ({
      motivo: nonWorkingDaysOfMonth[day].motivo,
      tipo: nonWorkingDaysOfMonth[day].tipo,
      info: nonWorkingDaysOfMonth[day].info,
      dia: day,
      mes: month,
      id: nonWorkingDaysOfMonth[day].id,
    }));
    return result;
  } catch(error: any) {
    if (error instanceof Error) throw new Error(error.message);
    logger.error(`[getNonWorkingDaysOfMonth] ${error.message}`, error);
    throw new Error(NonWorkingDaysError.ERROR_GETTING_NON_WORKING_DAYS_OF_MONTH);
  }
}

/**
 * Count all non working days for a month in a year
 * @param year            year
 * @param month           month
 */
export const countNonWorkingDaysOfMonth = async(year: number, month: number): Promise<Number> => {
  try {
    if (year > moment().year() + 5 || year < 2010) throw new ApolloError(NonWorkingDaysError.INVALID_YEAR);
    if (month < 0 || month >= 12) throw new ApolloError(NonWorkingDaysError.INVALID_MONTH);

    const response: NonWorkingMonth = await axios.get(`${apiUrl}/${year}?formato=mensual`);
    const data = response.data;
    return Object.keys(data[month]).length;
  } catch(error: any) {
    if (error instanceof Error) throw new Error(error.message);
    logger.error(`[countNonWorkingDaysOfMonth] ${error.message}`, error);
    throw new Error(NonWorkingDaysError.ERROR_COUNTING_NON_WORKING_DAYS_OF_MONTH);
  }
}
