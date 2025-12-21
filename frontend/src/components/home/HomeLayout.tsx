
import { Calendar, Users, Clock, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export function WelcomeHeader({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">🍽️ Welcome to Restaurant Reservation</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {isAdmin
          ? "Manage all restaurant reservations and tables efficiently"
          : "Reserve your perfect table for an unforgettable dining experience"}
      </p>
    </div>
  );
}


interface QuickActionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isPrimary?: boolean;
}

export function QuickActionCard({
  title,
  description,
  buttonText,
  onButtonClick,
  isPrimary,
}: QuickActionProps) {
  return (
    <Card className={isPrimary ? "border-primary/20 bg-primary/5" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <Button
          size="lg"
          onClick={onButtonClick}
          className="w-full sm:w-auto"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}


interface AdminTablesOverviewProps {
  allTables: any[];
  loading: boolean;
}

export function AdminTablesOverview({ allTables, loading }: AdminTablesOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Tables Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading tables...</p>
        ) : (
          <>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-muted-foreground mb-1">Total Tables</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {allTables.length}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-muted-foreground mb-1">
                  Small Tables (1-2 guests)
                </p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {allTables.filter(t => t.capacity <= 2).length}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-muted-foreground mb-1">
                  Large Tables (4+ guests)
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {allTables.filter(t => t.capacity >= 4).length}
                </p>
              </div>
            </div>

            
            {allTables.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">
                        Table Number
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Capacity
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTables.map((table, idx) => (
                      <tr
                        key={table._id}
                        className={
                          idx % 2 === 0
                            ? "bg-muted/50 border-b"
                            : "border-b"
                        }
                      >
                        <td className="px-4 py-3 font-medium">
                          Table {table.tableNumber}
                        </td>
                        <td className="px-4 py-3">
                          {table.capacity} Guest{table.capacity > 1 ? "s" : ""}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                            {table.capacity <= 2
                              ? "Couple"
                              : table.capacity <= 4
                              ? "Small Group"
                              : table.capacity <= 8
                              ? "Large Group"
                              : "Extra Large"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                            Available
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tables found
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}


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


interface Table {
  _id: string;
  tableNumber: number;
  capacity: number;
  isBooked?: boolean;
}

interface VisualTablesProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
}

export function VisualTables({ tables, onTableClick }: VisualTablesProps) {
  const getTableColor = (capacity: number, isBooked: boolean) => {
    if (isBooked) return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 opacity-60 cursor-not-allowed";
    if (capacity <= 2) return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:shadow-lg hover:scale-105";
    if (capacity <= 4) return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:shadow-lg hover:scale-105";
    if (capacity <= 8) return "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 hover:shadow-lg hover:scale-105";
    return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 hover:shadow-lg hover:scale-105";
  };

  const getTableType = (capacity: number) => {
    if (capacity <= 2) return "Couple";
    if (capacity <= 4) return "Small";
    if (capacity <= 8) return "Large";
    return "Extra Large";
  };

  const getTextColor = (capacity: number, isBooked: boolean) => {
    if (isBooked) return "text-red-700 dark:text-red-300";
    if (capacity <= 2) return "text-blue-700 dark:text-blue-300";
    if (capacity <= 4) return "text-green-700 dark:text-green-300";
    if (capacity <= 8) return "text-purple-700 dark:text-purple-300";
    return "text-orange-700 dark:text-orange-300";
  };

  const availableTables = tables.filter(t => !t.isBooked);
  const bookedTables = tables.filter(t => t.isBooked);

  return (
    <div className="space-y-6">
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Tables</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Click on any table to book your reservation
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {availableTables.length}
              </p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {availableTables.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableTables.map(table => (
                <button
                  key={table._id}
                  onClick={() => onTableClick(table)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${getTableColor(table.capacity, false)}`}
                >
                 
                  <div className={`text-xl font-bold mb-2 ${getTextColor(table.capacity, false)}`}>
                    Table {table.tableNumber}
                  </div>

                  
                  <div className="flex flex-wrap gap-1.5 mb-3 justify-center">
                    {Array.from({ length: table.capacity }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    ))}
                  </div>

                  
                  <div className="text-xs font-semibold mb-1">
                    {table.capacity} Seats
                  </div>
                  <div className={`text-xs font-medium ${getTextColor(table.capacity, false)}`}>
                    {getTableType(table.capacity)}
                  </div>

                  
                  <div className="mt-3 inline-block px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs font-semibold">
                    Available
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No available tables at the moment</p>
            </div>
          )}
        </CardContent>
      </Card>

      
      {bookedTables.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Booked Tables</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  These tables are currently reserved
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {bookedTables.length}
                </p>
                <p className="text-xs text-muted-foreground">Booked</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bookedTables.map(table => (
                <div
                  key={table._id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${getTableColor(table.capacity, true)}`}
                >
                  
                  <div className={`text-xl font-bold mb-2 ${getTextColor(table.capacity, true)}`}>
                    Table {table.tableNumber}
                  </div>

                  
                  <div className="flex flex-wrap gap-1.5 mb-3 justify-center">
                    {Array.from({ length: table.capacity }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-2 h-2 rounded-full bg-red-500"
                      />
                    ))}
                  </div>

                  
                  <div className="text-xs font-semibold mb-1">
                    {table.capacity} Seats
                  </div>
                  <div className={`text-xs font-medium ${getTextColor(table.capacity, true)}`}>
                    {getTableType(table.capacity)}
                  </div>

                  
                  <div className="mt-3 inline-block px-2 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-xs font-semibold">
                    Booked
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}