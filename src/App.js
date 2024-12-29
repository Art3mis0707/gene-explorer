import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
// import OverviewTiles from "./components/DashBoard/OverviewTiles";
import SearchBar from "./components/DashBoard/SearchBar";
import PieChart from "./components/DashBoard/PieChart";

import GeneViewer from "./components/GeneDetails/GeneViewer";
import RelatedProteins from "./components/GeneDetails/RelatedProteins";
import RelatedDiseases from "./components/GeneDetails/RelatedDiseases";

import Protein3DViewer from "./components/ProteinExplorer/Protein3DViewer";

import DiseaseList from "./components/DiseaseTracker/DiseaseList";
import SearchSymptoms from "./components/DiseaseTracker/SearchSymptoms";
import DiseaseDetails from "./components/DiseaseTracker/DiseaseDetails";

import ArticleList from "./components/ResearchArticles/ArticleList";
import ArticleDetails from "./components/ResearchArticles/ArticleDetails";

import GeneDiseaseGraph from "./components/Analytics/GeneDiseaseGraph";
import MutationTimeline from "./components/Analytics/MutationTimeLine";
import OrganismGeneTree from "./components/Analytics/OrganismGeneTree";

import FileUploader from "./components/DataUpload/FileUploader";
import PreviewData from "./components/DataUpload/PreviewData";

import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";

import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Dashboard */}
          {/* <Route path="/" element={<OverviewTiles stats={{ genes: 100, proteins: 200, diseases: 50, organisms: 30, articles: 120 }} />}></Route> */}
          <Route path="/" element={<HomePage />} />
          <Route path="search" element={<SearchBar />} />
          <Route path="pie-chart" element={<PieChart />} />

          {/* Gene Details */}
          <Route path="/genes/viewer" element={<GeneViewer />} />
          <Route path="/genes/related-proteins" element={<RelatedProteins />} />
          <Route path="/genes/related-diseases" element={<RelatedDiseases />} />

          {/* Protein Explorer */}
          <Route path="/proteins/details" element={<RelatedProteins />} />
          <Route path="/proteins/3d-viewer" element={<Protein3DViewer proteinStructure="PDB_DATA" />} />

          {/* Disease Tracker */}
          <Route path="/diseases/list" element={<DiseaseList />} />
          <Route path="/diseases/search-symptoms" element={<SearchSymptoms />} />
          <Route path="/diseases/details" element={<DiseaseDetails />} />

          {/* Research Articles */}
          <Route path="/articles/list" element={<ArticleList />} />
          <Route path="/articles/details" element={<ArticleDetails />} />

          {/* Analytics */}
          <Route path="/analytics/gene-disease-graph" element={<GeneDiseaseGraph />} />
          <Route path="/analytics/mutation-timeline" element={<MutationTimeline />} />
          <Route path="/analytics/organism-gene-tree" element={<OrganismGeneTree />} />

          {/* Data Upload */}
          <Route path="/data/upload" element={<FileUploader />} />
          <Route path="/data/preview" element={<PreviewData />} />

          {/* User Management */}
          <Route path="/login" element={<Login onLogin={(data) => console.log("User logged in:", data)} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
