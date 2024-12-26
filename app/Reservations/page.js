'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function page() {
  const [showModal, setShowModal] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    reservationDate: '',
    reservationTime: '',
    tableNumber: '',
    personCount: '',
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedDateTime = new Date(`${formData.reservationDate}T${formData.reservationTime}`);
      const reservationData = {
        ...formData,
        date: combinedDateTime,
      };
      await axios.post('/api/reservations', reservationData);
      await fetchReservations();
      setShowModal(false);
      setFormData({
        customerName: '',
        phoneNumber: '',
        reservationDate: '',
        reservationTime: '',
        tableNumber: '',
        personCount: '',
        status: 'pending',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  // Add handleCancelReservation function
  const handleCancelReservation = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await axios.delete(`/api/reservations/${id}`);
        // Refresh reservations list
        fetchReservations();
      } catch (error) {
        console.error('Error cancelling reservation:', error);
        alert('Failed to cancel reservation');
      }
    }
  };

  return (
    <div>
      <div className="reservations-title flex flex-row h-6 w-9 items-center">
        <div className="title text-xl"><h1>Reservations</h1></div>
        <div className="bg-slate-100 p-1 mx-4 border-2 rounded-xl">
          <button onClick={() => setShowModal(true)}>+New</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl mb-4">New Reservation</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Customer Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="w-full p-2 border rounded"
                  placeholder="Enter 10 digit number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Reservation Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.reservationDate}
                  onChange={(e) => setFormData({...formData, reservationDate: e.target.value})}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Reservation Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded"
                  value={formData.reservationTime}
                  onChange={(e) => setFormData({...formData, reservationTime: e.target.value})}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Table Number</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.tableNumber}
                  onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
                  required
                >
                  <option value="">Select Table</option>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>Table {num}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Person Count</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={formData.personCount}
                  onChange={(e) => setFormData({...formData, personCount: e.target.value})}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Notes</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          
        </div>
      )}

      {/* Reservations Cards */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{reservation.customerName}</h3>
                  <p className="text-sm text-gray-500">{reservation.phoneNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                    reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {reservation.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(reservation.date).toLocaleDateString()}</span>
                  <span className="ml-2">{new Date(reservation.date).toLocaleTimeString()}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{reservation.personCount} persons • Table {reservation.tableNumber}</span>
                </div>
                
                {reservation.notes && (
                  <div className="text-gray-600 mt-2">
                    <p className="text-sm italic">"{reservation.notes}"</p>
                  </div>
                )}
                <button 
                  onClick={() => handleCancelReservation(reservation._id)}
                  className='bg-red-400 hover:bg-red-500 text-white p-2 border-2 rounded-xl'
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
