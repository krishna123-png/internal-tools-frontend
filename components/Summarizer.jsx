import React from 'react';
import './Summarizer.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

const Summarizer = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('ai-internal-tools-token');

    const [text, setText] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [summary, setSummary] = React.useState('AI\'s output will be displayed here');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token]);

    async function handleSend() {
        try {
                setSummary('')
                setLoading(true)
                if (!text && !file) {
                    return alert('Please enter text or upload a pdf');
                }

                if (text && !file) {
                    const response = (await axios.post(
                        `${import.meta.env.VITE_API_BASE}/api/tools/summarize`,
                        {
                            text: text.trim()
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )).data.summary;
                    setSummary(response)
                    setText('');
                }

                if (!text && file) {
                    const formdata = new FormData();
                    formdata.append('file', file);
                    const response = (await axios.post(
                        `${import.meta.env.VITE_API_BASE}/api/tools/summarize`,
                        formdata,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )).data.summary;

                    setSummary(response);
                }

                if (text && file) {
                    return alert("You can't enter text and upload a pdf file at the same time.");
                }
            }
            catch (error) {
                console.log(error);
                setSummary('Something went wrong');
            }
            finally {
                setLoading(false);
            }
    }

  return (
    <div className='summarizer-wrapper'>
        <div className="summarizer-container">
            <h1 className="summarizer-title">Document Summarizer</h1>

            <textarea
                className="summarizer-input"
                placeholder="Please enter text or upload a PDF file"
                rows={8}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="summarizer-divider">OR</div>

            <input onChange={(e) => setFile(e.target.files[0])} type="file" accept="application/pdf" className="summarizer-file" />

            <button disabled={loading} onClick={handleSend} className="summarizer-submit">Summarize</button>

            <div className="summarizer-output">
                {
                    loading ? <Loading /> : summary
                }
            </div>
        </div>
    </div>
  );
};

export default Summarizer;

