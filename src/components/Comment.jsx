import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentComponent = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.name}</strong></p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentComponent;
