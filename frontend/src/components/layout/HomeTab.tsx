import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomeTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome 👋</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            This system allows you to reserve restaurant tables based on
            availability and seating capacity.
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>No double bookings</li>
            <li>Automatic table assignment</li>
            <li>Easy reservation management</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How reservations work</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Select date, time slot, and guests</li>
            <li>The system checks availability</li>
            <li>A suitable table is assigned automatically</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
