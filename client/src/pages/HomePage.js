import { useEffect, useState } from 'react';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts') // endpointini sen ayarlayabilirsin
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <div className="container">
      </div>
    </div>
  );
}
