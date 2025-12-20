import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works</CardTitle>
      </CardHeader>
      <CardContent>
        {isAdmin ? (
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>View all customer reservations in real-time</li>
            <li>Filter reservations by date for better management</li>
            <li>Cancel or update any reservation as needed</li>
            <li>See all available tables and their capacities</li>
            <li>Track booking patterns and restaurant utilization</li>
          </ul>
        ) : (
          <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Check table availability for your preferred date and time</li>
            <li>Click "Create New Reservation" from the navbar</li>
            <li>Select your date, time slot, and number of guests</li>
            <li>System automatically assigns a suitable table</li>
            <li>Your reservation is instantly confirmed</li>
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
