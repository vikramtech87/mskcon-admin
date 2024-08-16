"use client";

import { useStore } from "@/hooks/useStore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Loader2, Menu, User2, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = "registration" | "workshop" | "finance" | "scientific";

type Resource = {
  label: string;
  url: string;
  roles: Set<Role>;
  key: string;
};

const resources: Resource[] = [
  {
    label: "Dashboard",
    roles: new Set([
      "registration",
      "finance",
      "scientific",
      "workshop",
    ] as Role[]),
    key: "dashboard",
    url: "/",
  },
  {
    label: "Registration",
    roles: new Set(["registration"] as Role[]),
    key: "registration",
    url: "/registration",
  },
  {
    label: "Workshop",
    roles: new Set(["workshop"] as Role[]),
    key: "workshop",
    url: "/workshop",
  },
  {
    label: "Transactions",
    roles: new Set(["finance"] as Role[]),
    key: "transactions",
    url: "/transactions",
  },
];

const Header = () => {
  const { authStore, setAuth } = useStore();
  const { isLoaded: isAuthLoaded, authState } = authStore;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        setAuth(undefined);
      } else {
        setAuth({
          authUser,
        });
      }
    });

    return () => unsubscribe();
  }, [setAuth]);

  const authEmail = authState?.authUser.email ?? undefined;
  const filteredResources = resources.slice();

  return (
    <>
      <MobileNav
        filteredResources={filteredResources}
        isAuthLoaded={isAuthLoaded}
        authEmail={authEmail}
      />
      <DesktopNav
        filteredResources={resources}
        isAuthLoaded={isAuthLoaded}
        authEmail={authEmail}
      />
    </>
  );
};

type NavProps = {
  filteredResources: Resource[];
  authEmail?: string;
  isAuthLoaded: boolean;
};

type AuthNavProps = {
  authEmail?: string;
  isAuthLoaded: boolean;
};

const MobileNav = ({
  filteredResources,
  authEmail,
  isAuthLoaded,
}: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-secondary sm:hidden">
      <Container>
        <nav className="flex flex-col space-y-8 py-2">
          <div className="font-medium text-secondary-foreground flex items-center justify-between">
            <div>MSKCon Admin</div>
            <Button
              variant="ghost"
              className="sm:hidden p-0"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
          {isOpen && (
            <>
              <ul className="flex flex-col space-y-4">
                {filteredResources.map((resource) => (
                  <li key={resource.key}>
                    <Link href={resource.url}>{resource.label}</Link>
                  </li>
                ))}
              </ul>
              <MobileAuthNav
                isAuthLoaded={isAuthLoaded}
                authEmail={authEmail}
              />
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

const MobileAuthNav = ({ authEmail, isAuthLoaded }: AuthNavProps) => {
  const isAuthenticated = authEmail !== undefined;

  if (!isAuthLoaded) {
    return <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ul className="flex flex-col space-y-4">
      <li className="text-muted-foreground">{authEmail}</li>
      <li>
        <Link href="/auth/logout">Logout</Link>
      </li>
    </ul>
  );
};

const DesktopNav = ({
  authEmail,
  isAuthLoaded,
  filteredResources,
}: NavProps) => {
  const isAuthenticated = authEmail !== undefined;

  return (
    <header className="bg-secondary hidden sm:block text-sm font-medium">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="font-bold text-secondary-foreground">
            <div>
              <Link href="/">MSKCon Admin</Link>
            </div>
          </div>

          <ul className="flex space-x-4 md:space-x-6 lg:space-x-8 py-4">
            {filteredResources.map((resource) => (
              <li key={resource.key}>
                <Link href={resource.url}>{resource.label}</Link>
              </li>
            ))}
          </ul>

          <DesktopAuthNav isAuthLoaded={isAuthLoaded} authEmail={authEmail} />
        </nav>
      </Container>
    </header>
  );
};

const DesktopAuthNav = ({ isAuthLoaded, authEmail }: AuthNavProps) => {
  const isAuthenticated = authEmail !== undefined;

  if (!isAuthLoaded) {
    return <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User2 size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{authEmail}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="block w-full" href="/auth/logout">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
