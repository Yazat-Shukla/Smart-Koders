
import React, { useState } from 'react';
import {
  TicketCheck,
  Download,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';

import { useTrip } from '../context/TripContext';
import { formatINR } from '../services/mockApi';
import BookingCard from '../components/BookingCard';
import Modal from '../components/Modal';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Bookings() {
  const { bookings, userProfile, showToast } = useTrip();

  const [filterType, setFilterType] = useState('All');
  const [modalView, setModalView] = useState(null);

  const categories = ['All', 'Flight', 'Hotel', 'Activity', 'Transfer'];

  const filteredBookings = bookings.filter(
    (booking) =>
      filterType === 'All' || booking.type === filterType
  );

  // Download professional PDF voucher
  const handleDownloadVoucher = (booking) => {
    try {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header
      doc.setFillColor(16, 42, 67);
      doc.rect(0, 0, pageWidth, 42, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('TRIPPILOT AI', 15, 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Your Intelligent Travel Companion', 15, 26);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('TRAVEL VOUCHER', pageWidth - 15, 19, {
        align: 'right'
      });

      doc.setFontSize(8);
      doc.text('DEMONSTRATION DOCUMENT', pageWidth - 15, 27, {
        align: 'right'
      });

      // Demonstration notice
      doc.setTextColor(180, 100, 20);
      doc.setFontSize(9);
      doc.text(
        'Demonstration record only. Not a live carrier ticket.',
        15,
        52
      );

      // Booking information
      doc.setTextColor(16, 42, 67);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('Booking Information', 15, 65);

      autoTable(doc, {
        startY: 71,
        margin: { left: 15, right: 15, bottom: 25 },
        theme: 'grid',
        head: [['Field', 'Details']],
        body: [
          ['Booking ID', String(booking.id || 'N/A')],
          ['Reference Code', String(booking.reference || 'N/A')],
          ['Category', String(booking.type || 'N/A')],
          ['Status', String(booking.status || 'N/A')],
          ['Service / Title', String(booking.title || 'N/A')],
          ['Supplier', String(booking.provider || 'N/A')],
          ['Destination', String(booking.destination || 'N/A')],
          ['Travel Schedule', String(booking.dates || 'N/A')],
          ['Estimated Amount', formatINR(booking.price || 0)],
          ['Additional Details', String(booking.details || 'N/A')]
        ],
        headStyles: {
          fillColor: [16, 42, 67],
          textColor: [255, 255, 255]
        },
        styles: {
          font: 'helvetica',
          fontSize: 9,
          cellPadding: 4,
          overflow: 'linebreak'
        },
        columnStyles: {
          0: { cellWidth: 55, fontStyle: 'bold' },
          1: { cellWidth: 120 }
        }
      });

      // Traveller information
      let y = doc.lastAutoTable.finalY + 14;

      if (y > pageHeight - 55) {
        doc.addPage();
        y = 25;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(16, 42, 67);
      doc.text('Traveller Information', 15, y);

      autoTable(doc, {
        startY: y + 6,
        margin: { left: 15, right: 15, bottom: 25 },
        theme: 'grid',
        body: [
          ['Primary Traveller', String(userProfile?.name || 'N/A')],
          ['Email Address', String(userProfile?.email || 'N/A')]
        ],
        styles: {
          font: 'helvetica',
          fontSize: 9,
          cellPadding: 4
        },
        columnStyles: {
          0: { cellWidth: 55, fontStyle: 'bold' },
          1: { cellWidth: 120 }
        }
      });

      // Footer on every page
      const totalPages = doc.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 210, 220);
        doc.line(15, pageHeight - 17, pageWidth - 15, pageHeight - 17);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 110, 125);

        doc.text(
          'TripPilot AI | Your Intelligent Travel Companion',
          15,
          pageHeight - 10
        );

        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - 15,
          pageHeight - 10,
          { align: 'right' }
        );
      }

      // Save PDF
      const fileReference = booking.reference || booking.id || 'booking';

      doc.save(`TripPilot-Voucher-${fileReference}.pdf`);

      showToast?.(
        `Downloaded PDF voucher for ${fileReference}.`
      );
    } catch (error) {
      console.error('PDF voucher generation failed:', error);
      showToast?.('Unable to generate PDF voucher. Please try again.');
    }
  };

  // Component UI
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">
          My Bookings
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          View your travel booking records and download vouchers.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilterType(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterType === category
                ? 'bg-[#102A43] text-white'
                : 'bg-white text-[#64748B] border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center max-w-md mx-auto space-y-3">
          <TicketCheck className="w-8 h-8 text-slate-400 mx-auto" />

          <h3 className="text-base font-bold text-[#102A43]">
            No bookings in this category
          </h3>

          <p className="text-xs text-[#64748B]">
            Select another booking category or reserve a flight or hotel from Flights & Hotels.
          </p>

          <button
            type="button"
            onClick={() => setFilterType('All')}
            className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-semibold"
          >
            View all bookings
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onViewDetails={(item) =>
                setModalView({ mode: 'details', booking: item })
              }
              onViewVoucher={(item) =>
                setModalView({ mode: 'voucher', booking: item })
              }
              onDownloadVoucher={handleDownloadVoucher}
            />
          ))}
        </div>
      )}

      {/* Details / Voucher Modal */}
      <Modal
        isOpen={Boolean(modalView)}
        onClose={() => setModalView(null)}
        title={
          modalView?.mode === 'voucher'
            ? 'Electronic Travel Voucher (Demo)'
            : 'Booking Record Details (Demo)'
        }
      >
        {modalView && (
          <div className="space-y-5">

            {modalView.mode === 'voucher' && (
              <div className="p-5 rounded-2xl bg-[#0B1F33] text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#14B8A6]">
                    TripPilot AI Demonstration Voucher
                  </span>

                  <span className="text-xs font-mono tabular-nums text-slate-300">
                    {modalView.booking.reference}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">
                  {modalView.booking.title}
                </h4>

                <p className="text-xs text-slate-300">
                  Lead Traveller: {userProfile?.name || 'N/A'}
                </p>
              </div>
            )}

            <div className="divide-y divide-slate-100 text-xs">

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Booking ID & Reference</span>
                <span className="font-mono font-semibold text-[#102A43]">
                  {modalView.booking.id} · {modalView.booking.reference}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Category</span>
                <span className="font-semibold text-[#102A43]">
                  {modalView.booking.type}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Supplier / Provider</span>
                <span className="font-semibold text-[#102A43]">
                  {modalView.booking.provider}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Destination</span>
                <span className="font-semibold text-[#102A43]">
                  {modalView.booking.destination}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Travel Schedule</span>
                <span className="font-semibold text-[#102A43]">
                  {modalView.booking.dates}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Status</span>

                <span className="inline-flex items-center gap-1 font-semibold text-[#102A43]">
                  {modalView.booking.status === 'Confirmed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  ) : modalView.booking.status === 'Pending' ? (
                    <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-slate-500" />
                  )}

                  {modalView.booking.status}
                </span>
              </div>

              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#64748B]">Estimated Price</span>

                <span className="text-sm font-extrabold text-[#102A43]">
                  {formatINR(modalView.booking.price || 0)}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] bg-[#F5F8FC] p-3.5 rounded-xl leading-relaxed">
              {modalView.booking.details || 'No additional details available.'}
              {' '}
              (Demonstration record only — no real airline or hotel reservation exists.)
            </p>

            <div className="flex justify-end gap-3 pt-2">

              <button
                type="button"
                onClick={() => setModalView(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleDownloadVoucher(modalView.booking)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14B8A6] hover:bg-[#0F766E] text-[#0B1F33] hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Voucher</span>
              </button>

            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
