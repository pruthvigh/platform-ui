// @flow
import {
  DCC_OVERVIEW_PATH,
  LOGIN_PAGE_PATH,
  PROGRAMS_LIST_PATH,
  PROGRAM_ENTITY_PATH,
  USER_PAGE_PATH,
} from 'global/constants/pages';
import useEgoToken from 'global/hooks/useEgoToken';
import { decodeToken } from 'global/utils/egoJwt';
import Link from 'next/link';
import * as React from 'react';
import { css } from 'uikit';
import AppBar, {
  DropdownMenu,
  DropdownMenuItem,
  Logo,
  MenuGroup,
  MenuItem,
  Section,
  UserBadge,
} from 'uikit/AppBar';
import Button from 'uikit/Button';

const NavbarLink = ({ path, active }: { path: string, active: boolean }) => {
  const titles = {
    [LOGIN_PAGE_PATH]: 'Login',
    [PROGRAMS_LIST_PATH]: 'Programs',
    [PROGRAM_ENTITY_PATH]: 'Program',
    [DCC_OVERVIEW_PATH]: 'Dcc Admin',
    [USER_PAGE_PATH]: 'User',
  };
  return (
    <MenuItem
      DomComponent={({ active, ...props }) => (
        <Link prefetch href={path}>
          <a {...props} id="link-login" />
        </Link>
      )}
      active={active}
    >
      {titles[path]}
    </MenuItem>
  );
};

export default (props: { path: string, logOut: void => void, children?: React.Node }) => {
  const { token: egoJwt } = useEgoToken();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleUserBadgeClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userModel = (() => {
    try {
      return decodeToken(egoJwt || '');
    } catch (err) {
      return null;
    }
  })();

  return (
    <AppBar
      css={css`
        position: sticky;
        top: 0px;
        z-index: 2;
      `}
    >
      <Section>
        <Logo
          DomComponent={props => (
            <Link prefetch href={`/`}>
              <a {...props} id="home-login" />
            </Link>
          )}
        />
        <MenuGroup>
          {/* <NavbarLink path={PROGRAM_ENTITY_PATH} active={props.path === PROGRAM_ENTITY_PATH} />
          <NavbarLink path={DCC_OVERVIEW_PATH} active={props.path === DCC_OVERVIEW_PATH} />
          <NavbarLink path={USER_PAGE_PATH} active={props.path === USER_PAGE_PATH} /> */}
          {/* <MenuItem>File Repository</MenuItem> */}
          {props.children}
        </MenuGroup>
      </Section>
      <Section />
      <Section>
        <MenuGroup>
          <MenuItem>Submission</MenuItem>
          {!userModel && (
            <NavbarLink path={LOGIN_PAGE_PATH} active={props.path === LOGIN_PAGE_PATH} />
          )}
          {userModel && (
            <MenuItem
              dropdownMenu={
                <DropdownMenu open={dropdownOpen}>
                  <DropdownMenuItem active>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Tokens</DropdownMenuItem>
                  <DropdownMenuItem onClick={props.logOut}>Logout</DropdownMenuItem>
                </DropdownMenu>
              }
            >
              <UserBadge
                onClick={handleUserBadgeClick}
                firstName={userModel.context.user.firstName}
                lastName={userModel.context.user.lastName}
                title={'Some Role'}
              />
            </MenuItem>
          )}
        </MenuGroup>
      </Section>
    </AppBar>
  );
};
