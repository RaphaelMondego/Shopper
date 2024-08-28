import { Request, Response } from 'express';
import { Measure } from '../models/measure';

const measures: Measure[] = []; // Mantido apenas para demonstração

export const confirmMeasure = (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  if (!measure_uuid || confirmed_value === undefined) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields'
    });
  }

  const measure = measures.find(m => m.measure_uuid === measure_uuid);

  if (!measure) {
    return res.status(404).json({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada'
    });
  }

  if (measure.has_confirmed) {
    return res.status(409).json({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada'
    });
  }

  measure.measure_value = confirmed_value;
  measure.has_confirmed = true;

  res.status(200).json({ success: true });
};
