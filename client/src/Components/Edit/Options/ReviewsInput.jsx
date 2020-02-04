import React, { useState } from "react";

const ReviewsInput = ({ state, setState }) => {
  const [reviews, setReviews] = useState([]);

  const updateReviews = (target, i) => {
    state.reviews[i]
      ? (state.reviews[i] = {
          name: state.reviews[i].name,
          comments: state.reviews[i].comments,
          [target.name]: target.value
        })
      : (state.reviews[i] = {
          name: "",
          comments: "",
          [target.name]: target.value
        });

    setState({
      ...state
    });
  };

  let printForms = reviews.map((el, i) => (
    <React.Fragment key={i}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={e => updateReviews(e.target, i)}
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          cols="30"
          rows="10"
          name="comments"
          onChange={e => updateReviews(e.target, i)}
        />
      </div>
    </React.Fragment>
  ));

  return (
    <div className="object-input">
      <button onClick={() => setReviews([...reviews, "new"])}>
        Add Review
      </button>
      {reviews ? printForms : ""}
    </div>
  );
};

export default ReviewsInput;
