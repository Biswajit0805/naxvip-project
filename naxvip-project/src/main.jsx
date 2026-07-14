import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AdminPanel from "./AdminPanel.jsx";
import { useImages } from "./useImages.js";
import { useContent } from "./useContent.js";
import "./index.css";

function Root() {
  const { images, updateImage, resetImage, resetAll } = useImages();
  const {
    content,
    updateSection,
    updateAnnouncement,
    addAnnouncement,
    deleteAnnouncement,
    updateCategory,
    addCategory,
    deleteCategory,
    updateProduct,
    addProduct,
    deleteProduct,
    resetContent,
  } = useContent();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#admin") {
    return (
      <AdminPanel
        images={images}
        updateImage={updateImage}
        resetImage={resetImage}
        resetAll={resetAll}
        content={content}
        updateSection={updateSection}
        updateAnnouncement={updateAnnouncement}
        addAnnouncement={addAnnouncement}
        deleteAnnouncement={deleteAnnouncement}
        updateCategory={updateCategory}
        addCategory={addCategory}
        deleteCategory={deleteCategory}
        updateProduct={updateProduct}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
        resetContent={resetContent}
      />
    );
  }

  return <App images={images} content={content} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
