import { useCallback, useState } from "react";
import { DEFAULT_CONTENT } from "./content";

const STORAGE_KEY = "naxvip_admin_content_v1";

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function writeStored(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error("Could not save content to localStorage:", e);
  }
}

export function loadContent() {
  const stored = readStored();
  if (!stored) return DEFAULT_CONTENT;
  // Shallow-merge top level so newly added default sections/fields
  // (e.g. after an app update) don't disappear for existing visitors.
  return { ...DEFAULT_CONTENT, ...stored };
}

function genId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function useContent() {
  const [content, setContent] = useState(loadContent);

  const persist = useCallback((next) => {
    setContent(next);
    writeStored(next);
  }, []);

  // ---- generic "object section" field updater ----
  // e.g. updateSection("hero", "titleLine1", "NEW TEXT")
  const updateSection = useCallback(
    (section, field, value) => {
      setContent((prev) => {
        const next = { ...prev, [section]: { ...prev[section], [field]: value } };
        writeStored(next);
        return next;
      });
    },
    []
  );

  // ---- announcements (array of {id, text}) ----
  const updateAnnouncement = useCallback((id, text) => {
    setContent((prev) => {
      const next = {
        ...prev,
        announcements: prev.announcements.map((a) => (a.id === id ? { ...a, text } : a)),
      };
      writeStored(next);
      return next;
    });
  }, []);

  const addAnnouncement = useCallback(() => {
    setContent((prev) => {
      const next = {
        ...prev,
        announcements: [...prev.announcements, { id: genId("ann"), text: "NEW ANNOUNCEMENT" }],
      };
      writeStored(next);
      return next;
    });
  }, []);

  const deleteAnnouncement = useCallback((id) => {
    setContent((prev) => {
      const next = { ...prev, announcements: prev.announcements.filter((a) => a.id !== id) };
      writeStored(next);
      return next;
    });
  }, []);

  // ---- categories (array of {id, label, image}) ----
  const updateCategory = useCallback((id, field, value) => {
    setContent((prev) => {
      const next = {
        ...prev,
        categories: prev.categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
      };
      writeStored(next);
      return next;
    });
  }, []);

  const addCategory = useCallback(() => {
    setContent((prev) => {
      const next = {
        ...prev,
        categories: [
          ...prev.categories,
          { id: genId("cat"), label: "NEW CATEGORY", image: null },
        ],
      };
      writeStored(next);
      return next;
    });
  }, []);

  const deleteCategory = useCallback((id) => {
    setContent((prev) => {
      const next = { ...prev, categories: prev.categories.filter((c) => c.id !== id) };
      writeStored(next);
      return next;
    });
  }, []);

  // ---- products (array of {id, name, price, image}) ----
  const updateProduct = useCallback((id, field, value) => {
    setContent((prev) => {
      const next = {
        ...prev,
        products: prev.products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
      };
      writeStored(next);
      return next;
    });
  }, []);

  const addProduct = useCallback(() => {
    setContent((prev) => {
      const next = {
        ...prev,
        products: [
          ...prev.products,
          { id: genId("prod"), name: "New Product", price: "₹0", image: null },
        ],
      };
      writeStored(next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setContent((prev) => {
      const next = { ...prev, products: prev.products.filter((p) => p.id !== id) };
      writeStored(next);
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setContent(DEFAULT_CONTENT);
  }, []);

  return {
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
  };
}
