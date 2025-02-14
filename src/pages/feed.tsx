import React, { useEffect, useState, useRef } from "react";
import Header from "./api/Header";
import { Lilita, fredoka } from ".";
import { Get, getTip } from "./api/REST";
import Link from "next/link";

interface TipType {
  by: string;
  type: string;
  tip: string;
}

interface Usertype {
  profileimage: string;
  name: string;
  email: string;
}

const Feed = () => {
  const [data, setData] = useState<TipType[]>([]);
  const [users, setUsers] = useState<Usertype[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getTips = async () => {
      try {
        const userResponse = await Get();
        const tipResponse = await getTip();
        
        if (userResponse && Array.isArray(userResponse.items)) {
          setUsers(userResponse.items);
        }

        if (tipResponse && Array.isArray(tipResponse.items)) {
          setData(tipResponse.items);
        }
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    getTips();
  }, []);
 
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [data]);

  const findAuthor = (email: string) => {
    return users.find((user) => user.email === email);
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div
        className="bg-lime-200 w-full min-h-screen flex flex-col items-center"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <div className="w-full max-w-4xl px-4 mt-60">
          <h1 className="text-purple-600 text-6xl mb-6 text-center">Feed</h1>
          <div
            className="flex flex-col items-center gap-6 my-10"
            style={{ fontFamily: fredoka.style.fontFamily }}
          >
            {data.length > 0 ? (
              data.map((item, index) => {
                const author = findAuthor(item.by);
                return (
                  <div
                    key={index}
                    className="w-full hb-auto bg-purple-700 p-6 rounded-xl shadow-md transition-transform transform hover:scale-105 "
                  >
                    
                      <Link href={`/profile/${author?.name}`}>
                        <div className="flex flex-row items-start justify-start gap-5 cursor-pointer">
                          <img
                            src={
                              author?.profileimage ||
                              "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                            }
                            alt="profileimage"
                            className="rounded-full mb-5 w-10 h-10 object-cover"
                          />
                          <h1 className="text-xl font-thin">
                            {author?.name || "Unknown author"}
                          </h1>
                        </div>
                      </Link>
                    
                    <h1 className="text-3xl font-thin text-white">
                      {item.type}
                    </h1>
                    <p className="text-lg text-gray-300 mt-3">{item.tip}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      By: {author?.name || "Unknown author"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-lg">No tips available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
