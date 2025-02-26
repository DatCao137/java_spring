import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import AsideCss from './asideCss'

type SideNavigationItem = {
  name: string;
  to: string;
  class?: string;
  hasChildren?: boolean;
  children?: SideNavigationItem[];
};

type AsideContent = {
  logo: React.ReactNode;
  navigation: SideNavigationItem[];
};

export default function Aside({ logo, navigation }: AsideContent) {

  const [openIndexes, setOpenIndexes] = useState<{ [key: number]: boolean }>({});

  const onClickAccordion = (index: number) => {
    setOpenIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderNavItems = (items: SideNavigationItem[]) => {
    return items.map((item, index) => (
      <li key={item.name} className={item.hasChildren ? 'hasChildren' : ''}>
        {item.hasChildren ? (
          <>
            <div
              className={`bl_asideMenuItem bl_asideMenuItem_${item.class}`}
            >
              <NavLink to={item.to}>
                <img src={`../../img/icon_${item.class}.svg`} alt={item.name} />
                <span>{item.name}</span>
              </NavLink>
              <span
                key={index}
                className={`bl_asideMenuAccordion ${openIndexes[index] ? 'open' : ''}`}
                onClick={() => onClickAccordion(index)}
              >
              </span>
            </div>
            <ul className="bl_asideMenuChildren">
              {item.children && (
                <>
                  {renderNavItems(item.children)}
                </>
              )}
            </ul>
          </>
        ) : (
          <NavLink
            to={item.to}
            end={true}
            className={({ isActive }) =>
              cn(
                isActive && 'active',
              )
            }
          >
            {item.class ? <img src={`../../img/icon_${item.class}.svg`} alt={item.name} /> : ''}
            <span>{item.name}</span>
          </NavLink>
        )}
      </li>
    ));
  };

  return (
    <>
    <style>
      <AsideCss />
    </style>
    <aside className="fixed inset-y-0 left-0 z-50 w-60 sm:flex">
      <nav>
        {logo}
        <ul className="bl_asideMenu">
          {renderNavItems(navigation)}
        </ul>
      </nav>
    </aside>
    </>
  );
}
