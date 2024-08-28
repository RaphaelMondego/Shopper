import { Request, Response } from 'express';
import { Measure } from '../models/measure';

const measures: Measure[] = []; // Mantido apenas para demonstração

export const listMeasures = (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  if (!customer_code) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing customer code'
    });
  }

  let customerMeasures = measures.filter(m => m.customer_code === customer_code);

  if (measure_type) {
    const type = measure_type.toString().toUpperCase();
    if (type !== 'WATER' && type !== 'GAS') {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida'
      });
    }

    customerMeasures = customerMeasures.filter(m => m.measure_type.toUpperCase() === type);
  }

  if (customerMeasures.length === 0) {
    return res.status(404).json({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada'
    });
  }

  res.status(200).json({
    customer_code,
    measures: customerMeasures
  });
};
