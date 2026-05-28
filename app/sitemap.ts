import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jeeko.in";
  
  // Static website routes
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/kishan-king",
    "/brochures",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic e-commerce product paths for Google Search index
  try {
    const res = await fetch("https://server.jeeko.in/e-commerce/products", {
      next: { revalidate: 3600 }, // Cache sitemap products for 1 hour
    });
    
    if (res.ok) {
      const raw = await res.json();
      const products = Array.isArray(raw) ? raw : (raw?.data || []);
      
      const dynamicProductRoutes = products.map((product: any) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(product.updated_at || product.created_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
      
      return [...staticRoutes, ...dynamicProductRoutes];
    }
  } catch (error) {
    console.error("SEO Sitemap dynamic products fetching failed:", error);
  }

  return staticRoutes;
}
