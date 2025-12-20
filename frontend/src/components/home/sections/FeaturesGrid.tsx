import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, Shield } from "lucide-react";

interface FeaturesGridProps {
  isAdmin: boolean;
}

export function FeaturesGrid({ isAdmin }: FeaturesGridProps) {
  const features = isAdmin
    ? [
        { icon: Calendar, title: "View All Bookings", desc: "See all reservations across all dates" },
        { icon: Users, title: "Manage Tables", desc: "View and manage all restaurant tables" },
        { icon: Clock, title: "Filter by Date", desc: "Search reservations by specific dates" },
        { icon: Shield, title: "Full Control", desc: "Cancel or modify any reservation" },
      ]
    : [
        { icon: Calendar, title: "Easy Booking", desc: "Select your preferred date and time slot in minutes" },
        { icon: Users, title: "Auto Table Assignment", desc: "System automatically finds the perfect table for your group" },
        { icon: Clock, title: "Instant Confirmation", desc: "Get immediate confirmation of your reservation" },
        { icon: Shield, title: "No Double Booking", desc: "Advanced system prevents table conflicts" },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <Card key={idx}>
            <CardHeader className="pb-3">
              <Icon className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
