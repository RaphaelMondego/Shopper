type MeasureType = 'WATER' | 'GAS';

export interface Measure {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
}
