import Link from "next/link";

const BuyNow = () => {
  return (
    <Link href={"/checkout"}><button className="border-2 p-2 bg-amber-600 rounded-2xl w-72 cursor-pointer hover:bg-amber-500 my-10">
      <h1>BuyNow</h1>
    </button>
    </Link>
  );
};

export default BuyNow