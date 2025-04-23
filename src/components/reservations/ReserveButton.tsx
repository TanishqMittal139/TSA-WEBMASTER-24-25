
import React from "react";
import { Button } from "@/components/ui/button";

type Props = { isSubmitting: boolean };

const ReserveButton: React.FC<Props> = ({ isSubmitting }) => (
  <Button 
    type="submit"
    className="w-full"
    size="lg"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Processing..." : "Confirm Reservation"}
  </Button>
);

export default ReserveButton;
