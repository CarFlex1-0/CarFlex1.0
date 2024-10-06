import Experience from "@components/car_model/Experience";
import Configurator from "@components/car_model/Configurator";
import { CustomizationProvider } from "@contexts/Customization";
import { Suspense } from "react";
import { Stats } from "@react-three/drei";
import { Leva } from "leva";
import { useAuth } from "@contexts/auth_context";
function CarPreview() {
  const { drawerState } = useAuth();
  return (
    <div
      className={
        drawerState ? "blur bg-blue-950" : "App w-screen h-screen p-0 m-0"
      }
    >
      <CustomizationProvider>
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center text-6xl">
              <div>
                <span className="text-white">Car</span>
                <span className="text-red-600">F</span>
                <span className="text-white">lex</span>
              </div>
              <div>
                <span className="loading loading-dots w-10 ml-4 text-center"></span>
              </div>
            </div>
          }
        >
          <Experience />
          <Stats />
          <Leva collapsed />
        </Suspense>
        <Configurator />
      </CustomizationProvider>
    </div>
  );
}

export default CarPreview;
