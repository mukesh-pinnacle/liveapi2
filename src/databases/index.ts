// for server
// mport { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } from '@config';

// export const dbConnection = {
//   url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
//   options: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// };

// for Local DB
import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
