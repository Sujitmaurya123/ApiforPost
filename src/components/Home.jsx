

import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='heading'>
      <h1 className='headingbox'>Data from API</h1>
      <ul >
        {data.map((item, index) => (
           
            <div  className='postheading' key={index}>

                <p className='titlehead'>{item.title}</p> 
                <p >{item.body}</p> 
               <Link to={`about/${item.userId}`}>
               
               <User userId={item.id} />
               </Link>
              
            </div>
            

        ))}
      </ul>
    </div>
  );
};

const User = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        const userData = response.data;
        setUser(userData);
      })
      .catch(error => {
        console.error(`Error fetching user ${userId}:`, error);
      });
  }, [userId]);

  if (!user) return null;

  return <span>{user.name}</span>;
};

export default Home