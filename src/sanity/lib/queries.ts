// All products
export const productsQuery = `
  *[_type == "product"]{
    _id,
    name,
    slug,
    price,
    price_before,
    details,
    size,
    image,
    available
  }
`;

//Limit to 10 products only
export const topTenProductsQuery = `
  *[_type == "product"][0...10]{
    _id,
    name,
    slug,
    price,
    price_before,
    details,
    image,
    available
  }
`;

//Limit to 10 products only
export const topTwentyProductsQuery = `
  *[_type == "product"][10...20]{
    _id,
    name,
    slug,
    price,
    price_before,
    details,
    image,
    available
  }
`;

// Limit to 3 products only
export const topThreeProductsQuery = `
  *[_type == "product"][0...3]{
    _id,
    name,
    slug,
    price,
    price_before,
    details,
    image,
    available
  }
`;
