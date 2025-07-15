import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../context/DarkModeContext';
import ManagementMenu from '../components/ManagementMenu';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

export default function Blog() {
  const { darkMode } = useContext(DarkModeContext);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Wedding Planning Tips',
      content: 'Here are some useful tips for planning your wedding...',
      featuredImage: null,
      categories: ['Tips', 'Planning'],
      publishDate: '2024-06-01',
      status: 'Published',
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    featuredImage: null,
    categories: '',
    publishDate: '',
    status: 'Draft',
  });

  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost((prev) => ({
        ...prev,
        featuredImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in all required fields.');
      return;
    }
    const id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const categoriesArray = newPost.categories.split(',').map((cat) => cat.trim()).filter((cat) => cat);
    setPosts([...posts, { ...newPost, id, categories: categoriesArray }]);
    setNewPost({
      title: '',
      content: '',
      featuredImage: null,
      categories: '',
      publishDate: '',
      status: 'Draft',
    });
  };

  const handleEditPost = (id) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setNewPost({
        ...post,
        categories: post.categories.join(', '),
      });
      setEditingId(id);
    }
  };

  const handleUpdatePost = () => {
    const categoriesArray = newPost.categories.split(',').map((cat) => cat.trim()).filter((cat) => cat);
    setPosts(posts.map((p) => (p.id === editingId ? { ...newPost, categories: categoriesArray } : p)));
    setNewPost({
      title: '',
      content: '',
      featuredImage: null,
      categories: '',
      publishDate: '',
      status: 'Draft',
    });
    setEditingId(null);
  };

  const handleDeletePost = (id) => {
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Content *</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows={6}
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Categories (comma separated)</label>
          <input
            type="text"
            name="categories"
            value={newPost.categories}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. Tips, Planning"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Publish Date</label>
          <input
            type="date"
            name="publishDate"
            value={newPost.publishDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={newPost.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Featured Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newPost.featuredImage && (
            <img src={newPost.featuredImage} alt="Featured" className="mt-2 max-h-40 object-cover rounded" />
          )}
        </div>
        <div>
          {editingId ? (
            <button
              onClick={handleUpdatePost}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Post
            </button>
          ) : (
            <button
              onClick={handleAddPost}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Post
            </button>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Posts</h2>
        {posts.length === 0 ? (
          <p>No posts added yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p>{post.content}</p>
                <p className="text-sm text-gray-600">Categories: {post.categories.join(', ')}</p>
                <p className="text-sm text-gray-600">Publish Date: {post.publishDate || 'N/A'}</p>
                <p className="mt-2 font-semibold">{post.status}</p>
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} className="mt-2 max-h-40 object-cover rounded" />
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
