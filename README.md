# Genetic Research Management System

A comprehensive database management system for genetic research data with integrated machine learning capabilities for breast cancer detection. This system addresses the challenges of managing vast genetic datasets by providing a unified platform for storing, retrieving, and analyzing genetic information including gene sequences, protein structures, disease associations, and research literature.

## 🎯 Project Overview

This project was developed to solve the critical problem of data fragmentation in genetic research laboratories. Traditional systems use standalone databases or spreadsheets, leading to inefficient analysis and poor data integration. Our solution combines relational and NoSQL database architectures to efficiently handle diverse genetic information while providing advanced analytical capabilities for disease prediction and research insights.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│   Express.js    │───▶│   PostgreSQL    │
│   (Frontend)    │    │   API Server    │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   ML Pipeline   │    │   Data Analysis │
                       │   (Python/SVM)  │    │   & Insights    │
                       └─────────────────┘    └─────────────────┘
```

## 🚀 Key Features

### Database Management
- **Normalized PostgreSQL Schema**: Implemented 3NF database design for optimal data integrity
- **Complex Relationship Modeling**: Genes ↔ Proteins ↔ Diseases ↔ Research Articles
- **Scalable Data Architecture**: Handles large-scale genetic datasets efficiently
- **Data Import/Export**: Support for CSV, JSON, and standard bioinformatics formats

### RESTful API Layer
- **Genetic Data Operations**: CRUD operations for genes, proteins, diseases, and organisms
- **Advanced Query Endpoints**: Cross-referencing genetic entities and associations
- **Literature Integration**: Direct linking of research articles to genetic data
- **Authentication & Authorization**: JWT-based security with role-based access control

### Machine Learning Integration
- **Breast Cancer Risk Prediction**: SVM classifier for early detection based on genetic markers
- **Feature Analysis**: Identification of contributing genetic factors for risk assessment
- **Performance Metrics**: Model accuracy tracking and validation workflows
- **Real-time Inference**: API endpoints for instant risk assessment

### Data Visualization & Analytics
- **Interactive Dashboards**: Real-time visualization of genetic associations
- **Network Analysis**: Protein interaction networks and genetic pathways
- **Statistical Insights**: Population genetics analysis and trend identification
- **Research Impact Tracking**: Citation analysis and research outcome metrics

## 🛠️ Technology Stack

**Backend Framework:**
- Node.js with Express.js for RESTful API development
- PostgreSQL for relational data storage with complex relationships
- Python integration for machine learning workflows

**Frontend Interface:**
- React.js with Material-UI for responsive user interface
- Chart.js for data visualization and interactive plots
- Redux for state management across complex data operations

**Machine Learning:**
- Python with scikit-learn for SVM implementation
- Pandas and NumPy for data preprocessing and feature engineering
- Matplotlib for model performance visualization

**Development Tools:**
- Git for version control and collaborative development
- JWT for secure authentication and session management
- bcrypt for password hashing and security

## 📊 Database Schema

### Core Entities

```sql
-- Genes table with sequence and functional information
CREATE TABLE genes (
    gene_id SERIAL PRIMARY KEY,
    gene_name VARCHAR(100) NOT NULL,
    chromosome VARCHAR(10),
    sequence TEXT,
    length INTEGER,
    function_description TEXT,
    organism_id INTEGER REFERENCES organisms(organism_id)
);

-- Proteins with structural and functional data
CREATE TABLE proteins (
    protein_id SERIAL PRIMARY KEY,
    protein_name VARCHAR(100) NOT NULL,
    protein_sequence TEXT,
    structure TEXT,
    function_description TEXT
);

-- Disease entities with symptoms and treatment information
CREATE TABLE diseases (
    disease_id SERIAL PRIMARY KEY,
    disease_name VARCHAR(100) NOT NULL,
    symptoms TEXT,
    treatment_options TEXT
);

-- Research articles linked to genetic entities
CREATE TABLE research_articles (
    article_id SERIAL PRIMARY KEY,
    article_name VARCHAR(200) NOT NULL,
    author VARCHAR(100),
    publication_date DATE,
    doi VARCHAR(100)
);
```

### Relationship Tables

```sql
-- Gene-Disease associations with confidence scores
CREATE TABLE gene_disease_associations (
    gene_id INTEGER REFERENCES genes(gene_id),
    disease_id INTEGER REFERENCES diseases(disease_id),
    association_strength DECIMAL(3,2),
    evidence_level VARCHAR(20),
    PRIMARY KEY (gene_id, disease_id)
);

-- Gene-Protein relationships
CREATE TABLE derives (
    gene_id INTEGER REFERENCES genes(gene_id),
    protein_id INTEGER REFERENCES proteins(protein_id),
    expression_level DECIMAL(5,2),
    PRIMARY KEY (gene_id, protein_id)
);
```

## 🔬 Machine Learning Pipeline

### Breast Cancer Risk Assessment

```python
class BreastCancerPredictor:
    def __init__(self):
        self.model = SVM(kernel='rbf', C=1.0, gamma='scale')
        self.feature_columns = [
            'age', 'menopause', 'tumor_size', 
            'inv_nodes', 'metastasis', 'history'
        ]
    
    def preprocess_data(self, patient_data):
        """Preprocess patient data for model input"""
        # Feature engineering and normalization
        processed = self.scaler.transform(patient_data)
        return processed
    
    def predict_risk(self, patient_data):
        """Predict breast cancer risk and contributing factors"""
        processed_data = self.preprocess_data(patient_data)
        risk_score = self.model.predict_proba(processed_data)
        contributing_factors = self.analyze_features(patient_data)
        
        return {
            'risk_level': 'High' if risk_score[0][1] > 0.5 else 'Low',
            'confidence': risk_score[0][1],
            'contributing_factors': contributing_factors
        }
```

## 🔌 API Endpoints

### Genetic Data Management
```http
# Get gene information with associated proteins and diseases
GET /api/genes/{gene_id}
Content-Type: application/json

Response:
{
  "gene_id": 1,
  "gene_name": "BRCA1",
  "chromosome": "17",
  "associated_proteins": [...],
  "associated_diseases": [...],
  "research_articles": [...]
}

# Create new gene-disease association
POST /api/associations/gene-disease
Content-Type: application/json

{
  "gene_id": 1,
  "disease_id": 5,
  "association_strength": 0.85,
  "evidence_level": "strong"
}
```

### Machine Learning Inference
```http
# Predict breast cancer risk
POST /api/ml/predict-cancer-risk
Content-Type: application/json

{
  "patient_data": {
    "age": 45,
    "menopause": 0,
    "tumor_size": 25,
    "inv_nodes": 2,
    "metastasis": 0,
    "history": 1
  }
}

Response:
{
  "risk_level": "High",
  "confidence": 0.78,
  "contributing_factors": [
    "tumor_size", "inv_nodes", "history"
  ]
}
```

## 📈 Performance Metrics

- **Database Performance**: Handles 10,000+ genetic entries with sub-second query times
- **API Response Time**: Average 150ms for complex genetic association queries
- **ML Model Accuracy**: 89% accuracy on breast cancer risk prediction validation set
- **Data Integrity**: 100% referential integrity maintained across all relationships
- **Scalability**: Successfully tested with datasets containing 50,000+ genetic records

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Python 3.8+ with pip

### Installation

```bash
# Clone repository
git clone https://github.com/art3mis0707/genetic-research-management.git
cd genetic-research-management

# Backend setup
cd backend
npm install
npm run setup-db  # Initialize PostgreSQL database

# Python ML environment
python -m venv ml_env
source ml_env/bin/activate  # On Windows: ml_env\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install

# Environment configuration
cp .env.example .env
# Edit .env with your database credentials
```

### Running the Application

```bash
# Start PostgreSQL service
sudo service postgresql start

# Run backend server
cd backend
npm run dev  # Runs on http://localhost:3001

# Run frontend (new terminal)
cd frontend
npm start    # Runs on http://localhost:3000

# Run ML service (new terminal)
cd ml_pipeline
python app.py  # Runs on http://localhost:5000
```

## 🧪 Database Population

```bash
# Load sample genetic data
cd backend
npm run seed-database

# Import research articles
python scripts/import_research_data.py

# Train ML model
cd ../ml_pipeline
python train_model.py
```

## 🔒 Security Features

- **Authentication**: JWT-based user authentication with role-based access
- **Data Protection**: bcrypt password hashing and SQL injection prevention
- **API Security**: Rate limiting and input validation on all endpoints
- **Database Security**: Prepared statements and parameterized queries
- **HTTPS**: SSL/TLS encryption for all data transmission

## 🏥 Biomedical Applications

### Clinical Decision Support
- **Risk Stratification**: Early identification of high-risk patients
- **Personalized Medicine**: Treatment recommendations based on genetic profiles
- **Population Health**: Large-scale genetic screening and analysis

### Research Applications
- **Biomarker Discovery**: Identification of novel genetic markers
- **Drug Target Identification**: Analysis of protein-disease relationships
- **Clinical Trial Optimization**: Patient selection based on genetic criteria

## 🤝 Contributing

This project demonstrates enterprise-level database design and machine learning integration suitable for biomedical research environments. The codebase follows industry best practices for healthcare data management and HIPAA compliance considerations.

## 📄 License

This project is developed for educational and research purposes. For commercial use in clinical settings, please ensure compliance with relevant healthcare data regulations.

---

**Key Technical Achievements:**
- ✅ Normalized database design (3NF) with complex relationship modeling
- ✅ RESTful API with comprehensive CRUD operations
- ✅ Machine learning integration for predictive analytics
- ✅ Real-time data processing and visualization
- ✅ Scalable architecture supporting large genetic datasets
- ✅ Security implementation suitable for healthcare applications
