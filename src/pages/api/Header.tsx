import Link from 'next/link';
import React, { useState } from 'react'
import { fredoka, oswald } from '..';
import { Menu, Plus } from 'lucide-react';

const Header = () => {
    const [window, setWindow] = useState(false)

    const HeaderThings = [{it: 'Home', route: '/'}, {it: 'Profile', route: '/myprofile'}, {it:'feed', route: '/feed'}, {it: 'Company', route: "/"}]
  return (
    <header
      className="fixed top-0 w-full p-5 bg-lime-300 text-purple-500 flex flex-row items-center uppercase justify-around z-10"
      style={{ fontFamily: oswald.style.fontFamily }}
    >
      <div style={{ fontFamily: "var(--font-fredoka)" }}>
        <Link href={'/'}><strong className="text-xl tracking-widest">TIPTYPE</strong></Link>
      </div>
      <div
        className={`flex flex-row items-center justify-around gap-10 max-sm:gap-5 max-sm:bg-purple-600 max-sm:w-30 transition-all ease-in max-sm:text-lime-400 max-sm:p-10 max-sm:rounded-lg max-sm:flex-col max-sm:-bottom-80 max-sm:absolute ${
          window ? "max-sm:translate-x-48" : "max-sm:translate-x-96"
        }`}
      >
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
      <Menu
        size={26}
        className="sm:hidden cursor-pointer text-purple-600 hover:text-purple-500"
        onClick={() => setWindow((prop) => !prop)}
      />
    </header>
  );
}

export default Header
