import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

                  {/* Available Badge */}
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
                  {/* Table Number */}
                  <div className={`text-xl font-bold mb-2 ${getTextColor(table.capacity, true)}`}>
                    Table {table.tableNumber}
                  </div>

                  {/* Seats Visualization */}
                  <div className="flex flex-wrap gap-1.5 mb-3 justify-center">
                    {Array.from({ length: table.capacity }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-2 h-2 rounded-full bg-red-500"
                      />
                    ))}
                  </div>

                  {/* Capacity Info */}
                  <div className="text-xs font-semibold mb-1">
                    {table.capacity} Seats
                  </div>
                  <div className={`text-xs font-medium ${getTextColor(table.capacity, true)}`}>
                    {getTableType(table.capacity)}
                  </div>

                  {/* Booked Badge */}
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
