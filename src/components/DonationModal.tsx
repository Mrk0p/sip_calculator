import React from 'react';
import { X } from 'lucide-react';
import QRCode from 'react-qr-code';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  if (!isOpen) return null;

  const upiId = import.meta.env.VITE_UPI_ID; // Replace with your actual UPI ID
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Support Our Work</h2>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Your support helps us maintain and improve this calculator. Scan the QR code to donate:
          </p>

          <div className="bg-white p-4 inline-block rounded-lg shadow-md">
            <QRCode
              value={`upi://pay?pa=${upiId}&pn=SIP Calculator Donation`}
              size={200}
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>UPI ID: {upiId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}