export interface AppConfig {
  nodeEnv: string;
  port: number;
  frontendUrl: string;
  mongodbUri: string;
  geminiApiKey: string;
}

export default (): { app: AppConfig } => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    mongodbUri:
      process.env.MONGODB_URI || 'mongodb://localhost:27017/happytrip',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
  },
});
