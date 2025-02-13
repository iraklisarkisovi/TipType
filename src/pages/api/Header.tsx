import Link from 'next/link';
import React from 'react'
import { fredoka, oswald } from '..';
import { Plus } from 'lucide-react';

const Header = () => {

    const HeaderThings = [{it: 'Home', route: '/'}, {it: 'Profile', route: '/profile'}, {it:'feed', route: '/feed'}, {it: 'Company', route: "/"}]
  return (
    <header
      className="fixed top-0 w-full p-5 bg-lime-300 text-purple-500 flex flex-row items-center uppercase justify-around z-10"
      style={{ fontFamily: oswald.style.fontFamily }}
    >
      <div style={{ fontFamily: "var(--font-fredoka)" }}>
        <strong className="text-xl tracking-widest">TIPTYPE</strong>
      </div>
      <div className="flex flex-row items-center justify-around gap-10 ">
        {HeaderThings.map((item) => (
          <h1 className="transition-all text-lg hover:tracking-widest ease-in-out">
            <Link href={item.route}>{item.it}</Link>
          </h1>
        ))}
        <h1 className="transition-all ease-in-out text-5xl hover:rotate-180">
          <Link href="/addtip">
            <Plus className="w-10 h-10" />
          </Link>
        </h1>
      </div>
    </header>
  );
}

export default Header
