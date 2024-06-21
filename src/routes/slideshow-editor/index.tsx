import React, { useEffect, useState } from "react";

import Layout from "../layout";
import {
  CirclePause,
  CirclePlay,
  Film,
  Layers,
  Mic,
  Music,
} from "lucide-react";

import classNames from "classnames";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import CropDialog from "./cropper/crop-dialog";
import { useParams } from "react-router-dom";
import {
  getBgMusicList,
  getProject,
  getSlideshow,
  uploadImageToStorage,
} from "@/src/api/takeone";
import { ImageAsset, Slide, Slideshow } from "@/src/types";

import useEditorStore from "./store";

import {
  BGMusicSelectProps,
  EditorPanelHeaderProps,
  EditorPanelProps,
  GlobalPanelProps,
  HeaderProps,
  Scene,
  ScenePanelProps,
  SceneProps,
  SelectedEditorTab,
  SlideshowPreviewUrlParams,
} from "./types";

import { createClient } from "pexels";
import { millisToMinutesAndSeconds } from "@/src/utils/general";

const client = createClient(
  "GHPoQvNj6IJvghqtAhegeuwaK7h45OCLM5JDuhOGVoTnMv2XrhRcs5Fh"
);

const Header = (props: HeaderProps) => (
  <div className="header flex justify-between p-4 pb-1 h-[59px]">
    <div className="font-bold text-2xl">{props.projectTitle || ""}</div>
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

async function onUploadFile(e, projectId) {
  const file = e.target.files[0];
  const res: ImageAsset = await uploadImageToStorage(file, projectId);

  return res.url;
}

const Scene = (props: SceneProps) => {
  const { slide, sizeFormat, sceneNo, onSlideUpdate } = props;

  const { projectId } = useParams<SlideshowPreviewUrlParams>();

  const [query, setQuery] = useState("modern");

  const [photosArray, setPhotosArray] = useState([]);
  // client.photos.search({ query, per_page: 5 }).then((photos) => {
  //   setPhotosArray(photos.photos);
  // });

  const onSearchStock = () => {
    client.photos.search({ query, per_page: 10 }).then((photos) => {
      setPhotosArray(photos.photos);
      console.log(photos.photos);
    });
  };

  useEffect(() => {
    onSearchStock();
  }, []);

  return (
    <div className="border-b-2 p-2 pb-4 text-xs border-gray-200">
      <div className=" text-gray-600">Scene {sceneNo}</div>
      <div className="px-1 py-2">
        <div className="font-medium pb-1">Text</div>
        <textarea
          className="border-2 rounded-md w-full px-2 py-3 resize-none text-gray-800 focus-visible:border-slate-600 outline-none"
          value={slide.text}
          onChange={(e) => {
            const newText = e.currentTarget.value;
            onSlideUpdate({
              text: newText,
            });
          }}
        ></textarea>
      </div>
      <div className="p-1 font-medium">
        <div>Image</div>
        <div className="py-2 flex justify-start">
          <div className="bg-gray-200 h-[100px] w-[125px]">
            <img
              src={slide.imageAsset.url}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="pl-4 gap-2 flex flex-col">
            <div>
              <Dialog>
                <DialogTrigger className="underline cursor-pointer text-left">
                  Change Image
                </DialogTrigger>
                <DialogContent className="max-w-[80%] h-[80%] ">
                  <Tabs defaultValue="upload" className="w-[100%]">
                    <TabsList className="w-full flex justify-around">
                      <TabsTrigger value="upload">Upload Image</TabsTrigger>
                      <TabsTrigger value="stock">Stock Library</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                      <Carousel
                        className=" p-[20px] pl-[50px]"
                        opts={{
                          align: "start",
                        }}
                      >
                        <CarouselContent className="mt-[10%] min-w-[400px] min-h-[100px] p-[20px]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem
                              key={index}
                              className="md:basis-1/4 lg:basis-1/3"
                            >
                              <img
                                src={slide.imageAsset.url}
                                className="object-contain  min-w-[50px] min-h-[50px]"
                              />
                              <div>Filename</div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-[8%]" />
                        <CarouselNext />
                      </Carousel>
                      <div className=" max-w-[150px]">
                        <label
                          htmlFor="image"
                          className="p-[10px] bg-slate-200 rounded-sm border-1 cursor-pointer text-sm"
                        >
                          Upload from Local
                        </label>
                        <input
                          id="image"
                          type="file"
                          style={{ visibility: "hidden" }}
                          accept="image/png, image/jpeg"
                          onChange={async (e) => {
                            const previewUrl = await onUploadFile(e, projectId);

                            onSlideUpdate({
                              imageAsset: {
                                ...slide.imageAsset,
                                url: previewUrl,
                              },
                            });
                          }}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="stock" className="flex flex-col">
                      <div className="flex items-center space-x-3 h-full">
                        <input
                          className="border-gray-200 border-2 rounded mt-[10px] text-center p-2 flex-grow"
                          type="text"
                          placeholder="Search Images"
                          onChange={(e) => {
                            setQuery(e.currentTarget.value);
                          }}
                        />
                        <button
                          className="border-gray-200 border-2 rounded mt-[10px]  bg-slate-200 py-2 px-10"
                          type="submit"
                          onClick={onSearchStock}
                        >
                          Search
                        </button>
                      </div>
                      {!!photosArray.length && (
                        <Carousel
                          className="py-10 flex items-center flex-grow"
                          opts={{
                            align: "start",
                            containScroll: "keepSnaps",
                            active: true,
                          }}
                        >
                          <CarouselPrevious className="left-1" />
                          <div className="px-24 min-h-full">
                            <CarouselContent className="min-h-full">
                              {photosArray.map((photo, index) => (
                                <CarouselItem key={index} className="basis-1/3">
                                  <div className="">
                                    <img
                                      width={"100%"}
                                      src={photo.src.landscape}
                                      className="object-cover min-h-[100%]"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                          </div>
                          <CarouselNext className="right-1" />
                        </Carousel>
                      )}
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
            <div className="">
              {/* <CropDialog
                imageUrl={slide.imageAsset.url}
                cropInit={scene.image.crop}
                sizeFormat={sizeFormat}
                onSetCrop={(crop) => {
                  onSlideUpdate({
                    image: {
                      ...scene.image,
                      crop,
                    },
                  });
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="px-1 py-2">
        <div className="font-medium pb-1">Voiceover Text</div>
        <textarea
          className="border-2 rounded-md w-full px-2 py-3 resize-none text-gray-800 focus-visible:border-slate-600 outline-none"
          value={slide.voiceoverText}
          onChange={(e) => {
            const newText = e.currentTarget.value;
            onSlideUpdate({
              voiceoverText: newText,
            });
          }}
        ></textarea>
      </div>

      <button className="border-2 ml-1 px-2 py-1 rounded-sm border-gray-600 font-medium">
        Regenerate voiceover
      </button> */}
    </div>
  );
};

const ScenesPanel = (props: ScenePanelProps) => (
  <>
    {props.slides.map((slide, idx) => (
      <Scene
        slide={slide}
        sceneNo={idx + 1}
        sizeFormat={props.sizeFormat}
        onSlideUpdate={(updatedSlide) =>
          props.onSlideUpdate(slide.id, updatedSlide)
        }
      />
    ))}
  </>
);

const BGMusicSelect = (props: BGMusicSelectProps) => {
  const { bgMusicList, updateBgMusic } = props;

  const [playingMusic, setPlayingMusic] = useState<null | string>(null);

  return (
    <Dialog>
      <DialogTrigger className="text-left underline">
        Change Music
      </DialogTrigger>
      <DialogContent className="max-w-[60%] h-[80%]">
        <DialogHeader>
          <DialogTitle>Select Background Music</DialogTitle>
          <DialogDescription>
            Enhance your video with the perfect soundtrack: Browse, preview, and
            apply from the curated list of soundtracks.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto">
          {bgMusicList.map((musicFile, idx) => {
            const songName = musicFile.originalFileName.split(".")[0];
            return (
              <div className="relative group flex gap-10 items-center m-2 mx-7 py-2 px-4 border border-solid rounded-md hover:bg-gray-100 transition ease-in-out">
                {idx < 3 && (
                  <div className="absolute px-2 py-[2px] right-0 top-2 bg-violet-300 text-violet-700 text-xs font-normal rounded-l-sm">
                    Recommended
                  </div>
                )}
                <button
                  className="flex-none"
                  onClick={() => {
                    if (playingMusic) {
                      setPlayingMusic(null);
                    } else {
                      setPlayingMusic(musicFile.id);
                    }
                  }}
                >
                  {playingMusic === musicFile.id ? (
                    <CirclePause height={"30px"} width={"30px"} />
                  ) : (
                    <CirclePlay height={"30px"} width={"30px"} />
                  )}
                </button>
                <div className="grow">
                  <div>{songName}</div>
                  <div className="text-gray-400 italic text-sm">
                    By {musicFile.artist}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {musicFile.tags.map((tag) => {
                      return (
                        <div className="bg-gray-200 rounded-sm px-3 py-1 text-sm text-gray-700 ">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className="opacity-0 flex-none bg-blue-600 text-white px-4 py-1 rounded-full font-extralight text-sm group-hover:opacity-100 transition ease-in-out mr-10"
                  onClick={() => {
                    updateBgMusic();
                  }}
                >
                  Apply
                </button>
                <div className="flex-none">
                  {millisToMinutesAndSeconds(musicFile.duration)}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const GlobalPanel = (props: GlobalPanelProps) => {
  const { voiceover, bgMusic, slideshowId } = props;
  const [showMusicList, setShowMusicList] = useState(false);
  const [bgMusicList, setBgMusicList] = useState([]);

  useEffect(() => {
    const fetchBgMusicList = async () => {
      const musicList = await getBgMusicList(slideshowId);
      setBgMusicList(musicList);
    };
    fetchBgMusicList();
  }, []);

  const updateBgMusic = () => {};

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
            <BGMusicSelect
              bgMusicList={bgMusicList}
              updateBgMusic={updateBgMusic}
            />
            <a className="underline cursor-pointer pt-1 ">Disable music</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorPanel = ({ slideshow, onSlideUpdate }: EditorPanelProps) => {
  const [selectedTab, setSelectedTab] = useState<SelectedEditorTab>("scenes");

  if (!slideshow) return;
  return (
    <>
      <EditorPanelHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "scenes" && (
        <ScenesPanel
          slides={slideshow.slides}
          sizeFormat={slideshow.settings.sizeFormat}
          onSlideUpdate={onSlideUpdate}
        />
      )}
      {selectedTab === "global" && (
        <GlobalPanel
          voiceover={"Artist Name 1"}
          bgMusic={slideshow.backgroundMusic.audioAsset.artist}
          slideshowId={slideshow.id}
        />
      )}
    </>
  );
};

const PreviewPanel = () => {
  return <div></div>;
};

const SlideshowEditor = () => {
  const { projectId } = useParams<SlideshowPreviewUrlParams>();

  //Q: Is there a way to get all states from store together?
  const prompt = useEditorStore((state) => state.prompt);
  const slideshow: Slideshow = useEditorStore((state) => state.slideshow);

  const updatePrompt = useEditorStore((state) => state.updatePrompt);
  const updateSlideshow = useEditorStore((state) => state.updateSlideshow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, slideshowData] = await Promise.all([
          getProject(projectId),
          getSlideshow(projectId),
        ]);

        //Q: Is it possible to update all three states togehter?
        updatePrompt(projectData.prompt);
        updateSlideshow(slideshowData);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    fetchData();
  }, []);

  const onSlideUpdate = (slideId: number, updatedSlide: Partial<Slide>) => {
    const slides = slideshow.slides.map((slide) => {
      if (slide.id === slideId) {
        slide = {
          ...slide,
          ...updatedSlide,
        };
      }
      return slide;
    });

    const newSlideshowData = {
      ...slideshow,
      slides,
    };

    updateSlideshow(newSlideshowData);
  };

  return (
    <Layout activePage="projects">
      <div className="slideshow-wrapper">
        <Header projectTitle={prompt} />
        <hr className="h-[1px] bg-gray-200 border-0"></hr>

        <div className="flex flex-row h-[calc(100vh-59px)]">
          <div className="w-[45%] h-full flex max-h-screen overflow-y-auto flex-col flex-grow border-r-2 border-gray-200">
            <EditorPanel slideshow={slideshow} onSlideUpdate={onSlideUpdate} />
          </div>
          <div className="w-[55%] max-h-screen overflow-y-auto">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SlideshowEditor;
