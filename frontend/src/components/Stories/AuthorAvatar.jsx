import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { getInitials } from "./storyDetailUtils";


export default function AuthorAvatar({ author }) {
  const [imgFailed, setImgFailed] = useState(false);

  const name = author?.name || "Revoltevez Team";
  const photoURL = author?.photoURL;
  const showImage = photoURL && !imgFailed;

  if (showImage) {
    return (
      <img
        src={photoURL}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
        onError={() => setImgFailed(true)}
      />
    );
  }

  if (author?.name) {
    return (
      <div
        className="
          w-11 h-11 rounded-full shrink-0
          bg-gradient-to-br from-black to-gray-700
          flex items-center justify-center
          text-white text-[13px] font-bold
          ring-2 ring-gray-100
        "
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white shrink-0 ring-2 ring-gray-100">
      <FiUser size={16} />
    </div>
  );
}