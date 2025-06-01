import React from 'react';
import { useEffect, useState } from 'react';
import EditorNav from '../components/EditorNav';
import EditorSidebar from '../components/EditorSidebar'
import CodeEditorForMain from '../components/CodeEditorForMain';
import { useNavigate } from 'react-router-dom';

export default function MainEditor() {

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobileDevice = () => {
      const userAgent = window.navigator.userAgent;
      const mobileDevices = ['Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
      const isMobile = mobileDevices.some((device) => userAgent.includes(device));
      setIsMobileDevice(isMobile);
    };

    checkMobileDevice();
  })

  const navigate = useNavigate();

  if (isMobileDevice) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Desktop Only</h2>
        <p className="text-lg mb-4">This coding environment is optimized for desktop use.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 overflow-hidden">
      <div className="flex-none">
        <EditorNav />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none">
          <EditorSidebar />
        </div>

        <div className="flex-1 overflow-hidden">
          < CodeEditorForMain />
        </div>
      </div>
    </div>
  );
}