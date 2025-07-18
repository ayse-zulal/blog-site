import PostForm from "../components/PostForm.tsx";

function CreatePostPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Yeni Blog Yazısı</h1>
      <PostForm />
    </div>
  );
}

export default CreatePostPage;
