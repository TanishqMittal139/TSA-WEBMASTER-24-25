
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = { control: any };

const SpecialRequestsField: React.FC<Props> = ({ control }) => (
  <FormField
    control={control}
    name="specialRequests"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Special Requests (Optional)</FormLabel>
        <FormControl>
          <Input placeholder="Any allergies or special seating preferences?" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default SpecialRequestsField;
