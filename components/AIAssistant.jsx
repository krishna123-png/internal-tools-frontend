import React from 'react';
import './AIAssistant.css';
import axios from 'axios';
import { AuthContext } from '../src/App';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('ai-internal-tools-token');
    const { user } = React.useContext(AuthContext);
    const [prompt, setPrompt] = React.useState(''); 
    const [chats, setChats] = React.useState([]);
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
        e.preventDefault();
        try {
            if (!prompt.trim()) {
                return;
            }
            setLoading(true);
            setChats(prev => {
                return [
                    ...prev,
                    {
                        user: prompt.trim()
                    }
                ]
            });
            setPrompt('');
            const response = (await axios.post(
                `${import.meta.env.VITE_API_BASE}/api/tools/ai-assistant`,
                {
                    prompt
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )).data.reply;
            setChats(prev => {
                return [
                    ...prev,
                    {
                        ai: response
                    }
                ]
            });
        }
        catch(error) {
            console.log(error);
            setChats(prev => {
                return [
                    ...prev,
                    {
                        ai: 'Error fetch response!!!'
                    }
                ]
            })
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div className="assistant-container">
      <h2 className="assistant-title">AI Assistant</h2>

      <div className="chat-area">
        {
            chats.length !== 0 ?
            chats.map((chat, index) => {
                return (
                    <div className={`chat-bubble ${Object.keys(chat)[0]}`} key={index}>
                        {chat[Object.keys(chat)[0]]}
                    </div>
                )
            }) : null
        }
      </div>

      <div className="input-area">
        <input value={prompt} onChange={handleChange} type="text" placeholder="Ask me anything..." />
        <button onClick={handleSend} disabled={loading || !prompt.trim()} >Send</button>
      </div>
    </div>
  );
};

export default AIAssistant;

