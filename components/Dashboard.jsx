// Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../src/App';

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('ai-internal-tools-token');

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token]);
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome Back</h1>
        <p>Select a tool below to get started</p>
      </header>

      <div className="tool-grid">
        <NavLink to="/tools/ai-assistant" className="tool-card">
          <div className="icon">💬</div>
          <h3>AI Assistant</h3>
          <p>Chat, brainstorm, and get instant answers powered by AI.</p>
        </NavLink>

        <NavLink to="/tools/code-tool" className="tool-card">
          <div className="icon">🧠</div>
          <h3>Code Generator & Debugger</h3>
          <p>Generate or debug code snippets in any language.</p>
        </NavLink>

        <NavLink to="/tools/summarizer" className="tool-card">
          <div className="icon">📄</div>
          <h3>Document Summarizer</h3>
          <p>Get quick, concise summaries from long documents.</p>
        </NavLink>

        <NavLink to="/tools/resume-analyzer" className="tool-card">
          <div className="icon">📊</div>
          <h3>Resume Analyzer</h3>
          <p>Evaluate and improve resumes with smart AI analysis.</p>
        </NavLink>
      </div>
    </div>
  );
}

