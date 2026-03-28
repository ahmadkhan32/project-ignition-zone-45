import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

const SystemErrorPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timestamp, setTimestamp] = useState<string>('');
  const [countdown, setCountdown] = useState(6000);
  const incidentIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (incidentIdRef.current === null) {
      incidentIdRef.current = Math.floor(100000 + Math.random() * 900000);
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTimestamp(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isVisible, countdown]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isVisible) {
      timeout = setTimeout(() => {
        setIsVisible(true);
        setCountdown(6000);
      }, 6000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible]);

  if (!isVisible) return null;

  const countdownSeconds = Math.ceil(countdown / 1000);
  const progressPercent = (countdown / 6000) * 100;

  return (
    <div className="fixed inset-0 z-[99999] p-4 sm:p-6 flex items-center justify-center bg-[rgba(0,0,0,0.85)] backdrop-blur-[6px]" style={{ pointerEvents: 'all' }}>
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-[16px] shadow-[0_25px_80px_rgba(0,0,0,0.8)] w-full max-w-[92vw] sm:max-w-[560px] p-[24px] sm:p-[40px] flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#3B82F6] rounded-t-[16px]" />
        
        <img 
          src="https://i.postimg.cc/q7ggYBPn/Chat-GPT-Image-Oct-29-2025-08-07-29-PM.png" 
          alt="EV INN Logo"
          className="w-[110px] sm:w-[140px] mb-[20px] object-contain flex-shrink-0 mt-2"
        />

        <div className="w-[60px] h-[60px] bg-[#3B82F6] rounded-full flex items-center justify-center text-white mb-[16px] flex-shrink-0 animate-[pulse_1.5s_infinite]">
          <span className="text-[32px] font-bold">!</span>
        </div>

        <h2 className="font-bold text-[18px] sm:text-[22px] text-white mb-[12px] text-center">
          ⚠ Critical System Alert
        </h2>

        <div className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[12px] font-mono px-[12px] py-[6px] rounded-[6px] inline-block mb-[24px] text-center flex-shrink-0">
          ERROR CODE: SYS_DB_502 · API_SYNC_FAILED
        </div>

        <h3 className="font-semibold text-[18px] text-[#3B82F6] mb-[12px] text-left w-full flex-shrink-0">
          Database Connection Interrupted
        </h3>

        <p className="text-[13px] sm:text-[14px] text-zinc-300 leading-[1.7] text-left w-full mb-[24px] font-regular flex-shrink-0">
          The system has detected a critical failure in the database 
          synchronization pipeline. API endpoints are returning stale 
          or corrupted data and cannot be trusted at this time.
          <br /><br />
          All services are temporarily suspended pending resolution 
          by the infrastructure team. Estimated restoration window 
          is currently unavailable.
          <br /><br />
          Do not attempt to place orders or submit any data until 
          this alert is cleared by a system administrator.
        </p>

        <div className="w-full bg-zinc-900 rounded-[8px] border border-zinc-800 p-[12px] sm:p-[16px] mb-[24px] flex flex-col gap-[8px] flex-shrink-0">
          <div className="flex justify-between items-center pb-[8px] border-b border-zinc-800">
            <span className="text-[13px] sm:text-[14px] font-medium text-zinc-300 flex items-center gap-2">
              <span className="text-[10px]">🔵</span> Database Sync
            </span>
            <span className="font-mono font-bold text-[13px] text-[#3B82F6]">FAILED</span>
          </div>
          <div className="flex justify-between items-center pb-[8px] border-b border-zinc-800">
             <span className="text-[13px] sm:text-[14px] font-medium text-zinc-300 flex items-center gap-2">
              <span className="text-[10px]">🔵</span> API Gateway
            </span>
            <span className="font-mono font-bold text-[13px] text-[#3B82F6]">OFFLINE</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-[13px] sm:text-[14px] font-medium text-zinc-300 flex items-center gap-2">
              <span className="text-[10px]">🟡</span> Cache Layer
            </span>
            <span className="font-mono font-bold text-[13px] text-[#F59E0B]">DEGRADED</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 text-center mb-[16px] flex flex-col items-center gap-1 flex-shrink-0">
          <span>Last checked: {timestamp}</span>
          <span>Incident ID: INC-{incidentIdRef.current}</span>
        </div>

        <div className="w-full mb-[24px] flex-shrink-0">
          <div className="text-[12px] text-zinc-400 mb-[4px] text-left font-medium">
            Next alert in: {countdownSeconds}s
          </div>
          <div className="w-full h-[4px] bg-zinc-800 rounded-[2px] overflow-hidden">
            <div 
              className="h-full bg-[#3B82F6] transition-all duration-100 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-full h-[48px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[15px] rounded-[10px] transition-colors mb-[12px] flex-shrink-0"
        >
          [ Acknowledge & Continue ]
        </button>

        <p className="text-[11px] text-zinc-500 italic text-center flex-shrink-0 pb-2">
          * Closing this alert does not resolve the underlying issue
        </p>
      </div>
    </div>
  );
};

export default SystemErrorPopup;
