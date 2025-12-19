import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { register } from "@/features/auth/authSlice";

export default function Register() {
  const navigate = useNavigate();
   const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(register({ name, email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

             <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
