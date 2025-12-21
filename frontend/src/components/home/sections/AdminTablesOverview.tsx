import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
