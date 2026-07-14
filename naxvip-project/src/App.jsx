
import React from "react";
import {
  Truck,
  Search,
  User,
  Heart,
  ShoppingBag,
  Phone,
  ShieldCheck,
  Gem,
  Headphones,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Users,
  Package,
  Award,
  Smile,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";
import { DEFAULT_IMAGES } from "./images";
import { DEFAULT_CONTENT } from "./content";

// Announcement bar cycles through these icons in order — purely decorative,
// so we don't need to store an icon choice per editable announcement item.
const ANNOUNCEMENT_ICONS = [Truck, ShieldCheck, RotateCcw, Users, Phone];

export default function NaxVipHomepage({ images = DEFAULT_IMAGES, content = DEFAULT_CONTENT }) {
  const { brand, announcements, hero, categories, summerBanner, products, craftedBanner, club, newsletter, footer } = content;
  return (
    <div className="bg-[#0b0a08] text-[#f3ece0] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@600;700&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-script { font-family: 'Dancing Script', cursive; }
      `}</style>
      {/* ===== Top Announcement Bar ===== */}
      <div className="bg-[#f4e3cc] text-[#3a2c1c] text-[10px] sm:text-xs tracking-wide">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 px-4">
          {announcements.map((a, i) => {
            const Icon = ANNOUNCEMENT_ICONS[i % ANNOUNCEMENT_ICONS.length];
            return (
              <span key={a.id} className="flex items-center gap-1.5">
                <Icon size={13} strokeWidth={1.8} /> {a.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* ===== Header / Nav ===== */}
      <header className="bg-[#0f0e0c] border-b border-[#2a2620]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            {images.logo ? (
              <img src={images.logo} alt="NAX VIP" className="w-9 h-9 object-contain rounded-full" />
            ) : (
              <div className="w-9 h-9 border border-[#c9a876] rounded-full flex items-center justify-center">
                <span className="font-display text-[#c9a876] text-lg leading-none">N</span>
              </div>
            )}
            <div className="leading-tight">
              <div className="font-display text-lg tracking-wide">{brand.name}</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.15em] text-[#e8ded0]">
            <a href="#" className="hover:text-[#c9a876] transition-colors">MEN</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">WOMEN</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">KIDS</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">ACCESSORIES</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">COLLECTIONS</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">SALE</a>
            <a href="#" className="hover:text-[#c9a876] transition-colors">NEW ARRIVALS</a>
          </nav>

          <div className="flex items-center gap-5 text-[#e8ded0]">
            <Search size={17} strokeWidth={1.6} className="cursor-pointer hover:text-[#c9a876]" />
            <User size={17} strokeWidth={1.6} className="cursor-pointer hover:text-[#c9a876]" />
            <Heart size={17} strokeWidth={1.6} className="cursor-pointer hover:text-[#c9a876]" />
            <div className="relative cursor-pointer hover:text-[#c9a876]">
              <ShoppingBag size={17} strokeWidth={1.6} />
              <span className="absolute -top-2 -right-2 bg-[#c9a876] text-[#0b0a08] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] sm:h-[520px] md:h-[600px]">
          <img
            src={images.hero}
            alt="Timeless. Confident. You."
            className="absolute inset-0 w-full h-full object-cover object-[70%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/70 to-transparent" />

          <div className="relative max-w-[1400px] mx-auto h-full px-6 flex flex-col justify-center">
            <p className="text-[#c9a876] text-[11px] tracking-[0.3em] mb-3">{hero.eyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-[#f5ede1]">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
              <br />
              <span className="font-script text-[#c9a876] text-5xl sm:text-6xl md:text-7xl align-middle">{hero.titleScript}</span>
            </h1>
            <p className="mt-5 text-[#cfc4b3] text-sm max-w-xs">
              {hero.subtitle}
            </p>
            <button className="mt-7 w-fit bg-[#f4dcb9] text-[#0b0a08] text-[11px] tracking-[0.15em] font-semibold px-6 py-3 flex items-center gap-2 hover:bg-[#fbe9cd] transition-colors">
              {hero.ctaText} <ArrowRight size={14} />
            </button>
          </div>

          {/* slide indicator */}
          <div className="hidden sm:flex flex-col items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-[#cfc4b3] tracking-widest">
            <span>01</span>
            <span className="w-px h-10 bg-[#4a4438]" />
            <span>05</span>
          </div>

          <button className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#4a4438] items-center justify-center text-[#e8ded0] hover:border-[#c9a876] hover:text-[#c9a876] transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="hidden sm:flex absolute right-16 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#4a4438] items-center justify-center text-[#e8ded0] hover:border-[#c9a876] hover:text-[#c9a876] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== Features Bar (floating card overlapping hero) ===== */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 -mt-8 sm:-mt-9">
        <div className="bg-[#141210] border border-[#2a2620] rounded-lg shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#2a2620]">
            {[
              { icon: Truck, title: "FREE DELIVERY", sub: "Above ₹999" },
              { icon: RotateCcw, title: "EASY RETURNS", sub: "7 Days Hassle Free" },
              { icon: Gem, title: "PREMIUM QUALITY", sub: "Finest Fabrics" },
              { icon: ShieldCheck, title: "SECURE PAYMENTS", sub: "100% Safe Checkout" },
              { icon: Headphones, title: "CUSTOMER SUPPORT", sub: "24x7 Support" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-5 justify-center sm:justify-start">
                <f.icon size={20} strokeWidth={1.4} className="text-[#c9a876] shrink-0" />
                <div>
                  <div className="text-[10px] tracking-wider text-[#f0e8db]">{f.title}</div>
                  <div className="text-[10px] text-[#8a8175]">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Shop by Category ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pt-14 pb-16">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="w-10 h-px bg-[#4a4438]" />
          <h2 className="text-[13px] tracking-[0.3em] text-[#cfc4b3]">SHOP BY CATEGORY</h2>
          <span className="w-10 h-px bg-[#4a4438]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="relative h-64 sm:h-72 overflow-hidden group cursor-pointer">
              <img
                src={c.image}
                alt={c.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[13px] tracking-[0.1em] text-[#f5ede1] mb-1">{c.label}</p>
                <span className="text-[10px] tracking-[0.15em] text-[#c9a876] flex items-center gap-1">
                  EXPLORE <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Summer Edit Banner ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={images.summer} alt="Summer Edit '24" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/50 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-8 max-w-sm">
            <p className="text-[#c9a876] text-[10px] tracking-[0.25em] mb-2">{summerBanner.eyebrow}</p>
            <h3 className="font-display text-3xl sm:text-4xl text-[#f5ede1] mb-2">{summerBanner.title}</h3>
            <p className="text-[#cfc4b3] text-sm mb-6">{summerBanner.subtitle}</p>
            <button className="w-fit border border-[#c9a876] text-[#c9a876] text-[11px] tracking-[0.15em] px-5 py-2.5 flex items-center gap-2 hover:bg-[#c9a876] hover:text-[#0b0a08] transition-colors">
              {summerBanner.ctaText} <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="bg-[#141210] border border-[#2a2620] rounded-lg">
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-[#2a2620]">
            {[
              { icon: Users, num: "5,00,000+", label: "HAPPY CUSTOMERS" },
              { icon: Package, num: "50,000+", label: "PREMIUM PRODUCTS" },
              { icon: Award, num: "100+", label: "TOP FASHION BRANDS" },
              { icon: Smile, num: "99%", label: "CUSTOMER SATISFACTION" },
              { icon: Clock, num: "24x7", label: "CUSTOMER SUPPORT" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-2 py-8 px-2 text-center">
                <s.icon size={20} strokeWidth={1.3} className="text-[#c9a876]" />
                <div className="font-display text-lg text-[#f5ede1]">{s.num}</div>
                <div className="text-[9px] tracking-[0.1em] text-[#8a8175]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== New Arrivals ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-center gap-4 mb-10 relative">
          <span className="w-10 h-px bg-[#4a4438]" />
          <h2 className="text-[13px] tracking-[0.3em] text-[#cfc4b3]">NEW ARRIVALS</h2>
          <span className="w-10 h-px bg-[#4a4438]" />
          <a href="#" className="hidden sm:flex absolute right-0 items-center gap-1 text-[10px] tracking-[0.15em] text-[#c9a876]">
            VIEW ALL <ArrowRight size={11} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative bg-[#f0ece3] aspect-[3/4] overflow-hidden mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0b0a08]/70 flex items-center justify-center text-[#f5ede1] hover:text-[#c9a876]">
                  <Heart size={13} />
                </button>
              </div>
              <p className="text-[11px] text-[#e8ded0] leading-tight">{p.name}</p>
              <p className="text-[11px] text-[#c9a876] mt-1">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Crafted For Those ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pb-10">
        <div className="relative h-64 sm:h-72 overflow-hidden border border-[#2a2620]">
          <img src={images.crafted} alt="Crafted for those who expect more" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/60 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-8 max-w-sm">
            <h3 className="font-display text-2xl sm:text-3xl text-[#f5ede1] leading-snug mb-3">
              {craftedBanner.titleLine1}
              <br />
              {craftedBanner.titleLine2}
            </h3>
            <span className="w-10 h-px bg-[#c9a876] mb-6" />
            <div className="grid grid-cols-4 gap-4 text-[9px] tracking-wide text-[#cfc4b3]">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Gem size={16} strokeWidth={1.3} className="text-[#c9a876]" />
                PREMIUM FABRICS
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck size={16} strokeWidth={1.3} className="text-[#c9a876]" />
                PERFECT FIT
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Clock size={16} strokeWidth={1.3} className="text-[#c9a876]" />
                TIMELESS DESIGN
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Award size={16} strokeWidth={1.3} className="text-[#c9a876]" />
                BUILT TO LAST
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Join the Club / Newsletter ===== */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="bg-[#141210] border border-[#2a2620] grid sm:grid-cols-3 items-center">
          <div className="flex items-center gap-4 p-6 sm:col-span-1">
            <img src={images.club} alt="NAX VIP Club" className="w-20 h-20 object-contain shrink-0" />
            <div>
              <p className="text-[#c9a876] text-[10px] tracking-[0.2em] mb-1">{club.eyebrow}</p>
              <h4 className="font-display text-lg text-[#f5ede1] mb-1">{club.title}</h4>
              <p className="text-[10px] text-[#8a8175]">{club.description}</p>
            </div>
          </div>

          <div className="p-6 border-t sm:border-t-0 sm:border-l border-[#2a2620]">
            <p className="text-[#c9a876] text-[10px] tracking-[0.2em] mb-1">{newsletter.eyebrow}</p>
            <p className="text-[11px] text-[#8a8175]">Be the first to get special new arrivals & more.</p>
          </div>

          <div className="p-6 border-t sm:border-t-0 sm:border-l border-[#2a2620]">
            <p className="text-[#c9a876] text-[10px] tracking-[0.2em] mb-1">{newsletter.eyebrow}</p>
            <p className="text-[11px] text-[#8a8175] mb-3">{newsletter.subtitle}</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-[#4a4438] text-[11px] text-[#f5ede1] placeholder:text-[#6b6255] px-3 py-2.5 outline-none focus:border-[#c9a876]"
              />
              <button className="bg-[#c9a876] text-[#0b0a08] text-[10px] tracking-[0.15em] font-semibold px-4 flex items-center gap-1 hover:bg-[#dcbf95] transition-colors">
                SUBSCRIBE <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#2a2620] bg-[#0b0a08]">
        <div className="max-w-[1400px] mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 border border-[#c9a876] rounded-full flex items-center justify-center">
                <span className="font-display text-[#c9a876] text-lg leading-none">N</span>
              </div>
              <span className="font-display text-lg tracking-wide">{brand.name}</span>
            </div>
            <p className="text-[11px] text-[#8a8175] leading-relaxed mb-4">
              {footer.description}
            </p>
            <div className="flex items-center gap-3 text-[#8a8175]">
              <Instagram size={15} className="hover:text-[#c9a876] cursor-pointer" />
              <Facebook size={15} className="hover:text-[#c9a876] cursor-pointer" />
              <Twitter size={15} className="hover:text-[#c9a876] cursor-pointer" />
              <Youtube size={15} className="hover:text-[#c9a876] cursor-pointer" />
              <Linkedin size={15} className="hover:text-[#c9a876] cursor-pointer" />
            </div>
          </div>

          <div>
            <h5 className="text-[11px] tracking-[0.15em] text-[#f0e8db] mb-4">QUICK LINKS</h5>
            <ul className="space-y-2.5 text-[11px] text-[#8a8175]">
              {["Men", "Women", "Kids", "Accessories", "Collections", "Sale", "New Arrivals"].map((l) => (
                <li key={l} className="hover:text-[#c9a876] cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] tracking-[0.15em] text-[#f0e8db] mb-4">CUSTOMER SERVICE</h5>
            <ul className="space-y-2.5 text-[11px] text-[#8a8175]">
              {["My Orders", "Returns & Exchanges", "Shipping Policy", "Cancel Order", "Size Guide", "FAQs"].map((l) => (
                <li key={l} className="hover:text-[#c9a876] cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] tracking-[0.15em] text-[#f0e8db] mb-4">ABOUT US</h5>
            <ul className="space-y-2.5 text-[11px] text-[#8a8175]">
              {["Our Story", "Our Vision", "Our Mission", "Store Locator", "Careers", "Blog"].map((l) => (
                <li key={l} className="hover:text-[#c9a876] cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] tracking-[0.15em] text-[#f0e8db] mb-4">STORE & SUPPORT</h5>
            <ul className="space-y-3 text-[11px] text-[#8a8175]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#c9a876] shrink-0 mt-0.5" />
                {footer.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#c9a876] shrink-0" /> {footer.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#c9a876] shrink-0" /> {footer.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2620]">
          <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#6b6255]">
            <p>{footer.copyright}</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#c9a876]">Terms & Conditions</a>
              <a href="#" className="hover:text-[#c9a876]">Privacy Policy</a>
              <a href="#" className="hover:text-[#c9a876]">Refund Policy</a>
            </div>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "UPI", "Paytm"].map((p) => (
                <span key={p} className="border border-[#2a2620] rounded px-2 py-1 text-[9px] text-[#8a8175]">{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center pb-3">
          <a href="#admin" className="text-[9px] text-[#3a3630] hover:text-[#c9a876] transition-colors">Admin</a>
        </div>
      </footer>
    </div>
  );
}
