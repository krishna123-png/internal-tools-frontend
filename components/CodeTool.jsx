// CodeTool.jsx (UI Only)
import React from 'react';
import './CodeTool.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../src/App';
import Loading from './Loading';

const CodeTool = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('ai-internal-tools-token');
    const { user } = React.useContext(AuthContext);
    const [prompt, setPrompt] = React.useState('');
    const [response, setResponse] = React.useState('Your code output will be displayed here...');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    function handleChange(e) {
        setPrompt(e.target.value);
    }

    async function handleSend(e) {
        try {
            setResponse('');
            setLoading(true);
            const aiReply = (await axios.post(
                `${import.meta.env.VITE_API_BASE}/api/tools/code-tool`,
                {
                    prompt
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )).data.reply;
            setResponse(aiReply);
            setPrompt('');
        }
        catch (error) {
            console.log(error)
            setResponse('Something wene wrong!');
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <div className='code-tool-wrapper'>
        <div className="code-tool-container">
            <h1 className="code-tool-title">Code Generator / Debugger</h1>

            <textarea
                className="code-tool-input"
                placeholder="Enter your code or prompt here"
                value={prompt}
                rows={8}
                onChange={handleChange}
            ></textarea>

            <button onClick={handleSend} className="code-tool-send">Send</button>

            <div className="code-tool-output">
                <code>
                    { loading? <Loading /> : response}
                </code>
            </div>
        </div>
    </div>
  );
};

export default CodeTool;

