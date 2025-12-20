import { useEffect, useRef, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchAllTables, fetchTablesWithStatus } from "@/features/tabels/tableSlice";
import gsap from "gsap";
import {
  AdminTablesOverview,
  FeaturesGrid,
  QuickActionCard,
  QuickLinks,
  VisualTables,
  WelcomeHeader,
  TableManagement,
} from "./HomeLayoutComponents";

export default function HomeTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { allTables, tablesWithStatus, loading } = useAppSelector(
    state => state.tables
  );
  const navigate = useNavigate();
  const [showTableManagement, setShowTableManagement] = useState(false);
  const [tableCapacity, setTableCapacity] = useState("");

  const isAdmin = user?.role === "admin";

  // Get today's date and current time slot
  const getTodayAndTimeSlot = () => {
    const today = new Date().toISOString().split("T")[0];
    const hour = new Date().getHours();
    let timeSlot = "18:00-20:00";
    
    if (hour < 11) timeSlot = "09:00-11:00";
    else if (hour < 13) timeSlot = "11:00-13:00";
    else if (hour < 15) timeSlot = "13:00-15:00";
    else if (hour < 17) timeSlot = "15:00-17:00";
    else if (hour < 20) timeSlot = "18:00-20:00";
    else timeSlot = "20:00-22:00";
    
    return { today, timeSlot };
  };

  // Fetch tables data
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllTables());
    } else {
      const { today, timeSlot } = getTodayAndTimeSlot();
      dispatch(fetchTablesWithStatus({ date: today, timeSlot }));
    }
  }, [dispatch, isAdmin]);

  // GSAP animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, []);

  const handleTableClick = useCallback(
    () => {
      navigate("/create");
    },
    [navigate]
  );

  return (
    <div ref={containerRef} className="space-y-6">
      <WelcomeHeader isAdmin={isAdmin} />

      {/* USER SECTION - Visual Tables */}
      {user?.role === "user" && (
        <>
          <QuickActionCard
            title="Ready to Book?"
            description="Select a table from our available seating options below or create a custom reservation."
            buttonText="Create New Reservation"
            onButtonClick={() => navigate("/create")}
            isPrimary
          />

          {!loading && (
            <VisualTables tables={tablesWithStatus} onTableClick={handleTableClick} />
          )}

          <QuickLinks
            onMyReservations={() => navigate("/my-reservations")}
            onProfile={() => navigate("/profile")}
          />
        </>
      )}

      {/* ADMIN SECTION */}
      {isAdmin && (
        <>
          <QuickActionCard
            title="Admin Dashboard"
            description="Access the admin panel to manage all reservations, view table availability, and control bookings."
            buttonText="Go to Admin Panel"
            onButtonClick={() => navigate("/admin")}
            isPrimary
          />

          {/* TABLE MANAGEMENT TAB */}
          <TableManagement
            showTableManagement={showTableManagement}
            setShowTableManagement={setShowTableManagement}
            tableCapacity={tableCapacity}
            setTableCapacity={setTableCapacity}
          />

          <AdminTablesOverview allTables={allTables} loading={loading} />
        </>
      )}

      <FeaturesGrid isAdmin={isAdmin} />
    </div>
  );
}