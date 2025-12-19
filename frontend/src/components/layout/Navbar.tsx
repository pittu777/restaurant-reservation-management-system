import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logoutUser } from "@/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const handleLogout = useCallback(() => {
  dispatch(logoutUser());
  navigate("/login");
}, [dispatch, navigate]);

  const linkClass = (path: string) =>
    cn(
      "text-sm font-medium transition-colors",
      location.pathname === path
        ? "text-primary underline"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold">
            Restaurant Reservation
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>

            {user.role === "user" && (
              <>
                <Link to="/create" className={linkClass("/create")}>
                   New Reservation
                </Link>
                <Link
                  to="/my-reservations"
                  className={linkClass("/my-reservations")}
                >
                  My Reservations
                </Link>
                            <Link to="/profile" className={linkClass("/profile")}>
  Profile
</Link>
              </>
            )}

            {user.role === "admin" && (
              <Link to="/admin" className={linkClass("/admin")}>
                All Reservations
              </Link>
            )}

          </nav>
        </div>

        {/* Right: Role + Logout */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-xs rounded bg-muted px-2 py-1 capitalize">
            {user.name}
          </span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
         <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
       {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="flex flex-col px-4 py-2 gap-4">
            <Link to="/" className={linkClass("/")} onClick={() => setOpen(false)}>
              Home
            </Link>

            {user.role === "user" && (
              <>
                <Link
                  to="/profile"
                  className={linkClass("/profile")}
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/create"
                  className={linkClass("/create")}
                  onClick={() => setOpen(false)}
                >
                  New Reservation
                </Link>
                <Link
                  to="/my-reservations"
                  className={linkClass("/my-reservations")}
                  onClick={() => setOpen(false)}
                >
                  My Reservations
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <Link
                to="/admin"
                className={linkClass("/admin")}
                onClick={() => setOpen(false)}
              >
                All Reservations
              </Link>
            )}

            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleLogout}
              >
              Logout
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
