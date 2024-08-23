import { RefObject, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { formatTime } from "@/modules/shared/utils";

interface Message {
  text: string;
  image: string;
  fromSelf: boolean;
  createdAt: Date;
}

interface Props {
  messages: Message[] | undefined;
  scrollRef: RefObject<HTMLDivElement>;
}

export const Messages = ({ messages, scrollRef }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openImage = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col py-5 pr-3 pl-5 mr-2 gap-3 overflow-auto bg-zinc-950">
      {messages?.map((message, index) => (
        <>
          <dialog
            ref={dialogRef}
            className="absolute w-[80%] backdrop:backdrop-blur-sm backdrop:bg-zinc-900 backdrop:bg-opacity-70 select-none rounded"
          >
            <form method="dialog">
              <img src={message.image} className={`w-full p-2 rounded-xl`} />
              <button type="submit" className="absolute right-4 top-4">
                <IoClose size={35} color="white" />
              </button>
            </form>
          </dialog>
          <div key={index} ref={scrollRef}>
            <div
              className={`flex items-center ${
                message.fromSelf ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex flex-col justify-center relative max-w-[40%] break-text min-w-[6.5rem] ${
                  message.fromSelf
                    ? "bg-purple-600 rounded-tr-xl rounded-l-md"
                    : "bg-zinc-600 rounded-tl-xl rounded-r-md"
                }`}
              >
                {message.image && (
                  <img
                    onClick={openImage}
                    src={message.image}
                    className={`w-full p-1 rounded-xl cursor-pointer ${message.text && "pb-0"}`}
                  />
                )}
                <div className="flex items-start justify-between">
                  {message.text && (
                    <p className="px-4 py-1 self-start">{message.text}</p>
                  )}
                  <span
                    className={`text-[0.6rem] self-end pr-2 pb-1 ${message.image && !message.text && "absolute right-1 bottom-1"}`}
                  >
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
