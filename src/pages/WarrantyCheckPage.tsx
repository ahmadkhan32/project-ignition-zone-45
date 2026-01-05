import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import {
    calculateExpirationDate,
    calculateRemainingTime,
    isWarrantyActive,
    formatCountdown,
    formatDate,
} from "@/utils/warrantyCalculations";
import { Search, ShieldCheck, ShieldX, AlertCircle, Package, Calendar, User } from "lucide-react";

interface VehicleSale {
    id: string;
    vehicle_name: string;
    serial_number: string;
    motor_number: string;
    chassis_number: string;
    owner_full_name: string;
    purchase_timestamp: string;
    warranty_duration_value: number;
    warranty_duration_unit: "Years" | "Months" | "Days";
}

const WarrantyCheckPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleSale | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            setError("Please enter a serial number, motor number, or chassis number");
            return;
        }

        setIsSearching(true);
        setError("");
        setNotFound(false);
        setVehicleData(null);

        try {
            // Search by serial number, motor number, or chassis number
            const { data, error: searchError } = await supabase
                .from("vehicle_sales_public")
                .select("*")
                .or(
                    `serial_number.eq.${searchQuery},motor_number.eq.${searchQuery},chassis_number.eq.${searchQuery}`
                )
                .maybeSingle();

            if (searchError) {
                console.error("Search error:", searchError);
                setError("An error occurred while searching. Please try again.");
                setIsSearching(false);
                return;
            }

            if (!data) {
                setNotFound(true);
            } else {
                setVehicleData(data as VehicleSale);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    const renderWarrantyStatus = () => {
        if (!vehicleData) return null;

        const expirationDate = calculateExpirationDate(
            vehicleData.purchase_timestamp,
            vehicleData.warranty_duration_value,
            vehicleData.warranty_duration_unit
        );

        const active = isWarrantyActive(expirationDate);
        const remainingTime = calculateRemainingTime(expirationDate);

        return (
            <Card className="border-2 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Warranty Status</CardTitle>
                        {active ? (
                            <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                Active
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="px-4 py-2 text-lg">
                                <ShieldX className="w-5 h-5 mr-2" />
                                Expired
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Vehicle Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Vehicle</p>
                                    <p className="font-semibold text-gray-900">{vehicleData.vehicle_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                <User className="w-5 h-5 text-purple-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Owner</p>
                                    <p className="font-semibold text-gray-900">{vehicleData.owner_full_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Purchase Date</p>
                                    <p className="font-semibold text-gray-900">
                                        {formatDate(vehicleData.purchase_timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Serial Number</p>
                                <p className="font-mono font-semibold text-gray-900">{vehicleData.serial_number}</p>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Motor Number</p>
                                <p className="font-mono font-semibold text-gray-900">{vehicleData.motor_number}</p>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Chassis Number</p>
                                <p className="font-mono font-semibold text-gray-900">{vehicleData.chassis_number}</p>
                            </div>
                        </div>
                    </div>

                    {/* Warranty Details */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-lg mb-3">Warranty Coverage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Warranty Period</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {vehicleData.warranty_duration_value} {vehicleData.warranty_duration_unit}
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Expiration Date</p>
                                <p className="text-lg font-bold text-orange-600">
                                    {formatDate(expirationDate)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Countdown or Expired Message */}
                    {active ? (
                        <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                            <h3 className="text-xl font-bold mb-2">Time Remaining</h3>
                            <p className="text-3xl font-bold">{formatCountdown(remainingTime)}</p>
                            <p className="text-sm mt-2 opacity-90">
                                Your warranty is currently active and covers manufacturing defects and component failures.
                            </p>
                        </div>
                    ) : (
                        <div className="p-6 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl text-white">
                            <h3 className="text-xl font-bold mb-2">Warranty Expired</h3>
                            <p className="text-lg">
                                This warranty expired on {new Date(expirationDate).toLocaleDateString()}.
                            </p>
                            <p className="text-sm mt-2 opacity-90">
                                Please contact customer service for information about extended warranty options.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            <NavigationBar />

            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Check Your Warranty Status
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Enter your vehicle's Serial Number, Motor Number, or Chassis Number to check warranty status
                    </p>
                </div>

                {/* Search Form */}
                <div className="max-w-2xl mx-auto mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Vehicle</CardTitle>
                            <CardDescription>
                                You can search using any of the following: Serial Number, Motor Number, or Chassis Number
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setError("");
                                            setNotFound(false);
                                        }}
                                        placeholder="Enter Serial, Motor, or Chassis Number"
                                        className="flex-1"
                                        disabled={isSearching}
                                    />
                                    <Button type="submit" disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
                                        <Search className="w-4 h-4 mr-2" />
                                        {isSearching ? "Searching..." : "Search"}
                                    </Button>
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {notFound && (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            No vehicle found with the provided number. Please check and try again.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Results */}
                {vehicleData && (
                    <div className="max-w-4xl mx-auto">
                        {renderWarrantyStatus()}
                    </div>
                )}

                {/* Information Section */}
                {!vehicleData && !isSearching && (
                    <div className="max-w-3xl mx-auto mt-12">
                        <Card className="bg-white/10 border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">How to Use</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-gray-300">
                                <p>• <strong>Find your identification number:</strong> Check your vehicle documentation for Serial Number, Motor Number, or Chassis Number</p>
                                <p>• <strong>Enter the number:</strong> Type any one of these numbers in the search box above</p>
                                <p>• <strong>View warranty status:</strong> See your warranty details, expiration date, and remaining time</p>
                                <p className="text-sm text-gray-400 mt-4">
                                    Note: For privacy, owner address and phone number are not displayed publicly.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WarrantyCheckPage;
