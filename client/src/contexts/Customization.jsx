import { createContext, useContext, useState } from "react";

// Define an array of realistic car color options for car customization

const colors = [
  {
    color: "#4B5154", // Gun Metallic
    name: "Gun Metallic",
  },
  {
    color: "#2B2D42", // Cosmic Gray Metallic
    name: "Cosmic Gray",
  },
  {
    color: "#1A1D23", // Lunar Silver Metallic
    name: "Lunar Silver",
  },
  {
    color: "#8B0000", // Ruby Flare Pearl
    name: "Ruby Flare",
  },
  {
    color: "#FF6347", // Aegean Blue Metallic
    name: "Aegean Blue",
  },
  {
    color: "#6B7280", // Modern Steel Metallic
    name: "Modern Steel",
  },
  {
    color: "#3B3F4E", // Obsidian Blue Pearl
    name: "Obsidian Pearl",
  },
  {
    color: "#FFFFFF", // Platinum White Pearl
    name: "Platinum White",
  },
];

// Mapping the colors to various car parts
const spoilerColors = [
  {
    color: "#4B5154", // Gun Metallic
    name: "Gun Metallic",
  },
  {
    color: "#2B2D42", // Cosmic Gray Metallic
    name: "Cosmic Gray Metallic",
  },
  {
    color: "#1A1D23", // Lunar Silver Metallic
    name: "Lunar Silver Metallic",
  },
  {
    color: "#8B0000", // Ruby Flare Pearl
    name: "Ruby Flare Pearl",
  },
  {
    color: "#FF6347", // Aegean Blue Metallic
    name: "Aegean Blue Metallic",
  },
  {
    color: "#6B7280", // Modern Steel Metallic
    name: "Modern Steel Metallic",
  },
  {
    color: "#3B3F4E", // Obsidian Blue Pearl
    name: "Obsidian Blue Pearl",
  },
  {
    color: "#FFFFFF", // Platinum White Pearl
    name: "Platinum White Pearl",
  },
]; // Spoiler color options
const doorColors = colors.map((x) => x); // Door color options
const rimColors = colors.map((x) => x); // Rim color options
const windowColors = colors.map((x) => x);
const bonnetColors = colors.map((x) => x); // Bonnet color options
const lightColors = colors.map((x) => x); // Light color options
const sideKitColors = colors.map((x) => x); // Side kit color options
const bodyColors = colors.map((x) => x); // Body color options
const bumperFrontColors = colors.map((x) => x); // Front bumper color options
const bumperBackColors = colors.map((x) => x); // Back bumper color options
const grillColors = colors.map((x) => x); // Grill color options
const fenderColors = colors.map((x) => x); // Fender color options
const diffuserColors = colors.map((x) => x); // Diffuser color options
const roofColors = colors.map((x) => x); // Roof color options
const trunkColors = colors.map((x) => x); // Trunk color options

// Create a context for customization options
const CustomizationContext = createContext({});

// CustomizationProvider component to manage customization state
export const CustomizationProvider = (props) => {
  // CarBody
  const [carBodyClick, setCarBodyClick] = useState(false); // State for car body click status
  const [carBodyColor, setCarBodyColor] = useState(bodyColors[7]); // State for car body color

  // Spoiler
  const [spoiler, setSpoiler] = useState(0); // State for spoiler selection
  const [spoilerClick, setSpoilerClick] = useState(false); // State for spoiler click status
  const [spoilerColor, setSpoilerColor] = useState(spoilerColors[7]); // State for spoiler color

  // Windows
  const [windowClick, setWindowClick] = useState(false); // State for window click status
  const [windowColor, setWindowColor] = useState(windowColors[7]); // State for window color

  // Rims
  const [rimClick, setRimClick] = useState(false); // State for rim click status
  const [rimColor, setRimColor] = useState(rimColors[7]); // State for rim color

  // Wheels (assuming color doesn't change for wheels)
  const [wheels, setWheels] = useState(0); // State for wheel selection
  const [wheelsClick, setWheelsClick] = useState(false); // State for wheel click status

  // Bonnet
  const [bonnet, setBonnet] = useState(1); // State for bonnet selection
  const [bonnetClick, setBonnetClick] = useState(false); // State for bonnet click status
  const [bonnetColor, setBonnetColor] = useState(bonnetColors[7]); // State for bonnet color

  // Sidekits
  const [sideKit, setSideKit] = useState(0); // State for side kit selection
  const [sideKitClick, setSideKitClick] = useState(false); // State for side kit click status
  const [sideKitColor, setSideKitColor] = useState(sideKitColors[7]); // State for side kit color

  // Lights
  const [lightClick, setLightClick] = useState(false); // State for light click status
  const [lightColor, setLightColor] = useState(lightColors[7]); // State for light color

  // BumperFront
  const [bumperFrontClick, setBumperFrontClick] = useState(false); // State for front bumper click status
  const [bumperFrontColor, setBumperFrontColor] = useState(
    bumperFrontColors[7]
  ); // State for front bumper color

  // BumperBack
  const [bumperBack, setBumperBack] = useState(1); // State for back bumper selection
  const [bumperBackClick, setBumperBackClick] = useState(false); // State for back bumper click status
  const [bumperBackColor, setBumperBackColor] = useState(bumperBackColors[7]); // State for back bumper color

  // Grill
  const [grillClick, setGrillClick] = useState(false); // State for grill click status
  const [grillColor, setGrillColor] = useState(grillColors[7]); // State for grill color

  // Doors
  const [doorClick, setDoorClick] = useState(false); // State for door click status
  const [doorColor, setDoorColor] = useState(doorColors[7]); // State for door color

  // Engine
  const [engine, setEngine] = useState(1); // State for engine selection
  const [engineClick, setEngineClick] = useState(false); // State for engine click status

  // Fender
  const [fenderClick, setFenderClick] = useState(false); // State for fender click status
  const [fenderColor, setFenderColor] = useState(fenderColors[7]); // State for fender color

  // Diffuser
  const [diffuser, setDiffuser] = useState(3); // State for diffuser selection
  const [diffuserClick, setDiffuserClick] = useState(false); // State for diffuser click status
  const [diffuserColor, setDiffuserColor] = useState(diffuserColors[7]); // State for diffuser color

  // Roof
  const [roofClick, setRoofClick] = useState(false); // State for roof click status
  const [roofColor, setRoofColor] = useState(roofColors[7]); // State for roof color

  // Silencer (assuming no color)
  const [silencer, setSilencer] = useState(1); // State for silencer selection
  const [silencerClick, setSilencerClick] = useState(false); // State for silencer click status

  // Trunk
  const [trunkClick, setTrunkClick] = useState(false); // State for trunk click status
  const [trunkColor, setTrunkColor] = useState(trunkColors[7]); // State for trunk color

  // Provide the customization context with state and setter functions
  return (
    <CustomizationContext.Provider
      value={{
        spoilerColors,
        doorColors,
        rimColors,
        windowColors,
        bonnetColors,
        lightColors,
        sideKitColors,
        bodyColors,
        bumperFrontColors,
        bumperBackColors,
        grillColors,
        fenderColors,
        diffuserColors,
        roofColors,
        trunkColors,
        // CarBody
        carBodyClick,
        setCarBodyClick,
        carBodyColor,
        setCarBodyColor,
        // Spoiler
        spoiler,
        setSpoiler,
        spoilerClick,
        setSpoilerClick,
        spoilerColor,
        setSpoilerColor,
        // Windows
        windowClick,
        setWindowClick,
        windowColor,
        setWindowColor,
        // Rims
        rimClick,
        setRimClick,
        rimColor,
        setRimColor,
        // Wheels
        wheels,
        setWheels,
        wheelsClick,
        setWheelsClick,
        // Bonnet
        bonnet,
        setBonnet,
        bonnetClick,
        setBonnetClick,
        bonnetColor,
        setBonnetColor,
        // Sidekits
        sideKit,
        setSideKit,
        sideKitClick,
        setSideKitClick,
        sideKitColor,
        setSideKitColor,
        // Lights
        lightClick,
        setLightClick,
        lightColor,
        setLightColor,
        // BumperFront
        bumperFrontClick,
        setBumperFrontClick,
        bumperFrontColor,
        setBumperFrontColor,
        // BumperBack
        bumperBack,
        setBumperBack,
        bumperBackClick,
        setBumperBackClick,
        bumperBackColor,
        setBumperBackColor,
        // Grill
        grillClick,
        setGrillClick,
        grillColor,
        setGrillColor,
        // Doors
        doorClick,
        setDoorClick,
        doorColor,
        setDoorColor,
        // Engine
        engine,
        setEngine,
        engineClick,
        setEngineClick,
        // Fender
        fenderClick,
        setFenderClick,
        fenderColor,
        setFenderColor,
        // Diffuser
        diffuser,
        setDiffuser,
        diffuserClick,
        setDiffuserClick,
        diffuserColor,
        setDiffuserColor,
        // Roof
        roofClick,
        setRoofClick,
        roofColor,
        setRoofColor,
        // Silencer
        silencer,
        setSilencer,
        silencerClick,
        setSilencerClick,
        // Trunk
        trunkClick,
        setTrunkClick,
        trunkColor,
        setTrunkColor,
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

// Custom hook to use customization context
export const useCustomization = () => useContext(CustomizationContext);
