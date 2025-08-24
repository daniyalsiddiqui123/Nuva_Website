const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: { hotspot: true },
    },
    { name: "name", title: "Name", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 90 },
    },
    { name: "price", title: "Price", type: "number" },
    { name: "price_before", title: "Price Before", type: "number" },
    { name: "details", title: "Details", type: "string" },
    { name: "length", title: "Length", type: "number" },
    { name: "chest", title: "Chest", type: "number" },
    { name: "inventory", title: "Inventory", type: "number" },
    { name: "available", title: "Available", type: "boolean", initialValue: true },
  ],
};

export default product;
