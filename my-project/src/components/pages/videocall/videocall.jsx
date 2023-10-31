import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
const ConferencePage = () => {
            <Navbar/>
            const token = getLocal('authtoken')
            const decoded = jwtDecode(token)

  useEffect(() => {

    const getUrlParams = (url) => {
      const urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    }

    const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = decoded.name + userID;
    const appID = 1558405695;
    const serverSecret = "c046ee27074e3b637ca8e5a98ff6dee4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    zp.joinRoom({
      container: document.querySelector("#root"),
      sharedLinks: [{
        name: 'Personal link',
        url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }, []);

  return (
    <div id="root" className="w-screen h-screen">
     <h1>1234567890</h1>
    </div>
  );
}

export default ConferencePage;
