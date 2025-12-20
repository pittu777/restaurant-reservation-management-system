import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickLinksProps {
  onMyReservations: () => void;
  onProfile: () => void;
}

export function QuickLinks({ onMyReservations, onProfile }: QuickLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="justify-start"
          onClick={onMyReservations}
        >
          View My Reservations
        </Button>
        <Button
          variant="outline"
          className="justify-start"
          onClick={onProfile}
        >
          My Profile
        </Button>
      </CardContent>
    </Card>
  );
}
