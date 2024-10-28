'use client'
import { ICONS } from '@/constants/footer-data';
import React from 'react'

const FooterIcons = () => {
  return (
    <div className="flex items-center gap-4">
      {ICONS.map((item) => {
        return (
          <div
            onClick={() => open(item.url, "_blank")}
            key={item.title}
            aria-label={`OGSoft ${item.title} link`}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 hover:bg-blue-200 cursor-pointer items-center flex justify-center hover:-translate-y-2 duration-300 ease-in"
          >
            {
              <item.Icon className="w-1/2 text-blue-900 dark:text-blue-100 cursor-pointer" />
            }
          </div>
        );
      })}
    </div>
  );
}

export default FooterIcons