const productsContainer = document.getElementById("product-list");

export function product1() {
  const config = {
    type: "carousel",
    perView: 4,
    gap: 20,
    autoplay: 10000,
    breakpoints: {
      992: {
        perView: 3,
      },
      768: {
        perView: 2,
      },
      576: {
        perView: 1,
      },
    },
  };

  productsContainer && new Glide(".product-carousel", config).mount();
}

export function singleThumbs() {
  const config2 = {
    perView: 3,
    breakpoints: {
      992: {
        perView: 3,
      },
    },
  };
  
  new Glide(".product-thumb", config2).mount();
}