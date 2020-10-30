import * as React from 'react';

import { Link, LinkProps } from 'react-router-dom';

export function linkToRoute(route: string) {
  return (props: Omit<LinkProps, "to">) => <Link {...props} to={route} />;
}
