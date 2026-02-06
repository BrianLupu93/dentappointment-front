import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined,
  );

  const services = [
    { id: "id1", name: "serviceName1", duration: 30 },
    { id: "id2", name: "serviceName2", duration: 30 },
    { id: "id3", name: "serviceName3", duration: 30 },
    { id: "id4", name: "serviceName4", duration: 30 },
  ];

  return (
    <ToggleGroup
      type='single'
      size='sm'
      variant='outline'
      spacing={2}
      className='flex flex-wrap'
      value={selectedService}
      onValueChange={setSelectedService}
    >
      {services.map((service) => (
        <ToggleGroupItem
          key={service.id}
          value={service.id}
          aria-label={service.name}
        >
          {service.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ServiceSelector;
