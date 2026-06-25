const { Pool } = require('pg')

const pool = new Pool({
    connectionString: 'postgresql://found_and_lost_user:z3unhqjSXfo1Ot4aVHo30FDJBwGQSHUJ@dpg-d8ucrp80697c73ev9d3g-a.oregon-postgres.render.com/found_and_lost',
    ssl: { rejectUnauthorized: false }
})

module.exports = pool;