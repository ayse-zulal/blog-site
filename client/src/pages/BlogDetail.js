import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Yükleniyor...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{blog.content}</p>
    </div>
  );
}

