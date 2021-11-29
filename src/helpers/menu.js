import {MENU_ITEMS, MENU_ITEMS_WITHOUT_LOGIN} from '../constants/menu';
import { APICore } from '../helpers/api/apiCore';

const getMenuItems = () => {
    const api = new APICore();
    // NOTE - You can fetch from server and return here as well
    if (api.isUserAuthenticated() === true) {
        return MENU_ITEMS;
    } else {
        return MENU_ITEMS_WITHOUT_LOGIN;
    }
};

const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem };
