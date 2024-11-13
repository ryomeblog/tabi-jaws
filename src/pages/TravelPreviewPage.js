// TravelPreviewPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelPreview from '../component/TravelPreview/TravelPreview'; // Assume you have this component
import pako from 'pako';

// Base64を解凍して元のテキストに戻す関数
function decompressText(base64String) {
    try {
        // Base64をデコードしてUint8Arrayに変換
        const compressedBytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
        const utf8Bytes = pako.ungzip(compressedBytes);
        const text = new TextDecoder().decode(utf8Bytes);
        return text;
    } catch (error) {
        throw new Error("Decompression failed");
    }
}

function TravelPreviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [travelData, setTravelData] = useState(null);  // State to store decompressed data

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const travelDataParam = queryParams.get('travelData'); // Get the 'travelData' query param

        if (!travelDataParam) {
            // If no query param, navigate to home page
            navigate("/tabi-jaws");
            return;
        }

        try {
            // Decompress the travelData
            const decompressedText = decompressText(travelDataParam);

            // Parse the decompressed text into JSON
            const parsedTravelData = JSON.parse(decompressedText);

            // Set the decompressed and parsed data to state
            setTravelData(parsedTravelData);
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
