import React from "react";

const MaintenancePage: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; }
      `}</style>

      <div style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(160deg, #050d1a 0%, #0a1628 40%, #0d1f3c 70%, #061322 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        zIndex: 99999,
      }}>

        {/* ── Navbar ── */}
        <header style={{
          width: "100%",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(5,13,26,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}>
          <img
            src="https://i.postimg.cc/q7ggYBPn/Chat-GPT-Image-Oct-29-2025-08-07-29-PM.png"
            alt="EV INN Logo"
            style={{ height: 54, width: "auto", objectFit: "contain" }}
          />
        </header>

        {/* ── Main content ── */}
        <main style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
        }}>

          {/* Thin accent line */}
          <div style={{
            width: 40,
            height: 3,
            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
            borderRadius: 99,
            marginBottom: 36,
          }} />

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: 18,
          }}>
            Site Under Maintenance
          </h1>

          {/* Body text */}
          <p style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 420,
            lineHeight: 1.75,
            marginBottom: 10,
          }}>
            We're performing scheduled maintenance to improve your experience.
          </p>

          <p style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.01em",
          }}>
            Please visit later.
          </p>

        </main>

        {/* ── Footer ── */}
        <footer style={{
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 32px",
          textAlign: "center",
          flexShrink: 0,
        }}>
          <p style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.04em",
          }}>
            &copy; {new Date().getFullYear()} EV INN &mdash; All rights reserved
          </p>
        </footer>

      </div>
    </>
  );
};

export default MaintenancePage;
