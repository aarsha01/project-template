import { useRef, useState } from "react";

export function TestBingImageSearch() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageItems, setImageItems] = useState<any[]>([]);

  const handleSearch = async () => {
    const searchQuery = textAreaRef.current?.value;
    if (!searchQuery) {
      alert("empty search query");
      return;
    }
    const response = await fetch(
      `${process.env.BACKEND_API_HOST}/test/bing-image-search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      }
    );
    const data = await response.json();
    if (!data.success) {
      alert("failed to search");
      return;
    }
    console.log(data.searchResultItems);
    setImageItems(data.searchResultItems);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col items-center px-10">
      <h1 className="mt-10 text-3xl">Test bing image search</h1>
      <textarea
        ref={textAreaRef}
        className="w-full mt-4 p-2 border border-gray-300 rounded"
        placeholder="Search query"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSearch();
          }
        }}
      ></textarea>
      <button
        className="my-4 bg-blue-500 text-white p-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="w-full border-b h-px"></div>
      <div className="flex flex-wrap gap-4">
        {imageItems.map((imageItem) => (
          <div
            className="w-32 h-32 bg-gray-300"
            style={{
              backgroundImage: `url(${imageItem.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
