import React, { useState } from 'react';
import TiptapEditor from './TipTapEditor.tsx';
import { useAuth } from '../auth/AuthContext.tsx'; 

export default function CreatePost() {
  const auth = useAuth();
  const user = auth?.user;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState(''); 
  const [image, setImage] = useState('');
  if (!user) {
     return <p>Bu sayfayı görüntülemek için giriş yapmalısınız.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    if (image) formData.append('cover_image', image);
    formData.append('user_id', user.id);
    console.log(formData.get('title'), formData.get('category'), formData.get('content'), formData.get('cover_image'), formData.get('user_id'));

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        category,
        content,
        cover_image: image, 
        user_id: user.id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Yeni Blog Yazısı Oluştur</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        required
        style={styles.input}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={styles.select}
      >
        <option value="">Kategori Seç</option>
        <option value="yemek">Yemek</option>
        <option value="kitap">Kitap</option>
        <option value="kişisel">Kişisel</option>
      </select>

      <div style={{ margin: '1rem 0', width: '100%' }}>
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <label style={styles.fileLabel}>
        Kapak Fotoğrafı URL'si
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ display: 'block', marginTop: '0.5rem' }}
          required
        />
      </label>

      {image && <p style={styles.fileName}>{image}</p>}

      <button type="submit" style={styles.submitBtn}>
        Yayınla
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '720px',
    margin: '2rem auto',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  } as const,
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#6b21a8'
  } as const,
  input: {
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  } as const,
  select: {
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#fff',
  } as const,
  fileLabel: {
    display: 'inline-block',
    padding: '10px 18px',
    backgroundColor: '#7c3aed',
    color: 'white',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    width: 'fit-content',
    userSelect: 'none',
  } as const,
  fileName: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#444',
    fontSize: '0.9rem',
  } as const,
  submitBtn: {
    marginTop: '1.5rem',
    padding: '14px',
    fontSize: '1.1rem',
    backgroundColor: '#6b21a8',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'background-color 0.3s ease',
  } as const,
};
