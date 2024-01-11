let selectedStars = 0;

const commentReviewsFunc = function () {
  const commentStarsDOM = document.querySelectorAll(".comment-form-rating .star");

  commentStarsDOM.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectedStars = index + 1;
      commentStarsDOM.forEach((star, i) => star.classList.toggle("active", i <= index));
    });
  });
};

const addNewCommentFunc = () => {
  let comments = [];
  let commentTextDOM = document.getElementById("comment-text");
  let commentNameDOM = document.getElementById("comment-name");
  let commentBtnDOM = document.querySelector(".form-submit input");
  let commentListDOM = document.querySelector(".comment-list");
  let commentText = "";
  let commentName = "";

  commentTextDOM.addEventListener("input", function (e) {
    commentText = e.target.value;
  });

  commentNameDOM.addEventListener("input", function (e) {
    commentName = e.target.value;
  });

  function addComment(e) {
    e.preventDefault();
    comments.push({ text: commentText, author: commentName, stars: selectedStars });
    let result = "";
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    comments.forEach((item) => {
      const filledStars = Array.from({ length: item.stars }, (_, index) => `
        <li>
            <i class="bi bi-star-fill"></i>
        </li>`).join('');
      const emptyStars = Array.from({ length: 5 - item.stars }, (_, index) => `
        <li>
            <i class="bi bi-star"></i>
        </li>`).join('');

      result += `
        <li class="comment-item">
          <div class="comment-avatar">
              <img src="img/avatars/avatar3.jpg" alt="">
          </div>
          <div class="comment-text">
              <ul class="comment-star">${filledStars}${emptyStars}</ul>
              <div class="comment-meta">
                  <strong>${item.author}</strong>
                  <span>-</span>
                  <time>${formattedDate}</time>
              </div>
              <div class="comment-description">
                  <p>${item.text}</p>
              </div>
          </div>
        </li>
      `;
    });
    commentListDOM.innerHTML = result;
    commentTextDOM.value = "";
    commentNameDOM.value = "";

    selectedStars = 0;
    const commentStarsDOM = document.querySelectorAll(".comment-form-rating .star");
    commentStarsDOM.forEach((star) => star.classList.remove("active"));
  }

  commentBtnDOM.addEventListener("click", addComment);
};

function commentsFunc() {
  commentReviewsFunc();
  addNewCommentFunc();
}

export default commentsFunc();