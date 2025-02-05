// app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Mount your other routes (e.g., if you have a route for predefined gene sequences)
// const geneRoutes = require('./routes/geneRoutes');
// app.use('/api/genes', geneRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const geneRoutes = require('./routes/geneRoutes');
app.use('/api/genes', geneRoutes);

// Mount the extended gene routes
const extendedGeneRoutes = require('./routes/extendedGeneRoutes');
app.use('/api/genes', extendedGeneRoutes);

const organismResearchRoutes = require("./routes/organismResearchRoutes");
app.use("/api/organism-research", organismResearchRoutes);


const organismRoutes = require("./routes/organismRoutes");
app.use("/api/organisms", organismRoutes);

const proteinRoutes = require('./routes/proteinRoutes');
app.use('/api/proteins', proteinRoutes);

const proteinDetRoutes = require('./routes/proteinDetRoutes');
app.use('/api/proteins-det', proteinDetRoutes);

const diseasesDataRoutes = require('./routes/diseaseDataRoutes');
app.use('/api/diseases-data', diseasesDataRoutes);

module.exports = app;


