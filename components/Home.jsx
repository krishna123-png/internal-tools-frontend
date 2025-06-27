import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import homeLogo from '../src/assets/internal-tools-logo.png'; // Replace with actual image path
import { AuthContext } from '../src/App';

export default function Home() {
    const { user } = React.useContext(AuthContext);
    console.log(user)
    return (
        <div className="homepage-wrapper">
            <header className="homepage-header">
                <div className="logo">{'>'}</div>
                { user ? 
                <div className='auth-links'>
                    <NavLink to="/profile">Profile</NavLink>
                </div> :
                <div className="auth-links">
                    <NavLink to="/login">Log in</NavLink>
                    <NavLink to="/register" className="register">Register</NavLink>
                </div>
                }
            </header>

            <section className="hero-section">
                <div className="hero-text">
                    <h1>All-in-One AI Tools for Developers & Teams</h1>
                    <p>Empower your workflow with smart assistants, code generation, and document intelligence.</p>
                    {user ? <NavLink to="/tools" className="start-btn">Start for Free</NavLink> : 
                            <NavLink to="/register" className="start-btn">Start for Free</NavLink>}
                </div>
                <div className="hero-image">
                    <img src={homeLogo} alt="AI Tool Illustration" />
                </div>
            </section>

            <section className="features-section">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>🧠 AI Assistant</h3>
                        <p>Manage chats, get answers, and brainstorm ideas instantly.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🛠 Code Generator & Debugger</h3>
                        <p>Generate code snippets, debug issues, and streamline development.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📄 Document Summarizer</h3>
                        <p>Upload PDFs or text documents to get AI-powered summaries.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📊 Resume Analyzer</h3>
                        <p>Get actionable insights to improve your resume's quality and impact.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
