// TravelPreviewPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelPreview from '../component/TravelPreview/TravelPreview'; // Assume you have this component

function TravelPreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [travelData, setTravelData] = useState({
        title: "",
        startDate: new Date().toLocaleDateString(),
        endDate: new Date().toLocaleDateString(),
        departure: "",
        destination: "",
        notes: "",
        scheduleData: [{
            date: new Date().toLocaleDateString(),
            schedules: []
        }]
    });

    useEffect(() => {
        // location.stateからtravelDataを取得
        const travelDataState = location.state;

        if (!travelDataState) {
            // travelDataがない場合はホームに遷移
            navigate("/tabi-jaws");
            return;
        }

        try {
            // Set the decompressed and parsed data to state
            setTravelData(travelDataState);
        } catch (error) {
            // If decompression or JSON parsing fails, navigate to home page
            navigate("/tabi-jaws");
        }
    }, [location, navigate]);

    // If travelData is not set yet (still processing), you could show a loading spinner or message
    if (!travelData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Pass the travelData to TravelPreview component */}
            <TravelPreview travelData={travelData} />
        </div>
    );
}

export default TravelPreviewPage;
