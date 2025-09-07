import React, { useState } from "react";
import TradingHubDisplay from "./trading-hub-display";
import AdvancedDisplay from "./advanced-display";
import "./display-toggle.scss";

const DisplayToggle: React.FC = () => {
    const [activeDisplay, setActiveDisplay] = useState<"trading" | "advanced">("trading");

    return (
        <div className="display-container">
            {/* Toggle buttons */}
            <div className="display-toggle">
                <button
                    className={`display-toggle__button ${activeDisplay === "trading" ? "active-trading" : ""}`}
                    onClick={() => setActiveDisplay("trading")}
                >
                    ⚡ Trading Hub
                </button>
                <button
                    className={`display-toggle__button ${activeDisplay === "advanced" ? "active-advanced" : ""}`}
                    onClick={() => setActiveDisplay("advanced")}
                >
                    🚀 Advanced
                </button>
            </div>

            {/* Conditional content */}
            <div className="display-content">
                {activeDisplay === "trading" && <TradingHubDisplay />}
                {activeDisplay === "advanced" && <AdvancedDisplay />}
            </div>
        </div>
    );
};

export default DisplayToggle;
