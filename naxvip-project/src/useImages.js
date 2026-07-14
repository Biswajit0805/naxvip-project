import { useCallback, useState } from "react";
import { DEFAULT_IMAGES } from "./images";

const STORAGE_KEY = "naxvip_admin_images_v1";

function readOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    // storage full or unavailable — fail silently, in-memory state still works
    console.error("Could not save image to localStorage:", e);
  }
}

export function loadImages() {
  return { ...DEFAULT_IMAGES, ...readOverrides() };
}

export function useImages() {
  const [images, setImages] = useState(loadImages);

  const updateImage = useCallback((key, dataUrl) => {
    setImages((prev) => {
      const next = { ...prev, [key]: dataUrl };
      const overrides = readOverrides();
      overrides[key] = dataUrl;
      writeOverrides(overrides);
      return next;
    });
  }, []);

  const resetImage = useCallback((key) => {
    setImages((prev) => {
      const next = { ...prev, [key]: DEFAULT_IMAGES[key] };
      const overrides = readOverrides();
      delete overrides[key];
      writeOverrides(overrides);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setImages(DEFAULT_IMAGES);
  }, []);

  return { images, updateImage, resetImage, resetAll };
}
