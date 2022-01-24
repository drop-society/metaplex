import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RuleIcon from '@mui/icons-material/Rule';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';

interface NavItem {
  href: string
  icon: JSX.Element 
  text: string
}
const mainItems: Array<NavItem> =  [
  {href: '/dashboard',  icon: <DashboardIcon/>, text: 'Dashboard'},
  {href: '/drops',  icon: <EventIcon/>, text: 'Drops'},
  {href: '/rules',  icon: <RuleIcon/>, text: 'Rules'},
];

const secondaryItems: Array<NavItem> =  [
  {href: '/insights',  icon: <AssignmentIcon/>, text: 'Insights'},
];

const listItemRender = (items: Array<NavItem>): JSX.Element => {

  return (<>
    {items.map((item, i) => (
      <Link key={i} href={item.href}>
        <ListItem button>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text}/>
        </ListItem>
      </Link>
    ))}
  </>);
}


export const mainListItems = listItemRender(mainItems);
export const secondaryListItems = listItemRender(secondaryItems);