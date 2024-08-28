import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getGeminiMeasure } from '../services/geminiService';
import { Measure } from '../models/measure';

const measures: Measure[] = []; // Mantido apenas para demonstração

export const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields'
    });
  }

  const existingMeasure = measures.find(
    m => m.customer_code === customer_code && m.measure_type === measure_type && 
         new Date(m.measure_datetime).getMonth() === new Date(measure_datetime).getMonth()
  );

  if (existingMeasure) {
    return res.status(409).json({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada'
    });
  }

  const measure_value = await getGeminiMeasure(image);
  const measure_uuid = uuidv4();
  const image_url = `https://images.service.com/${measure_uuid}`;

  const newMeasure: Measure = {
    measure_uuid,
    customer_code,
    measure_datetime: new Date(measure_datetime),
    measure_type,
    measure_value,
    has_confirmed: false,
    image_url
  };

  measures.push(newMeasure);

  res.status(200).json({
    image_url,
    measure_value,
    measure_uuid
  });
};
