import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createReservation } from "@/features/reservations/reservationSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import gsap from "gsap";

export function CreateReservationForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.reservations);
  const formRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState(2);

  
  useEffect(() => {
    if (!formRef.current) return;

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  
  useEffect(() => {
    if (error) {
      const errorElement = formRef.current?.querySelector(
        "[data-error-message]"
      );
      if (errorElement) {
        gsap.fromTo(
          errorElement,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }
  }, [error]);

  const isPastDateTime = () => {
    if (!date || !timeSlot) return false;

    const [start] = timeSlot.split("-");
    const reservationDateTime = new Date(`${date}T${start}:00`);
    const now = new Date();

    return reservationDateTime < now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isPastDateTime()) {
      toast.error("You cannot book a past date or time slot");
      return;
    }
    const submitButton = formRef.current?.querySelector(
      "button[type='submit']"
    );
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    const result = await dispatch(
      createReservation({ date, timeSlot, guests })
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Reservation created successfully!");

      // Animate success - shake form
      gsap.to(formRef.current, {
        x: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
      });

      // Reset form with stagger
      gsap.to(
        [
          formRef.current?.querySelector("input[type='date']"),
          formRef.current?.querySelector("[role='combobox']"),
          formRef.current?.querySelector("input[type='number']"),
        ],
        {
          opacity: 0,
          duration: 0.3,
          stagger: 0.1,
          onComplete: () => {
            setDate("");
            setTimeSlot("");
            setGuests(2);

            gsap.to(
              [
                formRef.current?.querySelector("input[type='date']"),
                formRef.current?.querySelector("[role='combobox']"),
                formRef.current?.querySelector("input[type='number']"),
              ],
              {
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
              }
            );
          },
        }
      );
    }

    if (result.meta.requestStatus === "rejected") {
      toast.error("No available table for the selected time slot");

      // Animate error shake
      gsap.to(formRef.current, {
        x: -5,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div ref={formRef}>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Create Your Reservation</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select your preferred date, time, and number of guests
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid gap-4 md:grid-cols-3">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date *</label>
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                />
              </div>

             
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Slot *</label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger className="cursor-pointer hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer border shadow-md bg-gray-500">
                    <SelectItem value="09:00-11:00">09:00 – 11:00</SelectItem>
                    <SelectItem value="12:00-14:00">12:00 – 14:00</SelectItem>
                    <SelectItem value="14:00-16:00">14:00 – 16:00</SelectItem>
                    <SelectItem value="18:00-20:00">18:00 – 20:00</SelectItem>
                    <SelectItem value="20:00-22:00">20:00 – 22:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Guests *</label>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={guests}
                  onChange={e => setGuests(Math.max(1, Number(e.target.value)))}
                  placeholder="Guests"
                  required
                  className="hover:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                data-error-message
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2"
              >
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form Instructions */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                📋 How it works:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
                <li>Select a future date (not in the past)</li>
                <li>Choose your preferred time slot</li>
                <li>Tell us how many guests will be dining</li>
                <li>We'll automatically assign the best available table</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !date || !timeSlot}
              size="lg"
              className="w-full font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  Booking Table...
                </span>
              ) : (
                "Reserve Table"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}