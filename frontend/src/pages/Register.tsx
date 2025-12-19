import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { register } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
   const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

    const result = await dispatch(register({ name, email, password }));
    if (result.meta.requestStatus === "fulfilled") {
       toast.success("Account created successfully");
      navigate("/");
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Create your account
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Start reserving tables in seconds
        </p>
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

         <div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
  />
  <button
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    onClick={() => setShowPassword(prev => !prev)}
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>
<div className="relative">
  <Input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Re-enter Password"
    value={confirmPassword}
    onChange={e => setConfirmPassword(e.target.value)}
    required
  />
  <button
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    onClick={() => setShowConfirmPassword(prev => !prev)}
  >
    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>



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
  );
}
