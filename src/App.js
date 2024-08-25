import React, { useState } from 'react';
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [filterOptions, setFilterOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await axios.post('https://bajajapi-pezc.onrender.com/bfhl', { data: parsedInput.data });
            setResponseData(response.data);
        } catch (error) {
            console.error('Invalid JSON or API error:', error);
        }
    };

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        setFilterOptions(prev => checked ? [...prev, value] : prev.filter(option => option !== value));
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON'
                style={styles.textarea}
            />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>
            {responseData && (
                <div>
                    <label>
                        <input type="checkbox" value="Alphabets" onChange={handleFilterChange} />
                        Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="Numbers" onChange={handleFilterChange} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="HighestLowercaseAlphabet" onChange={handleFilterChange} />
                        Highest Lowercase Alphabet
                    </label>
                    <div>
                        {filterOptions.includes('Alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
                        {filterOptions.includes('Numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
                        {filterOptions.includes('HighestLowercaseAlphabet') && <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
  container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#f7f7f7',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
  },
  title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333'
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
  },
  textarea: {
      width: '100%',
      height: '100px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '20px'
  },
  button: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
  },
  buttonHover: {
      backgroundColor: '#45a049'
  },
  error: {
      color: 'red',
      marginTop: '10px'
  },
  responseContainer: {
      marginTop: '30px',
      textAlign: 'left'
  },
  responseTitle: {
      fontSize: '20px',
      color: '#333'
  },
  response: {
      backgroundColor: '#e8e8e8',
      padding: '10px',
      borderRadius: '4px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
  }
};
export default App;
