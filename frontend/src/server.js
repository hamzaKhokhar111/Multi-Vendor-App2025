export const server = "http://localhost:8000/api/v2";
export const backend_url = "http://localhost:8000/";

// ✅ Helper function to clean image paths
export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  return `${backend_url}${path
    .replace(/\\/g, "/") // Windows ka backslash → forward slash
    .replace("E:/Multi-Vendor 2025/Backend/", "")}`; // Local backend path hatao
};
