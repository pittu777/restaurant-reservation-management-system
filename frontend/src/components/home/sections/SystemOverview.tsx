import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";

export function SystemOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Role */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Customer Role
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Check real-time table availability</li>
              <li>Create new reservations</li>
              <li>View personal reservations</li>
              <li>Cancel own bookings</li>
              <li>Update profile information</li>
            </ul>
          </div>

          {/* Admin Role */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Administrator Role
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>View all reservations</li>
              <li>Filter by date</li>
              <li>Cancel any reservation</li>
              <li>View all restaurant tables</li>
              <li>Manage restaurant operations</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
