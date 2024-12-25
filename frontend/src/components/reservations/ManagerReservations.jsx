import { useState, useEffect } from 'react';
import ReservationList from './ReservationList';
import useAuthStore from '../../store/authStore';

// Mock data - replace with actual API calls
const mockManagerReservations = [
  {
    id: 1,
    parkingLot: 'Downtown Parking',
    spotNumber: 'A12',
    startTime: '2024-03-15T10:00:00',
    duration: 2,
    status: 'Active',
    total: 10.00
  },
  {
    id: 2,
    parkingLot: 'Downtown Parking',
    spotNumber: 'A15',
    startTime: '2024-03-14T14:00:00',
    duration: 3,
    status: 'Completed',
    total: 15.00
  },
  {
    id: 3,
    parkingLot: 'Mall Parking',
    spotNumber: 'B10',
    startTime: '2024-03-16T09:00:00',
    duration: 4,
    status: 'Active',
    total: 20.00
  }
];

export default function ManagerReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLot, setSelectedLot] = useState('all');
  const { user } = useAuthStore();

  const parkingLots = ['Downtown Parking', 'Mall Parking'];

  useEffect(() => {
    // Simulate API call
    const fetchReservations = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const filteredReservations = selectedLot === 'all'
          ? mockManagerReservations
          : mockManagerReservations.filter(r => r.parkingLot === selectedLot);
        setReservations(filteredReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [selectedLot, user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Parking Lot Reservations</h1>
        <p className="mt-2 text-gray-600">Manage reservations for your parking lots</p>
      </div>

      <div className="mb-6">
        <label htmlFor="parking-lot" className="block text-sm font-medium text-gray-700">
          Filter by Parking Lot
        </label>
        <select
          id="parking-lot"
          value={selectedLot}
          onChange={(e) => setSelectedLot(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">All Parking Lots</option>
          {parkingLots.map((lot) => (
            <option key={lot} value={lot}>
              {lot}
            </option>
          ))}
        </select>
      </div>

      <ReservationList
        reservations={reservations}
        isLoading={isLoading}
      />
    </div>
  );
}