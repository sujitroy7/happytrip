import Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:5173'),
  MONGODB_URI: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required(),
  GEMINI_API_KEY: Joi.string().allow('').optional(),
});

export function validate(config: Record<string, unknown>): Record<string, unknown> {
  const { error, value } = envSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
}
