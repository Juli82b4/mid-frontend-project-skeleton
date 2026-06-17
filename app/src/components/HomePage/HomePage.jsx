import bannerImage from "../../assets/banner.webp";

function HomePage() {
  return (
    <div className="w-full">
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden rounded-xl">
        <img
          src={bannerImage}
          alt="Events banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Discover Amazing Events
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-500">
          Welcome to EventHub
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Discover amazing events, concerts, and experiences near you. Browse
          events, add tickets to your cart, and book instantly with a smooth
          checkout experience designed for speed and simplicity.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
