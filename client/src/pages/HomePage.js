import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts') // endpointini sen ayarlayabilirsin
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
      </div>
    </div>
  );
}
