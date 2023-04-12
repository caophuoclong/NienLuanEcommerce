import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
const numberItemsPerPage = 20;
export default function Category({ categories = [] }) {
  const x = categories.length % numberItemsPerPage;
  const pages = Math.ceil(categories.length / numberItemsPerPage);
  console.log('🚀 ~ file: Category.jsx:7 ~ Category ~ pages', pages);
  const [currentPage, setCurrentPage] = React.useState(2);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [loading]);
  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <div className="my-2 font-bold ">Category</div>
      <div className="relative group">
        <div
          className={`flex flex-wrap transition-opacity duration-300 ease-in-out`}
          style={{
            opacity: !loading ? 1 : 0,
          }}
        >
          {categories
            .slice(
              (currentPage - 1) * numberItemsPerPage,
              numberItemsPerPage * currentPage,
            )
            .map((category, index) => (
              <Link
                to={category.link}
                key={index}
                className="flex w-[calc(100%/10)] flex-col items-center justify-center border border-solid hover:shadow-xl"
              >
                <img
                  src={category.src}
                  style={{
                    width: 85,
                    height: 85,
                  }}
                />
                <div>{category.name}</div>
              </Link>
            ))}
        </div>

        {currentPage >= 2 && pages >= 2 && (
          <button
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
              setLoading(true);
            }}
            className={`absolute top-1/2 -left-2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full border bg-white group-hover:scale-150`}
          >
            <GrFormPrevious />
          </button>
        )}
        {currentPage < pages && pages >= 2 && (
          <button
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
              setLoading(true);
            }}
            className={`absolute top-1/2 -right-2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full border bg-white group-hover:scale-150`}
          >
            <GrFormNext />
          </button>
        )}
      </div>
    </div>
  );
}
