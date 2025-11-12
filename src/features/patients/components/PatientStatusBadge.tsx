import React from 'react';
import { PatientStatus } from '../types';
import { Button, Menu, MenuButton, MenuList, MenuItem, Box, Badge } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface PatientStatusBadgeProps {
  status: PatientStatus;
  onStatusChange?: (newStatus: PatientStatus) => void;
  isEditable?: boolean;
}

const statusColors: Record<PatientStatus, string> = {
  'Admitted': 'blue',
  'Under Observation': 'yellow',
  'Critical': 'red',
  'Discharged': 'green',
  'Released': 'purple'
};

export const PatientStatusBadge: React.FC<PatientStatusBadgeProps> = ({
  status,
  onStatusChange,
  isEditable = false
}) => {
  const statusList: PatientStatus[] = ['Admitted', 'Under Observation', 'Critical', 'Discharged', 'Released'];
  
  if (!isEditable) {
    return (
      <Badge colorScheme={statusColors[status]} px={2} py={1} borderRadius="md">
        {status}
      </Badge>
    );
  }

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<ChevronDownIcon />} 
        size="sm" 
        colorScheme={statusColors[status]}
        variant="outline"
      >
        {status}
      </MenuButton>
      <MenuList>
        {statusList.map((s) => (
          <MenuItem 
            key={s} 
            onClick={() => onStatusChange && onStatusChange(s)}
            color={statusColors[s]}
          >
            {s}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PatientStatusBadge;
