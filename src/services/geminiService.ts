import axios from 'axios';

export const getGeminiMeasure = async (image: string): Promise<number> => {
  const response = await axios.post('https://api.gemini.com/v1/vision/analyze', {
    image
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
    }
  });

  const measure_value = parseInt(response.data.text); 
  return measure_value;
};
