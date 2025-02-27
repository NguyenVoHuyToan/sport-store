import { useState } from "react";
import React from "react";

const SidebarFilter = ({ filters, setFilters }) => {
  const [category, setCategory] = useState(filters.category);
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // Cập nhật bộ lọc khi thay đổi giá trị
  const handleFilterChange = () => {
    setFilters({
      category,
      priceRange: priceRange.join(","), // Chuyển thành chuỗi "min,max"
    });
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Lọc sản phẩm</h2>

      {/* Lọc theo danh mục */}
      <label className="block mb-2">Danh mục:</label>
      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Tất cả</option>
        <option value="giay">Giày</option>
        <option value="ao">Áo</option>
        <option value="quan">Quần</option>
        <option value="phu-kien">Phụ Kiện Thể Thao</option>
      </select>

      {/* Lọc theo khoảng giá */}
      <label className="block mt-4">Khoảng giá:</label>
      <input
        type="range"
        min="0"
        max="10000000"
        step="100000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        className="w-full"
      />
      <p className="text-sm">Tối đa: {priceRange[1].toLocaleString()} VND</p>

      {/* Nút áp dụng */}
      <button
        onClick={handleFilterChange}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Áp dụng
      </button>
    </div>
  );
};

export default SidebarFilter;
