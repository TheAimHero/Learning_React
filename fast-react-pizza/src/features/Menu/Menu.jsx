import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
  const menuData = useLoaderData();
  console.log(menuData);

  const menuList = menuData.map(menuItem => {
    return <MenuItem key={menuItem.id} pizza={menuItem} />;
  });

  return <ul>{menuList}</ul>;
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
