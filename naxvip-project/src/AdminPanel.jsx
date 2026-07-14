import React, { useRef, useState } from "react";
import { Upload, RotateCcw, ArrowLeft, Check, Lock, Trash2, Plus, User, HelpCircle, X } from "lucide-react";
import { IMAGE_LABELS } from "./images";
import { FIELD_LABELS } from "./content";

// Only these images stay in the "Images" tab — category & product images
// are now managed together with their name/price/label in their own tabs.
const SITE_IMAGE_KEYS = ["logo", "hero", "summer", "crafted", "club"];

// Default admin credentials — used the very first time, or after "Reset credentials".
// Change these defaults any time by editing the values below.
const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "naxvip123",
  securityQuestion: "What city is your store based in?",
  securityAnswer: "samsi",
};
const CREDENTIALS_KEY = "naxvip_admin_credentials";
const AUTH_KEY = "naxvip_admin_authed";

function loadCredentials() {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (raw) return { ...DEFAULT_CREDENTIALS, ...JSON.parse(raw) };
  } catch (e) {}
  return DEFAULT_CREDENTIALS;
}

function saveCredentials(creds) {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  } catch (e) {}
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageCard({ id, label, src, onUpload, onReset }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      onUpload(id, dataUrl);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1500);
    } catch (err) {
      console.error(err);
      alert("Could not read that image, try another file.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-[#141210] border border-[#2a2620] rounded-xl overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-[#0b0a08]">
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#4a453d] text-xs">
            No image set
          </div>
        )}
        {justSaved && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="flex items-center gap-1.5 text-[#c9a876] text-sm font-medium">
              <Check size={16} /> Updated
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="text-[12px] text-[#e8ded0] leading-snug flex-1">{label}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-[11px] font-medium tracking-wide rounded-md py-2 transition-colors disabled:opacity-50"
          >
            <Upload size={13} /> {busy ? "Uploading…" : "Replace"}
          </button>
          <button
            type="button"
            title="Reset to original"
            onClick={() => onReset(id)}
            className="p-2 border border-[#2a2620] rounded-md text-[#8a8175] hover:text-[#c9a876] hover:border-[#c9a876] transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}

// Compact image uploader used inside product / category cards.
function MiniImageUpload({ src, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      console.error(err);
      alert("Could not read that image, try another file.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="relative aspect-[4/3] bg-[#0b0a08] rounded-md overflow-hidden group">
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#4a453d] text-[10px]">
          No image
        </div>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[#f5ede1] text-[11px] gap-1.5"
      >
        <Upload size={13} /> {busy ? "Uploading…" : "Replace"}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function TextField({ label, value, onChange, multiline, type = "text" }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] text-[#8a8175]">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876] resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
        />
      )}
    </label>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] tracking-[0.15em] px-4 py-2.5 rounded-md transition-colors ${
        active
          ? "bg-[#c9a876] text-[#0b0a08] font-medium"
          : "text-[#8a8175] hover:text-[#e8ded0] border border-[#2a2620]"
      }`}
    >
      {children}
    </button>
  );
}

function ForgotPasswordModal({ credentials, onClose, onReset }) {
  const [step, setStep] = useState("question"); // "question" -> "reset" -> "done"
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const checkAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === credentials.securityAnswer.trim().toLowerCase()) {
      setError("");
      setStep("reset");
    } else {
      setError("That answer doesn't match. Try again.");
    }
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setError("Password should be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    onReset(newPassword);
    setStep("done");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-sm bg-[#141210] border border-[#2a2620] rounded-xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-[#8a8175] hover:text-[#e8ded0]"
        >
          <X size={16} />
        </button>

        {step === "question" && (
          <form onSubmit={checkAnswer} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full border border-[#c9a876] flex items-center justify-center">
                <HelpCircle size={18} className="text-[#c9a876]" />
              </div>
              <h2 className="font-display text-lg">Security Question</h2>
              <p className="text-[11px] text-[#8a8175]">{credentials.securityQuestion}</p>
            </div>
            <input
              type="text"
              autoFocus
              value={answer}
              onChange={(e) => { setAnswer(e.target.value); setError(""); }}
              placeholder="Your answer"
              className="w-full bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
            />
            {error && <p className="text-[11px] text-red-400 -mt-2">{error}</p>}
            <button type="submit" className="w-full bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-sm font-medium rounded-md py-2.5 transition-colors">
              Verify Answer
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={submitNewPassword} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full border border-[#c9a876] flex items-center justify-center">
                <Lock size={18} className="text-[#c9a876]" />
              </div>
              <h2 className="font-display text-lg">Set New Password</h2>
              <p className="text-[11px] text-[#8a8175]">Choose a new password for your admin login.</p>
            </div>
            <input
              type="password"
              autoFocus
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
              placeholder="New password"
              className="w-full bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
              placeholder="Confirm new password"
              className="w-full bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
            />
            {error && <p className="text-[11px] text-red-400 -mt-2">{error}</p>}
            <button type="submit" className="w-full bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-sm font-medium rounded-md py-2.5 transition-colors">
              Save New Password
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center gap-3 text-center py-2">
            <div className="w-12 h-12 rounded-full border border-[#c9a876] flex items-center justify-center">
              <Check size={18} className="text-[#c9a876]" />
            </div>
            <h2 className="font-display text-lg">Password Updated</h2>
            <p className="text-[11px] text-[#8a8175]">You can now log in with your new password.</p>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-sm font-medium rounded-md py-2.5 transition-colors mt-2"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginGate({ onUnlock }) {
  const [credentials, setCredentials] = useState(loadCredentials);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (
      username.trim().toLowerCase() === credentials.username.trim().toLowerCase() &&
      password === credentials.password
    ) {
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch (e) {}
      onUnlock();
    } else {
      setError("Incorrect username or password.");
    }
  };

  const handlePasswordReset = (newPassword) => {
    const next = { ...credentials, password: newPassword };
    setCredentials(next);
    saveCredentials(next);
  };

  return (
    <div className="min-h-screen bg-[#0b0a08] text-[#f3ece0] flex items-center justify-center px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <form onSubmit={submit} className="w-full max-w-sm bg-[#141210] border border-[#2a2620] rounded-xl p-6 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-[#c9a876] flex items-center justify-center">
          <Lock size={18} className="text-[#c9a876]" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-lg">Admin Login</h1>
          <p className="text-[11px] text-[#8a8175] mt-1">Sign in to manage your NAX VIP site.</p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] text-[#8a8175] flex items-center gap-1.5">
              <User size={12} /> Username
            </span>
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="Username"
              className="w-full bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] text-[#8a8175] flex items-center gap-1.5">
              <Lock size={12} /> Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password"
              className="w-full bg-[#0b0a08] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
            />
          </label>
        </div>

        {error && <p className="text-[11px] text-red-400 -mt-1">{error}</p>}

        <button type="submit" className="w-full bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-sm font-medium rounded-md py-2.5 transition-colors">
          Log In
        </button>

        <button
          type="button"
          onClick={() => setShowForgot(true)}
          className="text-[11px] text-[#8a8175] hover:text-[#c9a876] transition-colors -mt-1"
        >
          Forgot password?
        </button>

        <a href="#" className="text-[11px] text-[#6b6255] hover:text-[#c9a876] flex items-center gap-1 mt-1">
          <ArrowLeft size={12} /> Back to site
        </a>
      </form>

      {showForgot && (
        <ForgotPasswordModal
          credentials={credentials}
          onClose={() => setShowForgot(false)}
          onReset={handlePasswordReset}
        />
      )}
    </div>
  );
}

export default function AdminPanel({
  images,
  updateImage,
  resetImage,
  resetAll,
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
}) {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch (e) {
      return false;
    }
  });
  const [tab, setTab] = useState("images");
  const [credentials, setCredentials] = useState(loadCredentials);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (e) {}
    setAuthed(false);
  };

  const handleCredentialsUpdate = (next) => {
    setCredentials(next);
    saveCredentials(next);
  };

  if (!authed) {
    return <LoginGate onUnlock={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0a08] text-[#f3ece0]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      <header className="border-b border-[#2a2620] bg-[#0f0e0c] sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-xl tracking-wide">{content.brand.name} — Admin Panel</h1>
            <p className="text-[11px] text-[#8a8175] mt-0.5">Changes save to this browser automatically.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset ALL images back to the original design? This can't be undone.")) {
                  resetAll();
                }
              }}
              className="flex items-center gap-1.5 text-[11px] text-[#8a8175] hover:text-red-400 border border-[#2a2620] hover:border-red-400/50 rounded-md px-3 py-2 transition-colors"
            >
              <Trash2 size={13} /> Reset Images
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset ALL text, products & categories back to the original design? This can't be undone.")) {
                  resetContent();
                }
              }}
              className="flex items-center gap-1.5 text-[11px] text-[#8a8175] hover:text-red-400 border border-[#2a2620] hover:border-red-400/50 rounded-md px-3 py-2 transition-colors"
            >
              <Trash2 size={13} /> Reset Content
            </button>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[11px] text-[#0b0a08] bg-[#c9a876] hover:bg-[#d9bc8e] rounded-md px-3 py-2 font-medium transition-colors"
            >
              <ArrowLeft size={13} /> Back to Site
            </a>
            <button
              type="button"
              onClick={() => {
                if (confirm("Log out of the admin panel?")) handleLogout();
              }}
              className="flex items-center gap-1.5 text-[11px] text-[#8a8175] hover:text-[#e8ded0] border border-[#2a2620] rounded-md px-3 py-2 transition-colors"
            >
              <Lock size={13} /> Log Out
            </button>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pb-4 flex items-center gap-2 flex-wrap">
          <TabButton active={tab === "images"} onClick={() => setTab("images")}>IMAGES</TabButton>
          <TabButton active={tab === "products"} onClick={() => setTab("products")}>PRODUCTS</TabButton>
          <TabButton active={tab === "categories"} onClick={() => setTab("categories")}>CATEGORIES</TabButton>
          <TabButton active={tab === "text"} onClick={() => setTab("text")}>TEXT & BANNERS</TabButton>
          <TabButton active={tab === "account"} onClick={() => setTab("account")}>ACCOUNT</TabButton>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {tab === "images" && <ImagesTab images={images} updateImage={updateImage} resetImage={resetImage} />}
        {tab === "products" && (
          <ProductsTab
            products={content.products}
            updateProduct={updateProduct}
            addProduct={addProduct}
            deleteProduct={deleteProduct}
          />
        )}
        {tab === "categories" && (
          <CategoriesTab
            categories={content.categories}
            updateCategory={updateCategory}
            addCategory={addCategory}
            deleteCategory={deleteCategory}
          />
        )}
        {tab === "text" && (
          <TextTab
            content={content}
            updateSection={updateSection}
            updateAnnouncement={updateAnnouncement}
            addAnnouncement={addAnnouncement}
            deleteAnnouncement={deleteAnnouncement}
          />
        )}
        {tab === "account" && (
          <AccountTab credentials={credentials} onUpdate={handleCredentialsUpdate} />
        )}
      </main>
    </div>
  );
}

function ImagesTab({ images, updateImage, resetImage }) {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876] mb-4">BRAND</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ImageCard id="logo" label={IMAGE_LABELS.logo} src={images.logo} onUpload={updateImage} onReset={resetImage} />
        </div>
      </section>

      <section>
        <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876] mb-4">SITE IMAGES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SITE_IMAGE_KEYS.filter((k) => k !== "logo").map((key) => (
            <ImageCard key={key} id={key} label={IMAGE_LABELS[key]} src={images[key]} onUpload={updateImage} onReset={resetImage} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProductsTab({ products, updateProduct, addProduct, deleteProduct }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876]">PRODUCTS</h2>
        <button
          type="button"
          onClick={addProduct}
          className="flex items-center gap-1.5 text-[11px] text-[#0b0a08] bg-[#c9a876] hover:bg-[#d9bc8e] rounded-md px-3 py-2 font-medium transition-colors"
        >
          <Plus size={13} /> Add Product
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-[#141210] border border-[#2a2620] rounded-xl overflow-hidden flex flex-col">
            <MiniImageUpload src={p.image} onChange={(dataUrl) => updateProduct(p.id, "image", dataUrl)} />
            <div className="p-3 flex flex-col gap-2">
              <input
                type="text"
                value={p.name}
                onChange={(e) => updateProduct(p.id, "name", e.target.value)}
                placeholder="Product name"
                className="bg-[#0b0a08] border border-[#2a2620] rounded-md px-2.5 py-1.5 text-xs text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
              />
              <input
                type="text"
                value={p.price}
                onChange={(e) => updateProduct(p.id, "price", e.target.value)}
                placeholder="Price (e.g. ₹999)"
                className="bg-[#0b0a08] border border-[#2a2620] rounded-md px-2.5 py-1.5 text-xs text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
              />
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                }}
                className="flex items-center justify-center gap-1.5 border border-[#2a2620] text-[#8a8175] hover:text-red-400 hover:border-red-400/50 text-[11px] rounded-md py-1.5 transition-colors"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesTab({ categories, updateCategory, addCategory, deleteCategory }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876]">CATEGORIES</h2>
        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-1.5 text-[11px] text-[#0b0a08] bg-[#c9a876] hover:bg-[#d9bc8e] rounded-md px-3 py-2 font-medium transition-colors"
        >
          <Plus size={13} /> Add Category
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-[#141210] border border-[#2a2620] rounded-xl overflow-hidden flex flex-col">
            <MiniImageUpload src={c.image} onChange={(dataUrl) => updateCategory(c.id, "image", dataUrl)} />
            <div className="p-3 flex flex-col gap-2">
              <input
                type="text"
                value={c.label}
                onChange={(e) => updateCategory(c.id, "label", e.target.value)}
                placeholder="Category label"
                className="bg-[#0b0a08] border border-[#2a2620] rounded-md px-2.5 py-1.5 text-xs text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
              />
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${c.label}"?`)) deleteCategory(c.id);
                }}
                className="flex items-center justify-center gap-1.5 border border-[#2a2620] text-[#8a8175] hover:text-red-400 hover:border-red-400/50 text-[11px] rounded-md py-1.5 transition-colors"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AccountTab({ credentials, onUpdate }) {
  const [username, setUsername] = useState(credentials.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(credentials.securityQuestion);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (currentPassword !== credentials.password) {
      setError("Current password is incorrect.");
      return;
    }

    const next = { ...credentials };
    if (username.trim()) next.username = username.trim();
    if (newPassword) {
      if (newPassword.length < 4) {
        setError("New password should be at least 4 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords don't match.");
        return;
      }
      next.password = newPassword;
    }
    if (securityQuestion.trim()) next.securityQuestion = securityQuestion.trim();
    if (securityAnswer.trim()) next.securityAnswer = securityAnswer.trim();

    onUpdate(next);
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setSecurityAnswer("");
    setSuccess("Account details updated successfully.");
  };

  return (
    <section>
      <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876] mb-4">ACCOUNT SETTINGS</h2>
      <form onSubmit={submit} className="max-w-md bg-[#141210] border border-[#2a2620] rounded-xl p-5 flex flex-col gap-4">
        <TextField label="Username" value={username} onChange={setUsername} />

        <div className="h-px bg-[#2a2620]" />

        <TextField
          label="Current Password (required to save changes)"
          value={currentPassword}
          onChange={setCurrentPassword}
          type="password"
        />
        <TextField
          label="New Password (leave blank to keep current)"
          value={newPassword}
          onChange={setNewPassword}
          type="password"
        />
        <TextField
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
        />

        <div className="h-px bg-[#2a2620]" />

        <TextField
          label="Security Question (used for Forgot Password)"
          value={securityQuestion}
          onChange={setSecurityQuestion}
        />
        <TextField
          label="Security Answer (leave blank to keep current)"
          value={securityAnswer}
          onChange={setSecurityAnswer}
        />

        {error && <p className="text-[11px] text-red-400">{error}</p>}
        {success && <p className="text-[11px] text-green-400">{success}</p>}

        <button
          type="submit"
          className="w-full bg-[#c9a876] hover:bg-[#d9bc8e] text-[#0b0a08] text-sm font-medium rounded-md py-2.5 transition-colors"
        >
          Save Account Settings
        </button>
      </form>
    </section>
  );
}

function TextTab({ content, updateSection, updateAnnouncement, addAnnouncement, deleteAnnouncement }) {
  const sections = ["brand", "hero", "summerBanner", "craftedBanner", "club", "newsletter", "footer"];
  const sectionTitles = {
    brand: "BRAND",
    hero: "HERO SECTION",
    summerBanner: "SUMMER EDIT BANNER",
    craftedBanner: "\"CRAFTED FOR THOSE\" BANNER",
    club: "VIP CLUB",
    newsletter: "NEWSLETTER",
    footer: "FOOTER",
  };

  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876]">ANNOUNCEMENT BAR</h2>
          <button
            type="button"
            onClick={addAnnouncement}
            className="flex items-center gap-1.5 text-[11px] text-[#0b0a08] bg-[#c9a876] hover:bg-[#d9bc8e] rounded-md px-3 py-2 font-medium transition-colors"
          >
            <Plus size={13} /> Add Item
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {content.announcements.map((a) => (
            <div key={a.id} className="flex items-center gap-2">
              <input
                type="text"
                value={a.text}
                onChange={(e) => updateAnnouncement(a.id, e.target.value)}
                className="flex-1 bg-[#141210] border border-[#2a2620] rounded-md px-3 py-2 text-sm text-[#f3ece0] focus:outline-none focus:border-[#c9a876]"
              />
              <button
                type="button"
                onClick={() => deleteAnnouncement(a.id)}
                className="p-2 border border-[#2a2620] rounded-md text-[#8a8175] hover:text-red-400 hover:border-red-400/50 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {sections.map((sectionKey) => (
        <section key={sectionKey}>
          <h2 className="text-[11px] tracking-[0.2em] text-[#c9a876] mb-4">{sectionTitles[sectionKey]}</h2>
          <div className="grid sm:grid-cols-2 gap-4 bg-[#141210] border border-[#2a2620] rounded-xl p-5">
            {Object.keys(content[sectionKey]).map((field) => (
              <TextField
                key={field}
                label={FIELD_LABELS[sectionKey]?.[field] ?? field}
                value={content[sectionKey][field]}
                multiline={field === "description" || field === "address"}
                onChange={(value) => updateSection(sectionKey, field, value)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
