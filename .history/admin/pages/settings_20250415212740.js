import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    darkModeEnabled: true,
    logo: null,
    favicon: null,
    siteTitle: 'My Wedding Site',
    seoMetaTitle: 'Best Wedding Planning Services',
    seoMetaDescription: 'We provide the best wedding planning services for your special day.',
    adminPassword: '',
  });

  const [newLogo, setNewLogo] = useState(null);
  const [newFavicon, setNewFavicon] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLogo(URL.createObjectURL(file));
      setSettings((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFavicon(URL.createObjectURL(file));
      setSettings((prev) => ({ ...prev, favicon: URL.createObjectURL(file) }));
    }
  };

  const handlePasswordChange = (e) => {
    setSettings((prev) => ({ ...prev, adminPassword: e.target.value }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved (mock implementation).');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings Management</h1>

      <section className="mb-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="darkModeEnabled"
            checked={settings.darkModeEnabled}
            onChange={handleInputChange}
          />
          <span>Enable Dark Mode Globally</span>
        </label>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Logo</h2>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {newLogo && <img src={newLogo} alt="Logo" className="mt-2 max-h-20 object-contain" />}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Favicon</h2>
        <input type="file" accept="image/*" onChange={handleFaviconChange} />
        {newFavicon && <img src={newFavicon} alt="Favicon" className="mt-2 max-h-10 object-contain" />}
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">Site Title</label>
        <input
          type="text"
          name="siteTitle"
          value={settings.siteTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">SEO Meta Title</label>
        <input
          type="text"
          name="seoMetaTitle"
          value={settings.seoMetaTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">SEO Meta Description</label>
        <textarea
          name="seoMetaDescription"
          value={settings.seoMetaDescription}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-1">Admin Password Reset</label>
        <input
          type="password"
          name="adminPassword"
          value={settings.adminPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded"
          placeholder="Enter new password"
        />
      </section>

      <button
        onClick={handleSaveSettings}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
