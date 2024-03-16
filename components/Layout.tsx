import React from 'react';

import Sidebar from "@/components/layout/Sidebar"
import Widgets from './layout/Widgets';
import Head from 'next/head';
import Provider from './Provider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <div className="h-screen">
        <Provider>
          <div className="container h-full mx-auto xl:px-30 max-w-7xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div
                className="
              col-span-3 
              lg:col-span-2 
              border-x 
              dark:border-neutral-800
          ">
                {children}
              </div>
              <Widgets />
            </div>
          </div>
        </Provider>
      </div>
    </>
  )
}

export default Layout;
