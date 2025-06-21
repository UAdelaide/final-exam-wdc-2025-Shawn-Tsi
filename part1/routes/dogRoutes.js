router.get('/api/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.dog_id, d.name, d.size,
             u.username AS owner_username, u.email AS owner_email
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});