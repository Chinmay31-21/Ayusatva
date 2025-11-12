import React from 'react';
import { PatientStatus } from '../types';
import { Button, Menu, MenuButton, MenuList, MenuItem, Badge } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface PatientStatusBadgeProps {
  status: PatientStatus;
  onStatusChange?: (newStatus: PatientStatus) => void;
  isEditable?: boolean;
}

const statusColors: Record<PatientStatus, string> = {
  'admitted': 'blue',
  'discharged': 'green',
  'pending': 'yellow'
};

const statusLabels: Record<PatientStatus, string> = {
  'admitted': 'Admitted',
  'discharged': 'Discharged',
  'pending': 'Pending'
};

export const PatientStatusBadge: React.FC<PatientStatusBadgeProps> = ({
  status,
  onStatusChange,
  isEditable = false
}) => {
  const statusList: PatientStatus[] = ['admitted', 'discharged', 'pending'];
  
  if (!isEditable) {
    return (
      <Badge 
        colorScheme={statusColors[status]} 
        px={3} 
        py={1} 
        borderRadius="full"
        textTransform="capitalize"
        fontWeight="medium"
      >
        {statusLabels[status]}
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
        textTransform="capitalize"
      >
        {statusLabels[status]}
      </MenuButton>
      <MenuList minW="fit-content">
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
