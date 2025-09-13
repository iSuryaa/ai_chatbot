export default function Message({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`m-2 p-3 rounded-xl max-w-xs ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
      >
        {text}
      </div>
    </div>
  );
}
