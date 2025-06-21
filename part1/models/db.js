const mysql=require('mysql2/promise');

const pool = mysql.createPool({
  host:     'localhost',
  user:     'root',
  password: '',            // your MySQL root password (if any)
  database: 'DogWalkService',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});