import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  return (
    <ToggleGroup
      type='single'
      size='sm'
      variant='outline'
      spacing={2}
      className='flex flex-wrap'
      value={selectedTime}
      onValueChange={setSelectedTime}
    >
      <ToggleGroupItem value='08:00' aria-label=''>
        08:00
      </ToggleGroupItem>
      <ToggleGroupItem value='09:40' aria-label=''>
        09:40
      </ToggleGroupItem>
      <ToggleGroupItem value='15:30' aria-label=''>
        15:30
      </ToggleGroupItem>
      <ToggleGroupItem value='16:00' aria-label=''>
        16:00
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TimeSelector;
