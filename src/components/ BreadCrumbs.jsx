import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import uuid from '../utils/uuid';

function BreadCrumbs({ items }) {
  return (
    <Breadcrumb marginY={6} spacing="8px" separator=">">
      {items.map((item) => (
        <BreadcrumbItem key={uuid()}>
          <BreadcrumbLink as={Link} to={item.url}>
            {item.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumbs;
