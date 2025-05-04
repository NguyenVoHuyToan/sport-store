import React from 'react'
import { Link } from 'react-router-dom';

const Modal = ({isOpen, onClose, results}) => {
    if(!isOpen) return null;
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg relative">
      <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h2>

      {/* Hiển thị danh sách sản phẩm */}
      {results.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {results.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="border p-3 rounded-lg text-center">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
              <h3 className="text-black text-lg font-medium mt-2 py-2">{product.name}</h3>
              <p className="text-red-500 font-semibold py-2">{product.price} VND</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào</p>
      )}
    </div>
  </div>
  )
}

export default Modal
