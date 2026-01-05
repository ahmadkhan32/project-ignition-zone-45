import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateTimePickerProps {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
}

export function DateTimePicker({
    date,
    onDateChange,
    placeholder = "Pick a date and time",
    className,
}: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
    const [hour, setHour] = React.useState<string>(
        date ? format(date, "HH") : "12"
    );
    const [minute, setMinute] = React.useState<string>(
        date ? format(date, "mm") : "00"
    );

    // Update parent when date or time changes
    React.useEffect(() => {
        if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setHours(parseInt(hour) || 0);
            newDate.setMinutes(parseInt(minute) || 0);
            onDateChange(newDate);
        }
    }, [selectedDate, hour, minute, onDateChange]);

    const handleTimeChange = (type: "hour" | "minute", value: string) => {
        // Remove non-numeric characters
        const numericValue = value.replace(/\D/g, "");

        if (type === "hour") {
            const hourNum = parseInt(numericValue);
            if (hourNum >= 0 && hourNum <= 23) {
                setHour(numericValue.padStart(2, "0"));
            }
        } else {
            const minuteNum = parseInt(numericValue);
            if (minuteNum >= 0 && minuteNum <= 59) {
                setMinute(numericValue.padStart(2, "0"));
            }
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                        format(selectedDate, "PPP") + ` at ${hour}:${minute}`
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 space-y-3">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                    />

                    <div className="border-t pt-3">
                        <div className="text-sm font-medium mb-2">Time</div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 block mb-1">Hour</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={hour}
                                    onChange={(e) => handleTimeChange("hour", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-center"
                                    placeholder="HH"
                                />
                            </div>
                            <span className="text-2xl font-bold pt-5">:</span>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 block mb-1">Minute</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={minute}
                                    onChange={(e) => handleTimeChange("minute", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-center"
                                    placeholder="MM"
                                />
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-center">
                            24-hour format (00:00 - 23:59)
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
