import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  IconButton,
  useToast,
  Badge,
  Flex,
  Heading,
  Spinner,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { PatientForm } from '../../features/patients/components/PatientForm';
import { PatientStatusBadge } from '../../features/patients/components/PatientStatusBadge';
import { getPatients, deletePatient, Patient, PatientStatus } from '../../features/patients/api';

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'all'>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const data = await getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      toast({
        title: 'Error fetching patients',
        description: 'Failed to load patient data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    let result = [...patients];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(patient => patient.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        patient =>
          patient.name.toLowerCase().includes(term) ||
          patient.id.toLowerCase().includes(term) ||
          (patient.room_number && patient.room_number.toLowerCase().includes(term))
      );
    }
    
    setFilteredPatients(result);
  }, [searchTerm, statusFilter, patients]);

  const handleDeletePatient = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
        toast({
          title: 'Patient deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error deleting patient',
          description: 'Failed to delete patient',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleStatusChange = async (id: string, status: PatientStatus) => {
    try {
      // In a real app, you would call updatePatientStatus here
      // await updatePatientStatus(id, status);
      
      // For now, just update the local state
      setPatients(patients.map(patient => 
        patient.id === id ? { ...patient, status } : patient
      ));
      
      toast({
        title: 'Status updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePatientAdded = () => {
    fetchPatients();
    toast({
      title: 'Patient added successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Patient Management</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Patient
        </Button>
      </Flex>

      {/* Filters */}
      <HStack mb={6} spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
          />
        </InputGroup>
        
        <Select
          placeholder="Filter by status"
          w="200px"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PatientStatus | 'all')}
          bg="white"
        >
          <option value="all">All Status</option>
          <option value="admitted">Admitted</option>
          <option value="discharged">Discharged</option>
          <option value="pending">Pending</option>
        </Select>
      </HStack>

      {isLoading ? (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Gender</Th>
                <Th>Disease</Th>
                <Th>Room</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <Tr key={patient.id} _hover={{ bg: 'gray.50' }}>
                    <Td fontWeight="medium">{patient.id}</Td>
                    <Td>{patient.name}</Td>
                    <Td textTransform="capitalize">{patient.gender}</Td>
                    <Td>{patient.disease}</Td>
                    <Td>{patient.room_number || 'N/A'}</Td>
                    <Td>
                      <PatientStatusBadge 
                        status={patient.status} 
                        onStatusChange={(status) => handleStatusChange(patient.id, status)}
                        isEditable={true}
                      />
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Edit patient"
                          icon={<EditIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => {
                            // Handle edit
                            // You would typically open a modal with the patient data here
                            console.log('Edit patient:', patient.id);
                          }}
                        />
                        <IconButton
                          aria-label="Delete patient"
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeletePatient(patient.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center" py={8}>
                    <Text color="gray.500">No patients found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      <PatientForm
        isOpen={isOpen}
        onClose={onClose}
        onPatientAdded={handlePatientAdded}
      />
    </Box>
  );
}
