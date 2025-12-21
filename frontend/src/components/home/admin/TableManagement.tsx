import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmationAlert } from "@/components/ui/ConfirmationAlert";
import { Notification } from "@/components/ui/Notification";
import { Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createTable, deleteTable, clearMessage, clearError } from "@/features/tabels/tableSlice";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/hooks/useConfirmation";

interface TableManagementProps {
  showTableManagement: boolean;
  setShowTableManagement: (show: boolean) => void;
  tableCapacity: string;
  setTableCapacity: (capacity: string) => void;
}

export function TableManagement({
  showTableManagement,
  setShowTableManagement,
  tableCapacity,
  setTableCapacity,
}: TableManagementProps) {
  const dispatch = useAppDispatch();
  const { allTables, actionLoading, error, message } = useAppSelector(
    state => state.tables
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [pendingTableId, setPendingTableId] = useState<string | null>(null);
  const confirmation = useConfirmation();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => {
        setValidationError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [validationError]);

  const handleCreateTable = async () => {
    if (!tableCapacity || parseInt(tableCapacity) <= 0) {
      setValidationError("Please enter a valid capacity (1-20)");
      return;
    }

    if (parseInt(tableCapacity) > 20) {
      setValidationError("Table capacity cannot exceed 20 seats");
      return;
    }

    dispatch(createTable(parseInt(tableCapacity)));
    setTableCapacity("");
  };

  const handleDeleteTable = (tableId: string) => {
    setPendingTableId(tableId);
    confirmation.openConfirmation(
      "Delete Table",
      "Are you sure you want to delete this table? This action cannot be undone.",
      {
        confirmText: "Yes, Delete",
        cancelText: "No, Keep",
        variant: "destructive",
      }
    );
  };

  const confirmTableDelete = () => {
    if (pendingTableId) {
      dispatch(deleteTable(pendingTableId));
      confirmation.closeConfirmation();
      setPendingTableId(null);
    }
  };

  const cancelTableDelete = () => {
    confirmation.closeConfirmation();
    setPendingTableId(null);
  };

  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-amber-900">Manage Tables</CardTitle>
            <CardDescription className="text-amber-700">
              Create new tables or remove existing ones
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTableManagement(!showTableManagement)}
            className="border-amber-300 hover:bg-amber-100"
          >
            {showTableManagement ? "Hide" : "Show"}
          </Button>
        </div>
      </CardHeader>

      {showTableManagement && (
        <CardContent className="space-y-4">
          <div className="space-y-3 p-4 rounded-lg bg-white border border-amber-100">
            <h3 className="font-semibold text-amber-900">Create New Table</h3>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Table capacity (e.g., 4, 6, 8)"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(e.target.value)}
                min="1"
                max="20"
                className="flex-1"
              />
              <Button
                onClick={handleCreateTable}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={actionLoading}
              >
                <Plus className="w-4 h-4 mr-1" />
                {actionLoading ? "Adding..." : "Add Table"}
              </Button>
            </div>
          </div>


          <div className="space-y-3 p-4 rounded-lg bg-white border border-amber-100">
            <h3 className="font-semibold text-amber-900">Delete Table</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {allTables.map((table: any) => (
                <Button
                  key={table._id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTable(table._id)}
                  disabled={actionLoading}
                  className="border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Table {table.tableNumber} ({table.capacity})
                </Button>
              ))}
            </div>
          </div>


          {validationError && (
            <Notification
              type="error"
              title="Validation Error"
              message={validationError}
              duration={3000}
              onClose={() => setValidationError(null)}
            />
          )}

          {message && (
            <Notification
              type="success"
              title="Success"
              message={message}
              duration={2000}
              onClose={() => dispatch(clearMessage())}
            />
          )}

          {error && (
            <Notification
              type="error"
              title="Error"
              message={error}
              duration={3000}
              onClose={() => dispatch(clearError())}
            />
          )}


          <ConfirmationAlert
            isOpen={confirmation.isOpen}
            title={confirmation.title}
            description={confirmation.description}
            confirmText={confirmation.confirmText}
            cancelText={confirmation.cancelText}
            variant={confirmation.variant as any}
            isLoading={actionLoading}
            onConfirm={confirmTableDelete}
            onCancel={cancelTableDelete}
          />
        </CardContent>
      )}
    </Card>
  );
}
