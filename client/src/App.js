import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import BlogDetail from './pages/BlogDetail';
import CreatePostPage from './pages/CreatePostPage.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}
