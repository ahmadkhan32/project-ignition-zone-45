import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const WarrantyStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get scooter details from URL params
  const scooterId = searchParams.get('scooterId') || '';
  const scooterName = searchParams.get('name') || '';
  const serialNumber = searchParams.get('serialNumber') || '';
  const motorNumber = searchParams.get('motorNumber') || '';
  const chassisNumber = searchParams.get('chassisNumber') || '';
  const warrantyPeriodMonths = parseInt(searchParams.get('warrantyPeriod') || '12');
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate warranty expiry date
    const purchaseDate = new Date(formData.purchaseDate);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warrantyPeriodMonths);

    try {
      // Import supabase
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Update scooter inventory
      const { error: updateError } = await supabase.rpc('update_scooter_sold', {
        p_scooter_id: scooterId,
        p_customer_name: formData.customerName,
        p_customer_email: formData.customerEmail,
        p_customer_phone: formData.customerPhone,
        p_purchase_date: formData.purchaseDate,
        p_serial_number: serialNumber,
      });

      if (updateError) {
        // Fallback: manually update the inventory
        const { data: currentData } = await supabase
          .from('scooters')
          .select('total_sold, units_in_stock')
          .eq('id', scooterId)
          .single();

        if (currentData) {
          await supabase
            .from('scooters')
            .update({
              total_sold: currentData.total_sold + 1,
              units_in_stock: Math.max(0, currentData.units_in_stock - 1),
            })
            .eq('id', scooterId);
        }
      }

      alert(
        `✅ Warranty Started Successfully!\n\n` +
          `Customer: ${formData.customerName}\n` +
          `Scooter: ${scooterName}\n` +
          `Purchase Date: ${formData.purchaseDate}\n` +
          `Warranty Expires: ${expiryDate.toLocaleDateString()}\n` +
          `Warranty Period: ${warrantyPeriodMonths} months`
      );

      // Navigate back to admin dashboard
      navigate("/admin-dashboard");
    } catch (error) {
      console.error('Error updating warranty:', error);
      alert('Error updating warranty. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Warranty Activation
          </h1>
          <p className="text-gray-600">
            Register the sale and activate warranty protection
          </p>
        </div>

        {/* Scooter Info Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-xl font-semibold mb-3">{scooterName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {serialNumber && (
              <div>
                <span className="opacity-75">Serial Number:</span>
                <p className="font-semibold">{serialNumber}</p>
              </div>
            )}
            {motorNumber && (
              <div>
                <span className="opacity-75">Motor Number:</span>
                <p className="font-semibold">{motorNumber}</p>
              </div>
            )}
            {chassisNumber && (
              <div>
                <span className="opacity-75">Chassis Number:</span>
                <p className="font-semibold">{chassisNumber}</p>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-white/30">
            <span className="opacity-75">Warranty Period:</span>
            <p className="text-2xl font-bold">{warrantyPeriodMonths} months</p>
          </div>
        </div>

        {/* Warranty Info */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Warranty Terms:</strong> This scooter is covered by a{" "}
                {warrantyPeriodMonths}-month warranty from the purchase date. The
                warranty covers manufacturing defects and component failures under
                normal use conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="customer@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date *
            </label>
            <input
              type="date"
              required
              value={formData.purchaseDate}
              onChange={(e) =>
                setFormData({ ...formData, purchaseDate: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard")}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Activate Warranty & Complete Sale
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By activating warranty, you confirm that the scooter has been sold
            and delivered to the customer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarrantyStartPage;
