import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductDetailView from "../components/ProductDetailView";
import SimilarProducts from "../components/SimilarProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductDetail, getSimilarProducts } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchProduct = () => {
    const data = getProductDetail(id);
    setProduct(data);

    if (data) {
      const similar = getSimilarProducts({
        category: data.category,
        excludeId: data.id,
        limit: 4,
      });
      setSimilarProducts(similar);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center font-bold text-gray-400">
        Product not found
      </div>
    );
  }

  return (
    <>
      <ProductDetailView product={product} />
      <SimilarProducts products={similarProducts} />
    </>
  );
};

export default ProductDetail;
