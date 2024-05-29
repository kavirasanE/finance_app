import React, { useEffect, useState, useRef } from 'react'
import { Online } from '../components/Sidebar'
import { Tabs, Table } from 'flowbite-react'
import CommandTable from '../components/commands/CommandTable'
import OutputLogs from '../components/commands/OutputLogs'

const Commands = () => {
  const data = [
    {
      id: 0,
      title: 'GeneralCommands',
      commands: [
        {
          command: 'dumpsys activity service WhadService',
          description: 'Dumpsys command for CSM/FTV devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'lipc-probe -v com.doppler.whad command',
          description: 'Dumpsys command for Puffin devices to know ASD, ASD score, TSS.'
        },
        {
          command: 'adb shell setprop persist.amazon.whad.tsm_score 255',
          description: 'Forcing specific device to be TSS (Time Sync Server).'
        },
        {
          command: 'logcat | grep -i "updateState"',
          description:
            'To check update flow (This will show update status from Downloading to successful).'
        },
        {
          command:
            'adb shell am startservice -a com.amazon.device.software.ota.service.CHECK_FOR_UPDATES -n com.amazon.device.software.ota/.OtaService',
          description: 'To check and force app OTA download to your device.'
        },
        {
          command:
            'adb shell am startservice -a com.amazon.device.software.ota.service.START_OBTRUSIVE -n com.amazon.device.software.ota/.OtaService',
          description: 'Command to start installation.'
        },
        {
          command: 'logcat -v threadtime | grep -i "DashMediaSource"',
          description: 'To check DRM wide_Entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -I DRM_GroupLicense_LicenseFetchAttempts',
          description: 'To check DRM group license/widevine_entitlement.'
        },
        {
          command: 'logcat -v threadtime | grep -i HttpAudioFetcher:sendAbrAttributes',
          description:
            'To check Katana loglines from AMU music (e.g., where music is playing in 3D, R360, HD, UHD Content).'
        },
        {
          command:
            "logcat | grep -ioE 'groupkeyid=[^,]+|drm=[^&]+|DRM_GroupLicense_LoadKeys[^,]+|DRM_GroupLicense_LicenseFetchAttempts|removeAllSessions:session cached|protectionScheme=[^,]+|createSession:Creating a new session'",
          description: 'Used to check all DRM related loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i "processGaplessMuxEndOfStream"',
          description: 'To check GaplessMuxEndOfStream loglines.'
        },
        {
          command: 'logcat -v threadtime | grep -i processGaplessMuxNewTrackSameStream',
          description: 'To check Gapless Mux Start Of the Stream loglines.'
        },
        {
          command: "logcat -v threadtime | grep -i 'DemuxedFrameSourceImp'",
          description: 'To check Offset loglines command.'
        },
        {
          command: 'setprop persist.amazon.whad.ismaster 1',
          description: 'Forcing the specific Device to be ASD, only for CSM devices.'
        },
        {
          command: 'lipc-set-prop -i com.doppler.whad distributionMasterScoreOverride 500',
          description: 'Forcing the specific Device to be ASD, only for Puffin devices.'
        },
        {
          command: 'logcat | grep volume',
          description: 'To check Volume level on the devices.'
        },
        {
          command: 'logcat -v threadtime | grep -i "disContinuityFound"',
          description: 'To check discontinuity logs for Tune in station.'
        },
        {
          command: 'adb logcat -v threadtime | grep -i skew',
          description: 'To check the BT skew values.'
        },
        {
          command: 'logcat -v threadtime',
          description: 'For Running logs.'
        },
        {
          command: 'Getprop | grep build',
          description: 'To check Device build details.'
        },
        {
          command: 'logcat |grep -i "using DemuxedDataSource"',
          description: 'To check demux (Tunein HLS).'
        }
      ]
    },
    {
      id: 1,
      title: 'FTVCommands',
      commands: [
        {
          command: 'exampleFTVCommand',
          description: 'This is an example command for FTV operations.'
        }
      ]
    },
    {
      id: 2,
      title: 'Spotify Commands',
      commands: [
        {
          command: 'exampleSpotifyCommand',
          description: 'This is an example command for Spotify operations.'
        }
      ]
    },
    {
      id: 3,
      title: 'Tuple Devices Commands',
      commands: [
        {
          command: 'exampleTupleDeviceCommand',
          description: 'This is an example command for Tuple device operations.'
        }
      ]
    },
    {
      id: 4,
      title: 'Hypnos Galileo Commands',
      commands: [
        {
          command: 'exampleHypnosGalileoCommand',
          description: 'This is an example command for Hypnos and Galileo operations.'
        }
      ]
    },
    {
      id: 5,
      title: 'Hypnos Galileo Commands',
      commands: [
        {
          command: 'exampleHypnosGalileoCommand',
          description: 'This is an example command for Hypnos and Galileo operations.'
        }
      ]
    },
    {
      id: 6,
      title: 'LowPowerMode',
      commands: [
        {
          command: 'exampleLowPowerModeCommand',
          description: 'This is an example command for Low Power Mode operations.'
        }
      ]
    },
    {
      id: 7,
      title: 'MP_SM_Commands',
      commands: [
        {
          command: 'exampleMP_SM_Command',
          description: 'This is an example command for MP/SMC operations.'
        }
      ]
    },
    {
      id: 8,
      title: 'Longevity',
      commands: [
        {
          command: 'exampleLongevityCommand',
          description: 'This is an example command for Longevity operations.'
        }
      ]
    }
  ]

  const tabsRef = useRef(null)
  // console.log(tabsRef)
  const [activeTab, setActiveTab] = useState(0)
  // console.log('active', activeTab)

  const [section, setSection] = useState(data)
  const [activeSection, setActiveSection] = useState('GeneralCommands')
  const [filteredCommands, setfilterCommands] = useState([])

  // useEffect(() => {
  //   const commandSections = Object.keys(data[1])
  //   setSection(commandSections)
  // }, [])

  const filterCommands = (id) => {
    const filter = data.filter((item) => item.id == id)
    setfilterCommands(filter[0].commands)
  }
  console.log(filteredCommands)

  useEffect(() => {
    console.log('act', activeTab)
    filterCommands(activeTab)
  }, [activeTab])

  return (
    <div className='h-screen overflow-auto'>
    <Online/>
      <div className="bg-white  text-black ">
        <div>
          <Tabs
            className="w-screen grid grid-cols-6 "
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            {data.map((sec, index) => (
              <Tabs.Item title={sec.title} key={index} active={activeSection === sec.id} />
            ))}
          </Tabs>
        </div>
        <div className="flex flex-row justify-between p-2 gap-2 h-screen">
          <div className="w-1/2 h-screen overflow-y-auto">
            <Table >
              <Table.Head>
                <Table.HeadCell className="bg-red-400 font-bold subpixel-antialiased text-black text-lg text-center">
                  Commands
                </Table.HeadCell>
              </Table.Head>
            </Table>

            {filteredCommands.map((item, index) => (
              <CommandTable item={item} index={index} key={index} />
            ))}
          </div>
          <div className="w-1/2 h-screen bg-black ">
            <OutputLogs />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commands