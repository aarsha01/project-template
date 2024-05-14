import React, { useState } from "react";
import Layout from "../layout";
import { Film, Layers, Mic, Music } from "lucide-react";
import { type Crop } from "react-image-crop";

import classNames from "classnames";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CropDialog from "./cropper/crop-dialog";

interface Project {
  title: string;
  format: {
    name: string;
    width: number;
    height: number;
  };
  scenes: Scene[];
  voiceover: {
    artistName: string;
    durationMs: string;
  };
  backgroundMusic: {
    artistName: string;
    durationMs: string;
  };
}

const SAMPLE_SCENES: Scene[] = [
  {
    id: "abcd-1",
    text: "5 ways to lose weight",
    image: {
      id: "k9zPtz",
      imageUrl: "https://picsum.photos/1000/800",
      crop: {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        unit: "px",
      },
    },
    voiceoverText:
      "In our video journey to weight loss, let's delve into five effective strategies to help you shed those extra pounds.",
  },
  {
    id: "abcd-2",
    text: "1. Stop eating.",
    image: {
      id: "jgud2",
      imageUrl: "https://picsum.photos/1920/1080",
      crop: {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        unit: "px",
      },
    },
    voiceoverText:
      "Begin by focusing on a balanced diet filled with fruits, vegetables, lean proteins, and whole grains to provide essential nutrients and keep you satisfied.",
  },
  {
    id: "abcd-3",
    text: "2. Start excercising",
    image: {
      id: "j23d2",
      imageUrl: "https://picsum.photos/1920/1080",
      // width: 1920,
      // height: 1080,
      crop: {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        unit: "px",
      },
    },
    voiceoverText:
      "Incorporate regular exercise into your routine, whether it's cardio, strength training, or yoga, to burn calories and boost your metabolism.",
  },
];

const SAMPLE_PROJECT_DATA: Project = {
  title: "5 ways to lose weight",
  format: {
    name: "widescreen",
    width: 1920,
    height: 1080,
  },
  scenes: SAMPLE_SCENES,
  voiceover: {
    artistName: "Tom Ripley",
    durationMs: "44000",
  },
  backgroundMusic: {
    artistName: "Marge - The Band",
    durationMs: "54000",
  },
};

interface HeaderProps {
  projectTitle: string;
}

type SelectedEditorTab = "scenes" | "global";

interface EditorPanelHeaderProps {
  selectedTab: SelectedEditorTab;
  setSelectedTab: (selectedTab: SelectedEditorTab) => void;
}

interface Scene {
  id: string;
  text: string;
  image: {
    id: string;
    imageUrl: string;
    crop: Crop;
  };
  voiceoverText: string;
}

interface SceneProps {
  scene: Scene;
  sceneNo: number;
  aspect: number;
  setCrop: (crop) => void;
}

interface ScenePanelProps {
  scenes: Scene[];
  aspect: number;
  onCropUpdate: (sceneId, crop) => void;
}

interface EditorPanelProps {
  projectData: Project;
  onCropUpdate: (sceneId, crop) => void;
}

interface GlobalPanelProps {
  voiceover: String;
  bgMusic: String;
}

const Header = (props: HeaderProps) => (
  <div className="header flex justify-between p-4 pb-1 h-[59px]">
    <div className="font-bold text-2xl">{props.projectTitle}</div>
    <div>
      <button className="bg-gray-800 text-white py-2 px-2.5 text-xs rounded-sm">
        Export Video
      </button>
    </div>
  </div>
);

const EditorPanelHeader = (props: EditorPanelHeaderProps) => {
  const { selectedTab, setSelectedTab } = props;

  return (
    <div className="text-sm font-medium text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px w-full">
        <li
          className={classNames("flex-grow border-b-2 cursor-pointer", {
            "hover:text-gray-600 hover:border-gray-300":
              selectedTab != "scenes",
            "text-gray-700 border-gray-600": selectedTab == "scenes",
          })}
          onClick={() => setSelectedTab("scenes")}
        >
          <div className="flex mx-2 my-1 items-center">
            <Layers width={"18px"} />
            <span className="p-1">Scenes</span>
          </div>
        </li>
        <li
          className={classNames("flex-grow border-b-2 cursor-pointer", {
            " hover:text-gray-600 hover:border-gray-300":
              selectedTab != "global",
            "text-gray-700 border-gray-600": selectedTab == "global",
          })}
          onClick={() => setSelectedTab("global")}
        >
          <div className="flex mx-2 my-1 items-center">
            <Film width={"18px"} />
            <span className="p-1">Global</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

const Scene = (props: SceneProps) => {
  const { scene, sceneNo } = props;
  const [uploadImageModal, setUploadImageModal] = useState(false);

  return (
    <div className="border-b-2 p-2 pb-4 text-xs border-gray-200">
      <div className=" text-gray-600">Scene {sceneNo}</div>
      <div className="px-1 py-2">
        <div className="font-medium pb-1">Text</div>
        <textarea
          className="border-2 rounded-md w-full px-2 py-3 resize-none text-gray-800 focus-visible:border-slate-600 outline-none"
          value={scene.text}
        ></textarea>
      </div>
      <div className="p-1 font-medium">
        <div>Image</div>
        <div className="py-2 flex justify-start">
          <div className="bg-gray-200 h-[100px] w-[125px]">
            <img
              src={scene.image.imageUrl}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="pl-4 gap-2 flex flex-col">
            <div
              className="underline cursor-pointer"
              onClick={() => {
                setUploadImageModal(true);
              }}
            >
              Upload Image
            </div>
            <input
              className={classNames("", {
                hidden: !uploadImageModal,
              })}
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                //onHandleChange((e) => setUploadedImage(e.target.files[0]));
              }}
            />
            <div className="underline cursor-pointer">
              Choose from stock library
            </div>
            <div className="">
              <CropDialog
                imageUrl={scene.image.imageUrl}
                cropInit={scene.image.crop}
                aspect={props.aspect}
                onSetCrop={props.setCrop}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-1 py-2">
        <div className="font-medium pb-1">Voiceover Text</div>
        <textarea
          className="border-2 rounded-md w-full px-2 py-3 resize-none text-gray-800 focus-visible:border-slate-600 outline-none"
          value={scene.voiceoverText}
        ></textarea>
      </div>

      <button className="border-2 ml-1 px-2 py-1 rounded-sm border-gray-600 font-medium">
        Regenerate voiceover
      </button>
    </div>
  );
};

const ScenesPanel = (props: ScenePanelProps) => (
  <>
    {props.scenes.map((scene, idx) => (
      <Scene
        scene={scene}
        sceneNo={idx + 1}
        aspect={props.aspect}
        setCrop={(crop) => props.onCropUpdate(scene.id, crop)}
      />
    ))}
  </>
);

const GlobalPanel = (props: GlobalPanelProps) => {
  const { voiceover, bgMusic } = props;
  return (
    <div>
      <div className="p-2 font-medium text-xs">Theme</div>
      <div className="px-2 py-[1px]">
        <Select>
          <SelectTrigger className="w-[70%]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="py-3">
        <div className="p-2 font-medium text-xs">Size format</div>
        <div className="px-2 py-[1px]">
          <Select>
            <SelectTrigger className="w-[70%]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Widescreen">Widescreen</SelectItem>
              <SelectItem value="Vertical">Vertical</SelectItem>
              <SelectItem value="Square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-2 font-medium text-xs">
        <div>Voiceover</div>
        <div className="flex p-4 justify-start gap-10 w-[90%]">
          <div className="flex items-center w-[50%]">
            <Mic width={"18px"} />
            <div className="font-normal pl-2 pt-1">{voiceover}</div>
          </div>
          <div className="flex flex-col w-[50%]">
            <a className="underline cursor-pointer ">Change voice</a>
            <a className="underline cursor-pointer pt-1">Disable voiceover</a>
          </div>
        </div>
      </div>

      <div className="p-2 font-medium text-xs ">
        <div>Background Music</div>
        <div className="flex flex-row p-4 gap-10 w-[90%] ">
          <div className="flex items-center w-[50%] ">
            <Music width={"18px"} />
            <div className="font-normal pl-2 pt-1">{bgMusic}</div>
          </div>
          <div className="flex flex-col w-[50%]">
            <a className="underline cursor-pointer ">Change voice</a>
            <a className="underline cursor-pointer pt-1 ">Disable music</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorPanel = ({ projectData, onCropUpdate }: EditorPanelProps) => {
  const [selectedTab, setSelectedTab] = useState<SelectedEditorTab>("scenes");

  return (
    <>
      <EditorPanelHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "scenes" && (
        <ScenesPanel
          scenes={projectData.scenes}
          aspect={projectData.format.width / projectData.format.height}
          onCropUpdate={onCropUpdate}
        />
      )}
      {selectedTab === "global" && (
        <GlobalPanel
          voiceover={projectData.voiceover.artistName}
          bgMusic={projectData.backgroundMusic.artistName}
        />
      )}
    </>
  );
};

const PreviewPanel = () => {
  return <div></div>;
};

function SlideshowEditor() {
  const [projectData, setProjectData] = useState<Project>(SAMPLE_PROJECT_DATA);

  const onCropUpdate = (sceneId, crop) => {
    setProjectData((prev) => {
      const scenes = prev.scenes.map((s) => {
        if (s.id === sceneId) {
          s.image.crop = crop;
        }

        return s;
      });

      return {
        ...prev,
        scenes,
      };
    });
  };

  return (
    <Layout activePage="projects">
      <div className="slideshow-wrapper">
        <Header projectTitle={projectData.title} />
        <hr className="h-[1px] bg-gray-200 border-0"></hr>

        <div className="flex flex-row h-[calc(100vh-59px)]">
          <div className="w-[45%] h-full flex max-h-screen overflow-y-auto flex-col flex-grow border-r-2 border-gray-200">
            <EditorPanel
              projectData={projectData}
              onCropUpdate={onCropUpdate}
            />
          </div>
          <div className="w-[55%] max-h-screen overflow-y-auto">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SlideshowEditor;
