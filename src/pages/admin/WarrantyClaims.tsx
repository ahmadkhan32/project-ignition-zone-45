import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WarrantyClaim {
  id: string;
  scooter_id: string;
  serial_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  purchase_date: string;
  claim_date: string;
  claim_type: string;
  issue_description: string;
  status: string;
  admin_notes: string;
  resolution_date: string;
  created_at: string;
  updated_at: string;
  scooters?: {
    name: string;
  };
}

const WarrantyClaims: React.FC = () => {
  const [claims, setClaims] = useState<WarrantyClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase
        .from('warranty_claims')
        .select(`
          *,
          scooters (
            name
          )
        `)
        .order('claim_date', { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching warranty claims:', error);
      alert('Error loading warranty claims');
    } finally {
      setLoading(false);
    }
  };

  const updateClaim = async () => {
    if (!selectedClaim) return;

    try {
      const updateData: any = {
        status,
        admin_notes: adminNotes,
      };

      if (status === 'completed') {
        updateData.resolution_date = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase
        .from('warranty_claims')
        .update(updateData)
        .eq('id', selectedClaim.id);

      if (error) throw error;
      alert('Warranty claim updated successfully!');
      setSelectedClaim(null);
      fetchClaims();
    } catch (error) {
      console.error('Error updating warranty claim:', error);
      alert('Error updating warranty claim');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Warranty Claims Management</h1>

      {claims.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No warranty claims found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{claim.customer_name}</h3>
                  <p className="text-sm text-gray-600">{claim.customer_email}</p>
                  <p className="text-sm text-gray-600">{claim.customer_phone}</p>
                </div>
                <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${getStatusColor(claim.status)}`}>
                  {claim.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                <div>
                  <p className="text-gray-600"><strong>Scooter:</strong> {claim.scooters?.name}</p>
                  <p className="text-gray-600"><strong>Serial Number:</strong> {claim.serial_number}</p>
                  <p className="text-gray-600"><strong>Purchase Date:</strong> {new Date(claim.purchase_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600"><strong>Claim Type:</strong> {claim.claim_type}</p>
                  <p className="text-gray-600"><strong>Claim Date:</strong> {new Date(claim.claim_date).toLocaleDateString()}</p>
                  {claim.resolution_date && (
                    <p className="text-gray-600"><strong>Resolution Date:</strong> {new Date(claim.resolution_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm"><strong>Issue Description:</strong></p>
                <p className="text-gray-700">{claim.issue_description}</p>
              </div>

              {claim.admin_notes && (
                <div className="mb-2">
                  <p className="text-sm"><strong>Admin Notes:</strong></p>
                  <p className="text-gray-700">{claim.admin_notes}</p>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedClaim(claim);
                  setAdminNotes(claim.admin_notes || '');
                  setStatus(claim.status);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Update Warranty Claim</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  placeholder="Add notes about this warranty claim..."
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={updateClaim}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => setSelectedClaim(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarrantyClaims;
