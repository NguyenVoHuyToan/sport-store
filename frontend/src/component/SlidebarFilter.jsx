import { useState } from "react";

const SlidebarFilter = ({ filters, setFilters }) => {
  const [category, setCategory] = useState(filters.category || "");
  const [brand, setBrand] = useState(filters.brand || "");
  const [size, setSize] = useState(filters.size || "");
  const [color, setColor] = useState(filters.color || "");
  const [priceRange, setPriceRange] = useState(
    filters.priceRange || [0, 10000000]
  );

  const handleFilterChange = () => {
    setFilters({
      category,
      brand,
      size,
      color,
      priceRange: priceRange.join(","),
    });
  };

  const handlePriceClick = (range) => {
    setPriceRange(
      priceRange[0] === range[0] && priceRange[1] === range[1]
        ? [0, 10000000]
        : range
    );
  };

  return (
    <div className="flex flex-col max-w-64 justify-center shadow-lg rounded-xl gap-8 p-4 mb-6">
      <h1 className="text-xl font-semibold p-2 text-center">Danh Mục</h1>
      {["Giày thể thao", "Quần áo thể thao", "Phụ kiện thể thao"].map(
        (item) => (
          <button
            key={item}
            onClick={() => setCategory(category === item ? "" : item)}
            className={`px-4 py-2 rounded-lg border ${
              category === item ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        )
      )}

      <h1 className="text-xl font-semibold p-2 text-center">Thương Hiệu</h1>
      {["Nike", "Adidas", "Puma"].map((item) => (
        <button
          key={item}
          onClick={() => setBrand(brand === item ? "" : item)}
          className={`px-4 py-2 rounded-lg border ${
            brand === item ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}

      <h1 className="text-xl font-semibold p-2 text-center">Giá</h1>
      {[
        { label: "Dưới 500.000đ", range: [0, 500000] },
        { label: "500.000đ - 1 triệu", range: [500000, 1000000] },
        { label: "Trên 1 triệu", range: [1000000, 10000000] },
      ].map(({ label, range }) => (
        <button
          key={label}
          onClick={() => handlePriceClick(range)}
          className={`px-4 py-2 rounded-lg border ${
            priceRange[0] === range[0] && priceRange[1] === range[1]
              ? "bg-blue-950 text-white"
              : "bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}

      <button
        onClick={handleFilterChange}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Lọc sản phẩm
      </button>
    </div>
  );
};

export default SlidebarFilter;
