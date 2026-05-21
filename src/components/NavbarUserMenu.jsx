"use client";

import { useMsal } from "@azure/msal-react";
import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@relume_io/relume-ui";
import { Link as RouterLink } from "react-router-dom";
import { RxChevronDown } from "react-icons/rx";
import { logoutRequest } from "../auth/msalConfig";
import { useAppRoles } from "../context/AppRolesContext.jsx";
import { useAccountProfile } from "../hooks/useAccountProfile";

function ProfileAvatar({ photoUrl, initials }) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        className="size-9 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background-secondary text-xs font-semibold uppercase text-text-primary"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function NavbarUserMenu({ onNavigate }) {
  const { instance } = useMsal();
  const { account, displayName, initials, photoUrl } = useAccountProfile();
  const { isPlatformAdmin, meStatus, resetSession } = useAppRoles();
  const showAdminLink =
    meStatus === "ready" && isPlatformAdmin;
  const handleSignOut = () => {
    onNavigate?.();
    resetSession();
    instance.logoutRedirect({
      ...logoutRequest,
      account: account ?? undefined,
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "flex max-w-[min(100%,20rem)] items-center gap-2 rounded-md border border-border-primary bg-background-primary px-3 py-2",
          "text-left outline-none ring-offset-background-primary focus-visible:ring-2 focus-visible:ring-border-primary",
          "lg:max-w-[22rem] lg:border-transparent lg:bg-transparent lg:px-2 lg:py-1",
        )}
        aria-label={`Account menu for ${displayName}`}
      >
        <ProfileAvatar photoUrl={photoUrl} initials={initials} />
        <span className="min-w-0 flex-1 truncate text-sm text-text-primary lg:flex-initial">
          Welcome{" "}
          <span className="font-semibold text-text-primary">{displayName}</span>
        </span>
        <RxChevronDown className="size-4 shrink-0 text-text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[1000] min-w-[12rem] border-border-primary bg-background-primary"
      >
        <DropdownMenuItem asChild className="cursor-pointer">
          <RouterLink
            to="/rental-account-dashboard"
            className="w-full"
            onClick={() => onNavigate?.()}
          >
            User page
          </RouterLink>
        </DropdownMenuItem>
        {showAdminLink ? (
          <DropdownMenuItem asChild className="cursor-pointer">
            <RouterLink
              to="/dashboard"
              className="w-full"
              onClick={() => onNavigate?.()}
            >
              Admin page
            </RouterLink>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator className="bg-border-primary" />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
