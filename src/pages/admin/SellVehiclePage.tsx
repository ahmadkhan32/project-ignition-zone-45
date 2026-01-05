import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
    vehicleName: string;
    serialNumber: string;
    motorNumber: string;
    chassisNumber: string;
    ownerFullName: string;
    ownerAddress: string;
    ownerPhone: string;
    purchaseTimestamp?: Date;
    warrantyDurationValue: string;
    warrantyDurationUnit: "Years" | "Months" | "Days";
}

const SellVehiclePage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        vehicleName: "",
        serialNumber: "",
        motorNumber: "",
        chassisNumber: "",
        ownerFullName: "",
        ownerAddress: "",
        ownerPhone: "",
        purchaseTimestamp: new Date(),
        warrantyDurationValue: "12",
        warrantyDurationUnit: "Months",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Validation
        if (!formData.purchaseTimestamp) {
            setError("Please select a purchase date and time");
            setIsSubmitting(false);
            return;
        }

        const warrantyValue = parseInt(formData.warrantyDurationValue);
        if (isNaN(warrantyValue) || warrantyValue <= 0) {
            setError("Warranty duration must be a positive number");
            setIsSubmitting(false);
            return;
        }

        try {
            // Insert into vehicle_sales table
            const { data, error: insertError } = await supabase
                .from("vehicle_sales")
                .insert([
                    {
                        vehicle_name: formData.vehicleName,
                        serial_number: formData.serialNumber,
                        motor_number: formData.motorNumber,
                        chassis_number: formData.chassisNumber,
                        owner_full_name: formData.ownerFullName,
                        owner_address: formData.ownerAddress,
                        owner_phone: formData.ownerPhone,
                        purchase_timestamp: formData.purchaseTimestamp.toISOString(),
                        warranty_duration_value: warrantyValue,
                        warranty_duration_unit: formData.warrantyDurationUnit,
                    },
                ])
                .select();

            if (insertError) {
                // Check for unique constraint violations
                if (insertError.code === "23505") {
                    if (insertError.message.includes("serial_number")) {
                        setError("This serial number is already registered");
                    } else if (insertError.message.includes("motor_number")) {
                        setError("This motor number is already registered");
                    } else if (insertError.message.includes("chassis_number")) {
                        setError("This chassis number is already registered");
                    } else {
                        setError("A vehicle with these details already exists");
                    }
                } else {
                    setError(`Error: ${insertError.message}`);
                }
                setIsSubmitting(false);
                return;
            }

            // Success!
            setSuccess(true);

            // Reset form after 2 seconds and navigate back
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 2000);
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Sale Recorded Successfully!
                            </h2>
                            <p className="text-gray-600">
                                Vehicle warranty has been activated. Redirecting to dashboard...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
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
                        <div className="p-3 bg-blue-500 rounded-lg">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Record Vehicle Sale</h1>
                            <p className="text-gray-300">
                                Register a new vehicle sale and activate warranty
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Vehicle Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                            <CardDescription>
                                Enter the vehicle details and identification numbers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="vehicleName">Vehicle Name / Model *</Label>
                                <Input
                                    id="vehicleName"
                                    name="vehicleName"
                                    value={formData.vehicleName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., EV Sport Pro"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="serialNumber">Serial Number *</Label>
                                    <Input
                                        id="serialNumber"
                                        name="serialNumber"
                                        value={formData.serialNumber}
                                        onChange={handleInputChange}
                                        placeholder="e.g., SN123456"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="motorNumber">Motor Number *</Label>
                                    <Input
                                        id="motorNumber"
                                        name="motorNumber"
                                        value={formData.motorNumber}
                                        onChange={handleInputChange}
                                        placeholder="e.g., MN789012"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="chassisNumber">Chassis Number *</Label>
                                    <Input
                                        id="chassisNumber"
                                        name="chassisNumber"
                                        value={formData.chassisNumber}
                                        onChange={handleInputChange}
                                        placeholder="e.g., CH345678"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Owner Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Owner Information</CardTitle>
                            <CardDescription>
                                Enter customer details (address and phone are private)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="ownerFullName">Full Name *</Label>
                                <Input
                                    id="ownerFullName"
                                    name="ownerFullName"
                                    value={formData.ownerFullName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="ownerAddress">Address *</Label>
                                <Textarea
                                    id="ownerAddress"
                                    name="ownerAddress"
                                    value={formData.ownerAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter full address"
                                    rows={3}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    🔒 Private - Not visible to public
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="ownerPhone">Phone Number *</Label>
                                <Input
                                    id="ownerPhone"
                                    name="ownerPhone"
                                    value={formData.ownerPhone}
                                    onChange={handleInputChange}
                                    placeholder="e.g., +1234567890"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    🔒 Private - Not visible to public
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Purchase & Warranty Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Purchase & Warranty Details</CardTitle>
                            <CardDescription>
                                Set the purchase date/time and warranty duration
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Purchase Date & Time *</Label>
                                <DateTimePicker
                                    date={formData.purchaseTimestamp}
                                    onDateChange={(date) =>
                                        setFormData((prev) => ({ ...prev, purchaseTimestamp: date }))
                                    }
                                    placeholder="Select purchase date and time"
                                    className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Select the exact date and time of purchase
                                </p>
                            </div>

                            <div>
                                <Label>Warranty Duration *</Label>
                                <div className="flex gap-2 mt-1">
                                    <div className="flex-1">
                                        <Input
                                            type="number"
                                            name="warrantyDurationValue"
                                            value={formData.warrantyDurationValue}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 12"
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="w-32">
                                        <Select
                                            value={formData.warrantyDurationUnit}
                                            onValueChange={(value: "Years" | "Months" | "Days") =>
                                                setFormData((prev) => ({ ...prev, warrantyDurationUnit: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Days">Days</SelectItem>
                                                <SelectItem value="Months">Months</SelectItem>
                                                <SelectItem value="Years">Years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Example: 5 Years, 36 Months, or 90 Days
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin-dashboard")}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Recording Sale..." : "Record Sale & Activate Warranty"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellVehiclePage;
