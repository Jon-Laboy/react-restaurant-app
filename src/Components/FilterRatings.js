import React from "react";

function FilterRatings({
  firstRating,
  setFirstRating,
  secondRating,
  setSecondRating
}) {
  function changeFirstRating(e) {
    setFirstRating(e.target.value);
  }

  function changeSecondRating(e) {
    setSecondRating(e.target.value);
  }

  return (
    <div className="filter-ratings">
      <form>
        <label>Choose by Rating:</label>
        <select
          className="rating-one"
          onChange={changeFirstRating}
          value={firstRating}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        to
        <select
          className="rating-two"
          onChange={changeSecondRating}
          value={secondRating}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
  );
}

export default FilterRatings;
