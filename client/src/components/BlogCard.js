import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div style={{ width: '300px', margin: '1rem', textDecoration: 'none', color: 'black' }}>
      <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '8px' }} />
        <h3 style={{ marginTop: '0.5rem', fontFamily: 'Georgia' }}>{blog.title}</h3>
        <p style={{ color: '#777' }}>{blog.preview}</p>
      </Link>
    </div>
  );
};

export default BlogCard;
