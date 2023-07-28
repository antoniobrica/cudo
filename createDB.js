const sql = require('mssql');

(async () => {
  try {
    const config = {
      server: 'localhost',
      port: 1433,
      user: 'sa',
      password: 'YourStrong!Password',
      database: 'master',
      options: {
        encrypt: true, // Set to false if not using Azure SQL
        trustServerCertificate: true, // Trust self-signed certificate
      },
    };

    await sql.connect(config);
    console.log('Connected');

    await sql.query`CREATE DATABASE accounts`;
    console.log("Created 'accounts' database.");

    // Create 'tasks' database
    await sql.query`CREATE DATABASE tasks`;
    console.log("Created 'tasks' database.");

    await sql.query`CREATE DATABASE costs`;
    console.log("Created 'costs' database.");

    await sql.query`CREATE DATABASE documents`;
    console.log("Created 'documents' database.");

    await sql.query`CREATE DATABASE meetings`;
    console.log("Created 'meetings' database.");

    await sql.query`CREATE DATABASE projects`;
    console.log("Created 'projects' database.");

    
  } catch (err) {
    console.error(err);
  }
})();
