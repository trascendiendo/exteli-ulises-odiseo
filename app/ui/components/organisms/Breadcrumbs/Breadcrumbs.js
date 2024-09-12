'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter( path => path )

  return (
    <ul className="breadcrumbs">
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join('/')}`
        let itemClasses = paths === href ? 'breadcrumbs__item active' : 'breadcrumbs__item'
        return (
          <li key={index} className={itemClasses}>
            <Link href={href}>{link}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Breadcrumbs
