import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogProduct = () => {
  const { category } = useParams();
  console.log("Category từ useParams:", category); // Thêm log kiểm tra
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      console.error("Category không tồn tại!");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/blogs/${category}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.error("Lỗi API:", err);
        setBlog(null);
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Đang tải...</p>;
  if (!blog || !blog.products) return <p>Không tìm thấy blog</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
      <p className="text-center mb-6">{blog.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blog.products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg hover:shadow-lg"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={
                  product.image
                    ? product.image
                    : "https://cdn.yousport.vn/Media/Collections/den_1.jpg"
                }
                alt={product.name}
                className="w-full h-40 object-contain"
              />
            </Link>
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">
              {product.price.toLocaleString()} VND
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogProduct;
