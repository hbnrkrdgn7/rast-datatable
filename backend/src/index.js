const express = require('express');
const cors = require('cors');
const accountsRoutes = require('./routes/accounts');

const app = express();
app.use(cors());
app.use(express.json());

// Accounts route
app.use('/api/accounts', accountsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
