import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
  try {
    const mongoURI = `mongodb+srv://adityapachauri182003:OMWxFQwrfA3icOiN@cluster0.gz44y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`;

    client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; 
  }
};

export const getDbConnection = (dbName) => {
  if (!client) {
    throw new Error('Database not initialized. Call initializeDbConnection first.');
  }
  return client.db(dbName);
};
