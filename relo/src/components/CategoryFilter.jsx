function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filters">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={
            selectedCategory === category
              ? "category active"
              : "category"
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilter;
