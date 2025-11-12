// src/features/patients/components/PatientForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PatientFormData, Room } from '../types';
import { createPatient, getAvailableRooms } from '../api';
import { showToast } from '../../components/ui/Toast';

interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: () => void;
}

export function PatientForm({ isOpen, onClose, onPatientAdded }: PatientFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientFormData>();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen: isCancelAlertOpen, onOpen: onCancelAlertOpen, onClose: onCancelAlertClose } = useDisclosure();
  // Using custom toast implementation
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Fetch available rooms when modal opens
    if (isOpen) {
      const fetchAvailableRooms = async () => {
        try {
          const rooms = await getAvailableRooms();
          setAvailableRooms(rooms);
        } catch (error) {
          console.error('Error fetching available rooms:', error);
          showToast('Failed to load available rooms', 'error');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAvailableRooms();
    }
  }, [isOpen]);

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare patient data for submission
      const patientData: PatientFormData = {
        name: data.name,
        gender: data.gender,
        disease: data.disease,
        room_id: data.room_id,
        deposited_amount: data.deposited_amount,
        // The backend will handle these fields
        admission_date: new Date().toISOString(),
        status: 'admitted',
        pending_amount: 0,
        total_amount: 0,
      };
      
      await createPatient(patientData);
      
      showToast('Patient added successfully', 'success');
      
      onPatientAdded();
      onClose();
      reset();
    } catch (error: any) {
      console.error('Error creating patient:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add patient';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (Object.keys(errors).length > 0) {
      onCancelAlertOpen();
    } else {
      onClose();
      reset();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCancel} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Enter patient name"
                    {...register('name', { required: 'Name is required' })}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    placeholder="Select gender"
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.disease}>
                  <FormLabel>Disease/Condition</FormLabel>
                  <Input
                    placeholder="Enter disease or condition"
                    {...register('disease', { required: 'Disease is required' })}
                  />
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.room_id}>
                  <FormLabel>Allocated Room</FormLabel>
                  <Select
                    placeholder="Select room"
                    {...register('room_id', { required: 'Room allocation is required' })}
                    isDisabled={isLoading}
                  >
                    {availableRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        Room {room.room_number}
                      </option>
                    ))}
                    {availableRooms.length === 0 && (
                      <option disabled>No available rooms</option>
                    )}
                  </Select>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.deposited_amount}>
                  <FormLabel>Deposited Amount (₹)</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter deposited amount"
                    {...register('deposited_amount', {
                      required: 'Deposit amount is required',
                      min: { value: 0, message: 'Amount cannot be negative' }
                    })}
                  />
                </FormControl>

                <HStack width="100%" spacing={4}>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    loading={isSubmitting}
                    loadingText="Adding..."
                    disabled={isLoading || availableRooms.length === 0}
                  >
                    Add Patient
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isCancelAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCancelAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to cancel? All unsaved changes will be lost.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancelAlertClose}>
                No, continue editing
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onCancelAlertClose();
                  onClose();
                  reset();
                }}
                ml={3}
              >
                Yes, discard changes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}