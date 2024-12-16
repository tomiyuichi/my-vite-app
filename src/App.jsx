import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutoMPGTable from './components/AutoMPGTable';     // テーブル一覧表示ページ
import CSVUploader from "./components/CSVUploader"; // CSVアップロードページ
import HomePage from './components/HomePage';       // ホームページ

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/tables">Auto MPG Table</a></li>
                        <li><a href="/upload">Upload CSV</a></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tables" element={<AutoMPGTable />} />
                    <Route path="/upload" element={<CSVUploader />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;



