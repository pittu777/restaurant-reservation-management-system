import { useEffect, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchAvailableTables, fetchAllTables } from "@/features/tabels/tableSlice";
import gsap from "gsap";
import { AdminTablesOverview, AvailabilityFilter, AvailabilityStats, FeaturesGrid, HowItWorks, QuickActionCard, QuickLinks, SystemOverview, WelcomeHeader } from "./HomeLayout";


// ==================== HEADER COMPONENT ====================


// ==================== MAIN COMPONENT ====================
export default function HomeTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { availability, allTables, loading } = useAppSelector(
    state => state.tables
  );
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("18:00-20:00");
  const [selectedGuests, setSelectedGuests] = useState(2);

  const isAdmin = user?.role === "admin";

  // Fetch initial data
  useEffect(() => {
    if (user?.role === "user") {
      dispatch(
        fetchAvailableTables({
          date: selectedDate,
          timeSlot: selectedTime,
          guests: selectedGuests,
        })
      );
    }

    if (isAdmin) {
      dispatch(fetchAllTables());
    }
  }, [dispatch, user?.role, selectedDate, selectedTime, selectedGuests, isAdmin]);

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

  const getAvailabilityColor = useCallback(() => {
    if (!availability) return "gray";
    if (availability.available === 0) return "red";
    if (availability.available <= 2) return "orange";
    return "green";
  }, [availability]);

  const availabilityPercentage = useCallback(() => {
    if (!availability) return 0;
    return Math.round((availability.available / availability.total) * 100);
  }, [availability]);

  return (
    <div ref={containerRef} className="space-y-6">
      <WelcomeHeader isAdmin={isAdmin} />

      
      {user?.role === "user" && (
        <>
          <AvailabilityFilter
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedGuests={selectedGuests}
            loading={loading}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onGuestsChange={setSelectedGuests}
          />

          {!loading && availability && (
            <AvailabilityStats
              availability={availability}
              selectedGuests={selectedGuests}
              getAvailabilityColor={getAvailabilityColor}
              availabilityPercentage={availabilityPercentage}
              onBookClick={() => navigate("/create")}
            />
          )}

          <QuickActionCard
            title="Ready to Book?"
            description="Once you've checked availability, create a new booking and our system will automatically assign you the best table."
            buttonText="Create New Reservation"
            onButtonClick={() => navigate("/create")}
            isPrimary
          />
        </>
      )}

      
      {isAdmin && (
        <>
          <QuickActionCard
            title="Admin Dashboard"
            description="Access the admin panel to manage all reservations, view table availability, and control bookings."
            buttonText="Go to Admin Panel"
            onButtonClick={() => navigate("/admin")}
            isPrimary
          />

          <AdminTablesOverview allTables={allTables} loading={loading} />
        </>
      )}

      <FeaturesGrid isAdmin={isAdmin} />
      <HowItWorks isAdmin={isAdmin} />
      <SystemOverview />

      {user?.role === "user" && (
        <QuickLinks
          onMyReservations={() => navigate("/my-reservations")}
          onProfile={() => navigate("/profile")}
        />
      )}
    </div>
  );
}