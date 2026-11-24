

function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <>
      <label htmlFor="sortby">Sort By</label>
      <select id="sortby" onChange={(event) => onSortByChange(event.target.value)}>
        <option value="createdAt">Created At</option>
        <option value="title">Title</option>
      </select>

      <label htmlFor="order">Order</label>
      <select id="order" onChange={(event) => onSortDirectionChange(event.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </>
  )
}

export default SortBy;