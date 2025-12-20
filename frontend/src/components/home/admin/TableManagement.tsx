import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createTable, deleteTable, clearMessage, clearError } from "@/features/tabels/tableSlice";
import { useEffect, useState } from "react";

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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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
    setConfirmDelete(tableId);
  };

  const confirmTableDelete = () => {
    if (confirmDelete) {
      dispatch(deleteTable(confirmDelete));
      setConfirmDelete(null);
    }
  };

  const cancelTableDelete = () => {
    setConfirmDelete(null);
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
          {/* CREATE TABLE SECTION */}
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

          {/* DELETE TABLE SECTION */}
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

          {/* SUCCESS/ERROR MESSAGES */}
          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validation Error</AlertTitle>
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {confirmDelete && (
            <Alert className="bg-orange-50 border-orange-200">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Confirm Delete</AlertTitle>
              <AlertDescription className="text-orange-700 space-y-3">
                <p>Are you sure you want to delete this table? This action cannot be undone.</p>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={confirmTableDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Deleting..." : "Yes, Delete"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelTableDelete}
                    disabled={actionLoading}
                    className="border-orange-300"
                  >
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      )}
    </Card>
  );
}
