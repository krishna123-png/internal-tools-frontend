import React from 'react';
import './ResumeAnalyzer.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const ResumeAnalyzer = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('ai-internal-tools-token');
    const [feedback, setFeedback] = React.useState("AI's feedback will be displayed here..");
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    React.useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, []);

    async function handleSend() {
        try {
            setFeedback('');
            setLoading(true);
            setError('');
            setSuccess('');
            if (!file) {
                setError('Please provide your resume');
                return;
            }
            if (file && file.type !== 'application/pdf') {
                setError('The files you uploaded is not a pdf file. Please upload a pdf file')
            }
            const formdata = new FormData();
            formdata.append('file', file);
            const response = (await axios.post(
                `${import.meta.env.VITE_API_BASE}/api/tools/resume-analyze`,
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )).data.feedback;
            const parsed = typeof(response) === 'string' ? JSON.parse(response) : response;
            setFeedback(parsed)
            setSuccess('Ai analyzed your resume successfully!');
        }
        catch(error) {
            console.log(error);
            setError('Something went wrong');
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div className='resume-analyzer-wrapper'>
        <div className="resume-container">
            <h1 className="resume-title">Resume Analyzer</h1>

            <input onChange={(e) => setFile(e.target.files[0])} type="file" accept="application/pdf" className="resume-file" />

            <button onClick={handleSend} className="resume-submit">Analyze Resume</button>
            <p className={success ? "success" : "error"}>{success || error}</p>

            <div className="resume-output">
                {
                    loading ? <Loading /> : typeof(feedback) === 'string' ? feedback : 
                    <>
                        <div className='section'>
                            <strong>Strengths:</strong>
                            <ul>
                                {feedback.strengths.map((point, index) => {
                                    return (
                                        <li key={index}>
                                            {point}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='section'>
                            <strong>Suggestions:</strong>
                            <ul>
                                {feedback.suggestions.map((suggestion, index) => {
                                    return (
                                        <li key={index}>
                                            {suggestion}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    </div>
  );
};

export default ResumeAnalyzer;

