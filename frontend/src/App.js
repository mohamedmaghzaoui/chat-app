import React, { useEffect, useState } from 'react';
import { getData } from './services/api';

function App() {
    const [data, setData] = useState(null);
    console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Data from Laravel API</h1>
            {data ? (
                <pre>{data["message"]}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
