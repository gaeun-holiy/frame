import Image from "next/image";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import { useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const fileInputRef = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsDragOver(true);
    if (image) setIsPushing(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsPushing(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    if (image) setIsPushing(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsPushing(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen flex items-center justify-center bg-white relative`}
      style={{ minHeight: "100vh" }}
    >
      {image && (
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none`}
          style={{ background: isPushing ? "#fff" : "transparent" }}
        >
          <img
            src={image}
            alt="Uploaded"
            className={`w-full h-full object-cover transition-all duration-300 ${isPushing ? "scale-70 opacity-60 max-w-[70vw] max-h-[70vh] rounded-2xl shadow-2xl" : "scale-100 opacity-100 w-full h-full"}`}
            style={{
              transform: isPushing ? "scale(0.7)" : "scale(1)",
              opacity: isPushing ? 0.6 : 1,
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              borderRadius: isPushing ? "1.5rem" : 0,
              boxShadow: isPushing ? "0 8px 32px 0 rgba(0,0,0,0.15)" : "none",
              maxWidth: isPushing ? "70vw" : "100vw",
              maxHeight: isPushing ? "70vh" : "100vh",
              background: "white"
            }}
          />
        </div>
      )}
      <div
        className={`z-20 flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 cursor-pointer
          ${image ? "fixed inset-0 bg-transparent" : "w-[400px] h-[300px]"}
          ${isDragOver && image ? "ring-4 ring-pink-300 scale-105" : ""}
          ${robotoMono.className}
        `}
        style={
          image
            ? { background: isDragOver ? "rgba(254,238,226,0.7)" : "transparent" }
            : { background: "#FEEEE2", border: "none" }
        }
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        {!image && (
          <span className="text-2xl font-bold mb-2" style={{ color: "#B16EA1" }}>
            Frame the moment
          </span>
        )}
        {image && isDragOver && (
          <span className="text-2xl font-bold" style={{ color: "#B16EA1", background: "#fff8", borderRadius: "1rem", padding: "1rem 2rem", boxShadow: "0 2px 8px 0 #0001" }}>
            Keep me in your memory
          </span>
        )}
      </div>
    </div>
  );
}
