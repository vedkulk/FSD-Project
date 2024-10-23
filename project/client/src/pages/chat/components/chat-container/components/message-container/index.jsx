import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/store'; // Ensure this is the correct import

const MessageBar = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } = useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => { // Define index here
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format('LL')}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)} {/* Call renderDMMessages */}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div className={`${message.sender === userInfo.id ? "text-left" : "text-right"}`}>
      {message.messageType === 'text' && (
        <div
          className={`${
            message.sender !== userInfo.id
              ? "bg-red-400 text-red-500 border-red-900"
              : "bg-gray-400 text-gray-500 border-gray-900"
          } border inline-block p-4 rounded m-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className='text-xs text-gray-500'>
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[75vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageBar;
