import { ZodiacSign } from '../constants';

export interface HoroscopeResponse {
  horoscope_data: string;
  date: string;
  sign: ZodiacSign;
}

export interface ApiError {
  message: string;
  status?: number;
}
