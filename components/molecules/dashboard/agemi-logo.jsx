import React from 'react'
import Link from 'next/link';
import { GalleryVerticalEnd } from 'lucide-react';
const DnbLogo = () => {
  return (
    <div className="flex items-center justify-center gap-2 font-serif">
      <Link href="/" className="flex items-center gap-2 font-medium">
        <div className="flex h-6 w-6 items-center justify-center">
          <GalleryVerticalEnd className="size-10" />
        </div>
        Agemi
      </Link>
    </div>
  )
}

export default DnbLogo;
