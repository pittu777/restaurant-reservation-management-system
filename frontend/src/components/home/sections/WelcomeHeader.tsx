interface WelcomeHeaderProps {
  isAdmin: boolean;
}

export function WelcomeHeader({ isAdmin }: WelcomeHeaderProps) {
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
