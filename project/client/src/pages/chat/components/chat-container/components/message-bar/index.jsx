import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { GrAttachment } from "react-icons/gr";
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Fix cleanup
    };
  }, []);

  const handleAddEmoji = (emojiObject, event) => {
    setMessage((msg) => msg + emojiObject.emoji);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      console.log("Message sent:", message); // Replace with actual send logic
      setMessage(''); // Clear the input after sending
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line
      handleSendMessage();
    }
  };

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6'>
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:outline-none focus:border-none"
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
          <GrAttachment className='text-2xl' />
        </button>
        <div className="relative">
          <button
            aria-label="Open emoji picker"
            className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerLine className='text-2xl' />
          </button>
          {emojiPickerOpen && (
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                theme='dark'
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className='bg-red-500 rounded-md flex items-center justify-center p-5 hover:bg-red-600 focus:bg-red-700 focus:border-none 
        focus:outline-none focus:text-white duration-200 transition-all'
        onClick={handleSendMessage}
      >
        <IoSend className='text-2xl' />
      </button>
    </div>
  );
}

export default MessageBar;