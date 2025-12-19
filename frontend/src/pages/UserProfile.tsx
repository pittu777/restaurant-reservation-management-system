import { useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserProfile() {
  const user = useAppSelector(state => state.auth.user);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Name:</span>{" "}
            {user.name}
          </div>

          <div>
            <span className="font-medium">Email:</span>{" "}
            {user.email}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Role:</span>
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
