import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const About = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        const postData = response.data;
        setPost(postData);
        
        axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
          .then(response => {
            const userData = response.data;
            setUser(userData);
          })
          .catch(error => {
            console.error(`Error fetching user ${postData.userId}:`, error);
          });

        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then(response => {
            const commentsData = response.data;
            setComments(commentsData);
          })
          .catch(error => {
            console.error(`Error fetching comments for post ${postId}:`, error);
          });
      })
      .catch(error => {
        console.error(`Error fetching post ${postId}:`, error);
      });
  }, [postId]);

  if (!post || !user) return <p>Loading...</p>;

  return (
    <div  className='postheading'>
     
      <p>Created by: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>   
          
        
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.name}</strong> - {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
