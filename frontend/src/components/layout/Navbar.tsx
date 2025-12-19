import { Button } from "./../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-lg font-semibold">
          Restaurant Reservation
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground capitalize">
            {user.role}
          </span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
