// app/credits/page.jsx
export default function Credits() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Credits</h1>
        <p className="mb-8">
          This project was created by [Your Name]. Special thanks to everyone who contributed!
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Back to Home
        </a>
      </div>
    );
  }
  