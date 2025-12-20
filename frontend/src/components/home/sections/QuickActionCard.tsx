import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
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
}: QuickActionCardProps) {
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
