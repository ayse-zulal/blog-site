import { useState } from "react";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null as File | null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Blog başarıyla oluşturuldu!");
      setTitle("");
      setContent("");
      setImage(null);
    } else {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Başlık:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>İçerik:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
      </div>

      <div>
        <label>Fotoğraf:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)
          }
        />
      </div>

      <button type="submit">Blogu Gönder</button>
    </form>
  );
}

export default PostForm;
