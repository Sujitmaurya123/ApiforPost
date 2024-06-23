import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentComponent from './Comment'; // Adjust the path accordingly

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByUserName, setSortByUserName] = useState(false); // State for sorting by user.name
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order
  const [filterByUsername, setFilterByUsername] = useState(''); // State for filtering by user.name
  const [selectedPostId, setSelectedPostId] = useState(null); // To track which post's comments to show

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');

        // Fetch users
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

        // Map users to an object for quick lookup
        const usersMap = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        // Combine posts with user data
        const postsWithData = postsResponse.data.map(post => ({
          ...post,
          user: usersMap[post.userId] // Add user info to each post
        }));

        // Set state
        setPosts(postsWithData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleFilterByUsernameChange = (event) => {
    setFilterByUsername(event.target.value);
  };

  const handleSortByUserName = () => {
    setSortByUserName(!sortByUserName);
  };

  const handleToggleComments = (postId) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  const sortedFilteredPosts = [...posts]; // Create a copy of posts array to avoid mutating state

  // Filter posts based on filterByUsername
  const filteredPosts = sortedFilteredPosts.filter(post => {
    return post.user.name.toLowerCase().includes(filterByUsername.toLowerCase());
  });

  // Sort by user.name if sortByUserName is true
  if (sortByUserName) {
    filteredPosts.sort((a, b) => {
      const nameA = a.user.name.toUpperCase();
      const nameB = b.user.name.toUpperCase();

      if (nameA < nameB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='heading'>
      <div>
        <h1 className='headingbox'>Data from API</h1>
        <div>
          <button onClick={handleSortByUserName}>Sort by Author</button>
          <input type="text" value={filterByUsername} onChange={handleFilterByUsernameChange} placeholder="Filter by author..." />
        </div>
      </div>
      <ul>
        {filteredPosts.map((post, index) => (
          <div className='postheading' key={index}>
            <p className='titlehead'>{post.title}</p>
            <p>{post.body}</p>
            <p>
                {post.user.name} {/* Add a comment here */}
            </p>
            {/* Button to show or hide comments */}
            <button onClick={() => handleToggleComments(post.id)}>
              {selectedPostId === post.id ? 'Hide Comments' : 'Show Comments'}
            </button>
            {/* Show comments if post id matches selectedPostId */}
            {selectedPostId === post.id && <CommentComponent postId={post.id} />}
            <Link to={`about/${post.userId}`}>
              <span>View More</span>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
