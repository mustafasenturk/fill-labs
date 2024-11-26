import { z } from 'zod';

export const documentSchema = z.object({
  mendatory: z
    .string()
    .min(1, { message: 'Bu alan zorunlu...' })
    .max(24, { message: 'Çok uzun...' }),
  text: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val)),
  numeric: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
    z.number({ message: 'Buraya sadece sayı girilebilir.' }).optional()
  ),
});
