import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Restaurant Reservation System</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            This application allows customers to reserve tables for specific
            dates and time slots while preventing double bookings.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc pl-5 space-y-1">
            <li>Select date, time slot, and number of guests</li>
            <li>System assigns a suitable table automatically</li>
            <li>View or cancel your reservations anytime</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
