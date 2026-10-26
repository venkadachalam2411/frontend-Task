
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  setProducts,
  setLoading,
  setError,
} from "../redux/productsSlice";

import { fetchProductsAPI } from "../services/productAPI";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import "../styles/ProductList.css";

function ProductList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const categoryFromURL = searchParams.get("category") || "";

  const [category, setCategory] = useState(
    categoryFromURL || "All"
  );

  const [sort, setSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

 
  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const products = await fetchProductsAPI();

        if (!Array.isArray(products)) {
          throw new Error("Invalid product data received from API");
        }

        dispatch(setProducts(products));
      } catch (err) {
        dispatch(setError(err.message || "Something went wrong"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();
  }, [dispatch]);

  
  useEffect(() => {
    setCategory(categoryFromURL || "All");
    setCurrentPage(1);
  }, [categoryFromURL]);

  
  const categories = [
    "All",
    ...new Set(
      items
        .map((product) =>
          product.categoryName || product.category
        )
        .filter(Boolean)
    ),
  ];

  // Filter products by search and category
  const filteredProducts = items.filter((product) => {
  const productCategory = String(
    product.categoryName || product.category?.name || product.category || ""
  ).toLowerCase();

  const selectedCategory = category.toLowerCase();

  const categoryAliases = {
    laptops: ["laptop", "laptops", "computers"],
    headphones: ["headphones", "headphone", "audio"],
    tablets: ["tablet", "tablets"],
    smartwatches: ["smartwatch", "smartwatches", "watches"],
  };

  const matchingCategories = categoryAliases[selectedCategory] || [
    selectedCategory,
  ];

  const matchesCategory =
    category === "All" ||
    matchingCategories.some((name) => productCategory.includes(name));

  const matchesSearch = String(product.title || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});


  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sort === "high") {
    filteredProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }


  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

 
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1);

    const nextParams = new URLSearchParams(searchParams);

    if (selectedCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", selectedCategory);
    }

    setSearchParams(nextParams);
  };

  if (loading) {
    return <Loader message="Loading products..." />;
  }

  if (error) {
    return (
      <div className="status-message">
        <h2>Unable to load products</h2>
        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="products-page">
      <section className="products-heading">
        <div>
          <h1>
            {search.trim()
              ? `Search results for "${search}"`
              : category !== "All"
                ? category
                : "All Products"}
          </h1>

          <p>{filteredProducts.length} products found</p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      <div className="category-filters">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className={
              category === item ? "category active" : "category"
            }
            onClick={() => handleCategoryChange(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      {currentProducts.length === 0 ? (
        <div className="status-message">
          <h2>No products found</h2>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <section className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      )}

     
      {totalPages > 1 && (
        <nav
          className="pagination"
          aria-label="Product pagination"
        >
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              type="button"
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
              aria-current={
                currentPage === page ? "page" : undefined
              }
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}

export default ProductList;