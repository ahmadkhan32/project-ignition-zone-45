import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    calculateExpirationDate,
    isWarrantyActive,
    formatDate,
} from "@/utils/warrantyCalculations";
import { Search, Package, ShieldCheck, ShieldX, Calendar, User, Phone, MapPin } from "lucide-react";

interface VehicleSale {
    id: string;
    vehicle_name: string;
    serial_number: string;
    motor_number: string;
    chassis_number: string;
    owner_full_name: string;
    owner_address: string;
    owner_phone: string;
    purchase_timestamp: string;
    warranty_duration_value: number;
    warranty_duration_unit: "Years" | "Months" | "Days";
    created_at: string;
}

const VehiclesSoldPage: React.FC = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState<VehicleSale[]>([]);
    const [filteredSales, setFilteredSales] = useState<VehicleSale[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSale, setSelectedSale] = useState<VehicleSale | null>(null);

    useEffect(() => {
        fetchSales();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredSales(sales);
        } else {
            const filtered = sales.filter(
                (sale) =>
                    sale.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sale.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sale.motor_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sale.chassis_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sale.owner_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sale.owner_phone.includes(searchTerm)
            );
            setFilteredSales(filtered);
        }
    }, [searchTerm, sales]);

    const fetchSales = async () => {
        setIsLoading(true);
        try {
            // Fetch from main table (NOT the public view) to get ALL data including private info
            const { data, error } = await supabase
                .from("vehicle_sales")
                .select("*")
                .order("purchase_timestamp", { ascending: false });

            if (error) {
                console.error("Error fetching sales:", error);
                alert("Error loading sales records: " + error.message);
            } else {
                setSales(data || []);
                setFilteredSales(data || []);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getWarrantyStatus = (sale: VehicleSale) => {
        const expirationDate = calculateExpirationDate(
            sale.purchase_timestamp,
            sale.warranty_duration_value,
            sale.warranty_duration_unit
        );
        const active = isWarrantyActive(expirationDate);
        return { active, expirationDate };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin-dashboard")}
                        className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                        ← Back to Dashboard
                    </Button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Vehicles Sold</h1>
                            <p className="text-gray-300">Complete sales records with warranty information</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by vehicle, serial number, owner name, phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1"
                            />
                            {searchTerm && (
                                <Button variant="outline" onClick={() => setSearchTerm("")}>
                                    Clear
                                </Button>
                            )}
                        </div>
                        {searchTerm && (
                            <p className="text-sm text-gray-600 mt-2">
                                Found {filteredSales.length} record(s) matching "{searchTerm}"
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Total Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-blue-600">{sales.length}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Active Warranties</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">
                                {sales.filter((s) => getWarrantyStatus(s).active).length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Expired Warranties</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-red-600">
                                {sales.filter((s) => !getWarrantyStatus(s).active).length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales Records Table */}
                {isLoading ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-gray-500">Loading sales records...</p>
                        </CardContent>
                    </Card>
                ) : filteredSales.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">
                                {searchTerm ? "No sales records found" : "No vehicles sold yet"}
                            </p>
                            {!searchTerm && (
                                <Button
                                    onClick={() => navigate("/admin/sell-vehicle")}
                                    className="mt-4 bg-green-600 hover:bg-green-700"
                                >
                                    Record First Sale
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredSales.map((sale) => {
                            const { active, expirationDate } = getWarrantyStatus(sale);
                            return (
                                <Card key={sale.id} className="overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-xl text-gray-900">{sale.vehicle_name}</CardTitle>
                                                    {active ? (
                                                        <Badge className="bg-green-500">
                                                            <ShieldCheck className="w-3 h-3 mr-1" />
                                                            Warranty Active
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="destructive">
                                                            <ShieldX className="w-3 h-3 mr-1" />
                                                            Warranty Expired
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardDescription>
                                                    Sold on {formatDate(sale.purchase_timestamp)}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {/* Vehicle Information */}
                                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                <h4 className="font-semibold text-sm text-gray-900 mb-3">
                                                    Vehicle Information
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Serial Number:</span>
                                                        <p className="font-mono font-semibold text-gray-900">{sale.serial_number}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Motor Number:</span>
                                                        <p className="font-mono font-semibold text-gray-900">{sale.motor_number}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Chassis Number:</span>
                                                        <p className="font-mono font-semibold text-gray-900">{sale.chassis_number}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Owner Information (PRIVATE) */}
                                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                                <h4 className="font-semibold text-sm text-orange-900 mb-3 flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Owner Information (Private)
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-700">Name:</span>
                                                        <p className="font-semibold text-gray-900">{sale.owner_full_name}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-700 flex items-center gap-1">
                                                            <Phone className="w-3 h-3" /> Phone:
                                                        </span>
                                                        <p className="font-semibold text-gray-900">{sale.owner_phone}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-700 flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" /> Address:
                                                        </span>
                                                        <p className="font-semibold text-gray-900 text-xs leading-relaxed">
                                                            {sale.owner_address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Warranty Information */}
                                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    Warranty Details
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Purchase Date:</span>
                                                        <p className="font-semibold text-gray-900">
                                                            {new Date(sale.purchase_timestamp).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Warranty Duration:</span>
                                                        <p className="font-semibold text-gray-900">
                                                            {sale.warranty_duration_value} {sale.warranty_duration_unit}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Expires On:</span>
                                                        <p className={`font-semibold ${active ? "text-green-700" : "text-red-700"}`}>
                                                            {new Date(expirationDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehiclesSoldPage;
